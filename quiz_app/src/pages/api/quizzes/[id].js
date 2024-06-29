import dbConnect from '../../../utils/dbConnect';
import Quiz from '../../../models/Quiz';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
          return res.status(404).json({ success: false, message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { answers } = req.body;
        const quiz = await Quiz.findById(id);
        if (!quiz) {
          return res.status(404).json({ success: false, message: 'Quiz not found' });
        }
        let score = 0;
        answers.forEach((answer, index) => {
          if (answer === quiz.questions[index].correctAnswer) {
            score++;
          }
        });
        res.status(200).json({ success: true, score });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
