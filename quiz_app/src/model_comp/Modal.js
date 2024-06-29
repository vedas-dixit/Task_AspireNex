import React from 'react';
import styles from './styles.module.scss';

const Modal = ({ show, onClose, score, total }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <video autoPlay loop muted className={styles.confettiVideo}>
          <source src="/confetti.mp4" type="video/mp4" />
        </video>
        <h2>You have Scored</h2>
        <h1>{score}/{total}</h1>
        <button onClick={onClose} className={styles.closeButton}>
          Wanna Play Again?
        </button>
      </div>
    </div>
  );
};

export default Modal;
