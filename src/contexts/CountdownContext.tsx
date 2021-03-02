import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  isFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

// Criação do contexto ChallengesContext:
export const CountdownContext = createContext({} as CountdownContextData);

// Como o setTimeout demora 1 segundo a ser executado, quando o estado isActive muda quando
// carregamos no botão "Leave cycle" o relógio não irá pagar logo mas ao fim de 1 segundo pois
// o setTime(time-1) já estava programado para executar após 1 segundo. Para solucionar criamos:
let countdownTimeout: NodeJS.Timeout; // variável do tipo global NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60); // 25 min em segundos
  const [isActive, setIsActive] = useState(false); // diz se o Countdown está activo ou não
  const [isFinished, setIsFinished] = useState(false);

  const minutes = Math.floor(time / 60); // floor arredonda para baixo
  const seconds = time % 60; // o módulo % representa o resto inteiro da divisão

  function startCountdown() {
    setIsActive(true);
  }

  /* Como o componente ChallengeBox precisava de aceder a esta função que está no 
  componente Countdown, o melhor é que o Countdown tb seja um contexto. Então, vamos
  criar o contexto CountdownContext.tsx */
  function resetCountdown() {
    clearTimeout(countdownTimeout); // previne que o setTimeout seja executado
    setIsActive(false);
    setIsFinished(false);
    setTime(25 * 60); // 6 segundos = 0.1 / 25 min = 25
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000); // quero que o time diminua em 1 unidade ao fim de 1 seg
    } else if (isActive && time == 0) {
      console.log("Cycle is finished");
      setIsFinished(true); // Countdown is finished
      setIsActive(false); // Countdown is not active anymore

      startNewChallenge();
    }
    // return () => {
    //   cleanup
    // }
  }, [isActive, time]); // quero que o "efecte" seja executado sempre que o valor de active ou o valor de time mudarem

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
