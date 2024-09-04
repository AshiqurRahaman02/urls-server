const Quiz = require('../models/Quiz');

// Create a Quiz
const createQuiz = async (req, res) => {
    try {
        const { question, options, rightAnswer, startDate, endDate } = req.body;

        const newQuiz = new Quiz({ 
            question, 
            options, 
            rightAnswer, 
            startDate, 
            endDate 
        });

        await newQuiz.save();

        res.status(201).json({
            isError: false,
            message: "Quiz created successfully",
            quiz: newQuiz
        });
    } catch (error) {
        res.status(500).json({ 
            isError: true,
            message: 'Failed to create quiz',
            error: error.message 
        });
    }
};

// Get Active Quiz
const getActiveQuiz = async (req, res) => {
    try {
        const now = new Date();

        const activeQuiz = await Quiz.findOne({ 
            startDate: { $lte: now }, 
            endDate: { $gte: now } 
        });

        if (activeQuiz) {
            res.status(200).json({
                isError: false,
                message: "Active quiz retrieved successfully",
                quiz: activeQuiz,
                status: "active"
            });
        } else {
            res.status(404).json({ 
                isError: true,
                message: 'No active quiz found' 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            isError: true,
            message: 'Failed to retrieve active quiz',
            error: error.message 
        });
    }
};

// Get Quiz Result
const getQuizResult = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ 
                isError: true,
                message: 'Quiz not found' 
            });
        }

        const now = new Date();
        const endTime = new Date(quiz.endDate);
        const timeDifference = now - endTime;

        if (timeDifference >= 300000) {
            res.status(200).json({
                isError: false,
                message: "Quiz result retrieved successfully",
                result: {
                    correctAnswerIndex: quiz.rightAnswer,
                    correctAnswer: quiz.options[quiz.rightAnswer],
                    quizEnded: true
                }
            });
        } else {
            res.status(400).json({ 
                isError: true,
                message: 'Quiz results not available yet' 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            isError: true,
            message: 'Failed to retrieve quiz result',
            error: error.message 
        });
    }
};

// Get All Quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();

        res.status(200).json({
            isError: false,
            message: "All quizzes retrieved successfully",
            quizzes: quizzes
        });
    } catch (error) {
        res.status(500).json({ 
            isError: true,
            message: 'Failed to retrieve quizzes',
            error: error.message 
        });
    }
};

module.exports = { createQuiz, getActiveQuiz, getQuizResult, getAllQuizzes };
