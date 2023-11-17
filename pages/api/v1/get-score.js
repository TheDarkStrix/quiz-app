const { quizzes, questions, questionBank } = require("@/dataStore");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { quizId } = req.body;

    if (!quizzes[quizId]) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const userAnswers = quizzes[quizId].answers;
    let score = 0;

    userAnswers.forEach((answer) => {
      const question = questionBank.find((q) => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.selectedOption) {
        score += 1; // Increment score for each correct answer
      }
    });

    const totalScore = `${score}/${questions.length}`;
    res.status(200).json({ score: totalScore });
  } else {
    res.status(405).end();
  }
}
