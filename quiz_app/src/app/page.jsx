'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/options');
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
        <h1>Q<span>uizzler</span></h1>
        <button onClick={handleStart}>Let's start the quiz <span>→</span></button>
      </div>
    </div>
  );
}
