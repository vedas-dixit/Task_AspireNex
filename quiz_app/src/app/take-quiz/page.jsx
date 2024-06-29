'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Available Quizzes</h1>
      {quizzes.map((quiz) => (
        <div key={quiz._id} style={{ marginBottom: '20px' }}>
          <h2>{quiz.title}</h2>
          <button onClick={() => handleQuizSelect(quiz._id)}>Take Quiz</button>
        </div>
      ))}
    </div>
  );
}
