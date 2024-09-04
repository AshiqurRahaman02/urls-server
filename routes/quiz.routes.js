const express = require('express');
const quizRouter = express.Router();
const quizController = require('../controllers/quiz.controller');

quizRouter.post('/', quizController.createQuiz);
quizRouter.get('/active', quizController.getActiveQuiz);
quizRouter.get('/:id/result', quizController.getQuizResult);
quizRouter.get('/all', quizController.getAllQuizzes);

module.exports = quizRouter;
