'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './styles.module.scss';
import SplitType from 'split-type';
export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/options');
  };

  //GSAP Optional yoyo effect
  useEffect(() => {
    const ourText = new SplitType('#quizzler', { types: 'chars' });
    const chars = ourText.chars;

    chars.forEach(char => {
      char.addEventListener('mouseenter', () => {
        gsap.to(char, {
          color: "white",
          opacity: 1,
          duration: 0.3
        });
      });

      char.addEventListener('mouseleave', () => {
        gsap.to(char, { color: "black", opacity: 0.7, duration: 0.3 });
      });
    });

    gsap.fromTo(chars, {
      opacity: 0,
      y: -150
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.13,
      duration: 4,
      ease: 'elastic'
    });

    gsap.fromTo(chars, 
      { y: 0 }, 
      { y: -10, duration: 0.3, stagger: 0.1, yoyo: true, repeat: -1 }
    );
  }, []);











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
        <h1 id="quizzler">Q<span>uizzler</span></h1>
        <button onClick={handleStart}>Let's start the quiz <span>→</span></button>
      </div>
    </div>
  );
}
