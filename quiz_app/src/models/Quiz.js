import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
});

export default mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);
