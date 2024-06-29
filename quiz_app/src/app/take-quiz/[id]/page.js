'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function TakeQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = quiz.questions[questionIndex].options[optionIndex];
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/quizzes/${id}`, { answers });
      console.log('Quiz submitted successfully:', response.data);
      alert(`Your score is: ${response.data.score}`);
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

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{quiz.title}</h1>
      {quiz.questions.map((question, questionIndex) => (
        <div key={questionIndex} style={{ marginBottom: '20px' }}>
          <h3>{question.question}</h3>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} style={{ marginBottom: '10px' }}>
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={option}
                checked={answers[questionIndex] === option}
                onChange={() => handleAnswerChange(questionIndex, optionIndex)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}
