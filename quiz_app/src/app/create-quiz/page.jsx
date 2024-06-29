'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.scss';
import Image from 'next/image';

export default function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
    { question: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);
  const [error, setError] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    // Ensure correctAnswer is still valid
    if (newQuestions[questionIndex].correctAnswer === newQuestions[questionIndex].options[optionIndex]) {
      newQuestions[questionIndex].correctAnswer = value;
    }
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = newQuestions[questionIndex].options[optionIndex];
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const validateForm = () => {
    if (title.trim() === '') {
      setError('Quiz title cannot be blank.');
      return false;
    }
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question.trim() === '') {
        setError('Questions cannot be blank.');
        return false;
      }
      if (questions[i].correctAnswer.trim() === '') {
        setError('Each question must have a correct answer.');
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 5000);
  }, [error]);

  const handleSubmit = async () => {
    if (validateForm()) {
      if (confirm('Are you sure you want to submit the quiz?')) {
        try {
          await axios.post('/api/quizzes', { title, questions });
          // Reset form
          setTitle('');
          setQuestions([
            { question: '', options: ['', '', '', ''], correctAnswer: '' },
            { question: '', options: ['', '', '', ''], correctAnswer: '' },
            { question: '', options: ['', '', '', ''], correctAnswer: '' }
          ]);
          alert('Quiz submitted successfully!');
        } catch (error) {
          setError('An error occurred while submitting the quiz.');
        }
      }
    }
  };

  return (
    <div className={styles.createQuizContainer}>
      
      <div className={styles.background}>
        <Image
          src="/Home.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <h1>Create a Quiz</h1>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={handleTitleChange}
        className={styles.quizTitle}
      />
      <g className={styles.group}>
        {questions.map((question, index) => (
          <div key={index} className={styles.questionContainer}>
            <input
              type="text"
              placeholder="Question"
              value={question.question}
              onChange={(e) => handleInputChange(index, 'question', e.target.value)}
              className={styles.questionInput}
            />
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className={styles.optionContainer}>
                <input
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                  className={styles.optionInput}
                />
                <input
                  type="radio"
                  name={`correctAnswer-${index}`}
                  checked={question.correctAnswer === option}
                  onChange={() => handleCorrectAnswerChange(index, optIndex)}
                />
                <label>Correct</label>
              </div>
            ))}
          </div>
        ))}
      </g>
      <g className={styles.todbuttons}>
      <button onClick={addQuestion} className={styles.addButton}>Add Question</button>
      <button onClick={handleSubmit} className={styles.submitButton}>Submit Quiz</button>
      </g>
    </div>
  );
}
