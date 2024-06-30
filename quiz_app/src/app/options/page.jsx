'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function Options() {
  const router = useRouter();

  const handleCreateQuiz = () => {
    router.push('/create-quiz');
  };

  const handleTakeQuiz = () => {
    router.push('/take-quiz');
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
        <h1 >Select an Option</h1>
        <g>
        <button className={styles.button} onClick={handleCreateQuiz}>
          <div className={styles.buttonBackground}>
            <Image
              src="/option_bg2.png" // Change to your button background image
              alt="Create Quiz Background"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          Create a Quiz
        </button>
        <button className={styles.button} onClick={handleTakeQuiz}>
          <div className={styles.buttonBackground}>
            <Image
              src="/option_bg.jpg" // Change to your button background image
              alt="Take Quiz Background"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          Take a Quiz
        </button>
        </g>
      </div>
    </div>
  );
}
