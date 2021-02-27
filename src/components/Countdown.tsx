import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const {
    minutes,
    seconds,
    isFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  
  // EX1: String(25) => '25' => '2' '5'
  // EX1: String(5) => '5' => '05' => '0' '5'
  // A string tem que ter 2 caracteres, caso não tenha preenche com 0 à esquerda (start)
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {/* exemplo de fazer um if com else: */}
      {isFinished ? (
        <button disabled className={styles.countdownButton}>
          {/* Cycle is finished! &nbsp; &#9989; OU: */}
          Cycle is finished! &nbsp;
          <img src="icons/check.svg" alt="Check" />
        </button>
      ) : (
        <>
          {/* <> chama-se fragment, é uma tag sem nome, é como uma div mas não existe no html, é só para resolver uma limitação do React */}
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Leave cycle &nbsp; Χ
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Start a cycle &nbsp; ▶
            </button>
          )}
        </>
      )}
      {/* Nota: Ex de um if com else: { isFinished ? <p>Cycle is finished!</p> : null } 
      ou outra forma de fazer mas com if sem o else: { isFinished && <p>Cycle is finished!</p> } */}
    </div>
  );
}

// export default Countdown
