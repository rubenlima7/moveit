import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges-en.json";
import { LevelUpModal } from "../components/LevelUpModal";

// interface Language {
//   header: string;
//   profile: string;
//   completedChallenges: string;
//   countdownButton: {
//     countdownButtonStart: string;
//     countdownButtonLeave: string;
//     countdownButtonFinish: string;
//   };
//   challengeBox: {
//     info: {
//       messageOne: string;
//       messageTwo: string;
//       };
//     challengeInfo: {
//       header: string;
//       buttonFailed: string;
//       buttonCompleted: string;
//     };
//   };
// }

interface Challenge {
  type: "body" | "eye"; // type só tem dois valores possíveis conforme se pode confirmar em challenges.json
  description: string;
  amount: number;
}

/* esta interface foi criada para que os dados que posso retornar de dentro do meu 
contexto (dentro de  value) possam aparecer no intellisense quando usa-las no componente 
Countdown, caso contrário não iriam aparecer. */
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: () => void; // é uma função sem parametros e não retorna nada
  startNewChallenge: () => void; // é uma função sem parametros e não retorna nada
  activeChallenge: Challenge; // poderia ser do tipo object mas para ser mais especifico vamos criar uma interface Challenge
  resetChallenge: () => void;
  experienceToNextLevel: number;
  winChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;

  level: number;
  currentExperience: number;
  challengesCompleted: number;
}
/* qdo children de um Componente tb é um componente react, neste caso, 
<Component {...pageProps} /> (ver _app.tsx) eu posso atribuir o tipo ReactNode. 
E esse ReactNode aceita qualquer tipo de elemento como children, por exemplo um 
componente, um texto, uma tag html, etc. */

// Criação do contexto ChallengesContext:
export const ChallengesContext = createContext({} as ChallengesContextData);
// e o seu valor inicial é {} mas é do tipo ChallengesProviderProps

export function ChallengesProvider({
  children,
  ...rest /* rest Operator é um operador do JavaScript que irá conter todas as propriedades que não são a children, 
  ou seja, level, currentExperience e challengesCompleted. Usou-se este operador pois ao colocar as 3 propriedades 
  dava erro de duplicação de declaração. Assim, as 3 propriedades irão dentro do objecto rest */
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1); // nível alcançado. Se rest.level não existir o valor será 1
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  ); // experiência adquirida em xp.
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  ); // número de desafios completados com sucesso

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  /* Math.pow(base, expoente) 
  O próximo nivel multiplicado por 4, que é o valor do factor de experiência (qto maior mais dificil será o próximo nível) 
  , tudo elevado ao quadrado, dará o nível de experiência que é necessário para alcançar o próximo nivel. */
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
    // return () => {
    //   cleanup
    // }
  }, []);

  /* [COOKIES] Esta função será disparada sempre que level ou currentExperience ou challengesCompleted mudarem.
  Poderiam utilizar a api nativa do javascript para salvar os cookies mas irei utilizar uma biblioteca js-cookie.*/
  useEffect(() => {
    Cookies.set("level", String(level)); // ou (level, level.toString())
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
    // return () => {
    //   cleanup
    // }
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);

    if (Notification.permission === "granted") {
      new Audio("/clappingNotification.mp3").play();
      new Notification("CONGRATULATIONS 💪🎉🎉🎉", {
        // body: `Win ${challenge.amount} xp!`,
        body: `LEVEL ${level + 1}!`,
        icon: "/favicon.png",
        silent: true,
      });
    }
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    console.log("New challenge started...");
    /* Ex: random retorna um valor entre ]0; 1[ (com parte decimal), se length for 15, como 
    o floor arredonda para o número inteiro mais abaixo, ele iria retornar entre indice 0 e 14 */
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    if (Notification.permission === "granted") {
      new Audio("/notification.mp3").play();
      new Notification("New challenge 🎉", {
        body: `Win ${challenge.amount} xp!`,
        icon: "/favicon.png",
        silent: true,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function winChallenge() {
    // [Validação] - se não estiver com um challenge activo (=null), saio da função
    if (!activeChallenge) return;

    let finalExperience = currentExperience + activeChallenge.amount;

    if (finalExperience < experienceToNextLevel) {
      setCurrentExperience(finalExperience);
    } else {
      setCurrentExperience(finalExperience - experienceToNextLevel);
      levelUp();
    }
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    /* todos os elementos dentro do provider irão ter acesso aos dados daquele contexto */
    /* a propriedade value refere o que posso enviar de informação */
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        winChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
      {/* OU {isLevelUpModalOpen ? <LevelUpModal /> : null} */}
    </ChallengesContext.Provider>
  );
}
