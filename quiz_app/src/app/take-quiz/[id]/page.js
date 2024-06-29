'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import styles from './styles.module.scss';
import Modal from '@/model_comp/Modal';
export default function TakeQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      const fetchQuiz = async () => {
        try {
          const response = await axios.get(`/api/quizzes/${id}`);
          console.log(response.data);
          setQuiz(response.data);
          setAnswers(Array(response.data.questions.length).fill(''));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching quiz:', error);
          setLoading(false);
        }
      };
      fetchQuiz();
    }
  }, [id]);

  const handleAnswerChange = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = quiz.questions[currentQuestionIndex].options[optionIndex];
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/quizzes/${id}`, { answers });
      console.log('Quiz submitted successfully:', response.data);
      setScore(response.data.score);
      setShowModal(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className={styles.quizWrapper}>
      <Image src="/option_bg5.jpg" alt="Background" layout="fill" className={styles.backgroundImage} />
      <div className={styles.quizContainer}>
        <div className={styles.questionProgress}>
          Question {currentQuestionIndex + 1}/{quiz.questions.length}
        </div>
        <h3 className={styles.questionTitle}>{currentQuestion.question}</h3>
        <div className={styles.optionsContainer}>
          {currentQuestion.options.map((option, optionIndex) => (
            <div key={optionIndex} className={styles.optionContainer}>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={answers[currentQuestionIndex] === option}
                onChange={() => handleAnswerChange(optionIndex)}
                className={styles.radioButton}
              />
              <label className={styles.optionLabel}>{option}</label>
            </div>
          ))}
        </div>
        <div className={styles.groups}>
          {currentQuestionIndex > 0 && (
            <button className={styles.nextButton} onClick={handlePrevQuestion}>
              Prev
            </button>
          )}
          <button className={styles.nextButton} onClick={handleNextQuestion}>
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
          </button>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} score={score} total={quiz.questions.length} />
    </div>
  );
}