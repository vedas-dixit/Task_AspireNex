import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

const Modal = ({ show, onClose, score, total }) => {
  const router = useRouter();

  if (!show) {
    return null;
  }

  const handleNextQuiz = () => {
    router.push('/take-quiz');
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <video autoPlay loop muted className={styles.confettiVideo}>
          <source src="/confetti.mp4" type="video/mp4" />
        </video>
        <h2>You have Scored</h2>
        <h1>{score}/{total}</h1>
        <div className={styles.groupbtn}>
          <button onClick={handlePlayAgain} className={styles.closeButton}>
            Wanna Play Again?
          </button>
          <button onClick={handleNextQuiz} className={styles.closeButton}>
            Next Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
