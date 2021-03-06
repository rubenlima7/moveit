import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, winChallenge } = useContext(
    ChallengesContext
  );

  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  function handleChallengeCompleted() {
    winChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Win {activeChallenge.amount} xp</header>
          <main>
            {/* <img src="icons/body.svg" alt="Dumbbell" /> */}
            <img src={`icons/${activeChallenge.type}.svg`} alt="Dumbbell" />
            <strong>New challenge</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Failed
            </button>
            <button
              type="button"
              className={styles.challengeCompletedButton}
              onClick={handleChallengeCompleted}
            >
              Completed
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finish a cycle in order to receive a challenge</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Level up by completing challenges
          </p>
        </div>
      )}
    </div>
  );
}

// export default ChallengeBox
