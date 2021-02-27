import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext); // rmal
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/rubenlima7.png" alt="Ruben Lima" />
      {/* <img src="https://avatars.githubusercontent.com/u/48303314?s=60&v=4" alt="" /> */}
      {/* <img src="https://avatars.githubusercontent.com/u/48303314?s=400&u=5476fdc5688f62eafb36587b3d97014879defbbf&v=4" alt="" /> */}
      <div>
        <strong>Ruben Lima</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}

// export default Profile
