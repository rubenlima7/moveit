import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/LevelUpModal.module.css";

/* Este componente poderei coloca-lo onde quiser desde que esteja dentro do 
<ChallengesProvider>, no index.tsx, ou colocar este componente dentro do próprio
componente <ChallengesProvider>, a seguir a children */
export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo nível!</p>

        <button type="button">
          <img
            src="/icons/close.svg"
            alt="Fechar modal"
            onClick={closeLevelUpModal}
          />
        </button>
      </div>
    </div>
  );
}
