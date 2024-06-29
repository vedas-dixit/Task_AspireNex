'use client';
import { useState } from 'react';
import axios from 'axios';

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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Create a Quiz</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={handleTitleChange}
        style={{ display: 'block', margin: '20px auto', width: '80%' }}
      />
      {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Question"
            value={question.question}
            onChange={(e) => handleInputChange(index, 'question', e.target.value)}
            style={{ display: 'block', marginBottom: '10px', width: '80%' }}
          />
          {question.options.map((option, optIndex) => (
            <div key={optIndex} style={{ marginBottom: '5px' }}>
              <input
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                style={{ marginRight: '10px' }}
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
      <button onClick={addQuestion} style={{ display: 'block', margin: '20px auto' }}>Add Question</button>
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}
