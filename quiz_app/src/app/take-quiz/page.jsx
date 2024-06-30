'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import styles from './styles.module.scss';
import SplitType from 'split-type';
import gsap from 'gsap';
import Loader from '../../model_comp/loader/Loader'; // Import the Loader component

export default function TakeQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await axios.get('/api/quizzes');
      setQuizzes(response.data);
      setLoading(false);
    };
    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quizId) => {
    router.push(`/take-quiz/${quizId}`);
  };

  // GSAP ANIMATION:
  useEffect(() => {
    const ourText = new SplitType('#text_1', { types: 'chars' })
    const chars = ourText.chars

    chars.forEach(char => {
      char.addEventListener('mouseenter', () => {
        gsap.to(char, {
          color: "yellow",
          opacity: 1
        });
      });

      char.addEventListener('mouseleave', () => {
        gsap.to(char, { color: "black", opacity: 0.7 });
      });
    });

    gsap.fromTo(chars, {
      opacity: 0,
      y: -250
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 4,
      ease: 'power4.out',
    });
  }, []);

  if (loading) {
    return <Loader />; // Show the loader while loading
  }

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
        <h1 id='text_1' className={styles.anim_header}>Available Quizzes</h1>
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
