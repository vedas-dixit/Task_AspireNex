'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function TakeQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await axios.get('/api/quizzes');
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quizId) => {
    router.push(`/take-quiz/${quizId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image
          src="/Home.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className={styles.content}>
        <h1>Available Quizzes</h1>
        <div className={styles.quizzes}>
          {quizzes.map((quiz) => (
            <div key={quiz._id} className={styles.quizItem}>
              <h2>{quiz.title}</h2>
              <button className={styles.button} onClick={() => handleQuizSelect(quiz._id)}>
                <div className={styles.buttonBackground}>
                  <Image
                    src="/option_bg2.png"
                    alt="Take Quiz Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                </div>
                Take Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
