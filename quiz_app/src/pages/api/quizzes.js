import dbConnect from '../../utils/dbConnect';
import Quiz from '../../models/Quiz';

export default async (req, res) => {
    const { method } = req;
  
    await dbConnect();
  
    switch (method) {
      case 'GET':
        try {
          const quizzes = await Quiz.find({});
          res.status(200).json(quizzes);
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const quiz = await Quiz.create(req.body);
          res.status(201).json(quiz);
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  };