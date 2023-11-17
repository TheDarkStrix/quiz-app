const { quizzes, questionBank } = require("@/dataStore");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { quizId } = req.body;
  if (!quizId) {
    return res.status(400).json({ message: "Bad Request: Missing quizId" });
  }

  if (!quizzes[quizId]) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  const userAnswers = quizzes[quizId].answers;
  let score = 0;

  userAnswers.forEach((answer) => {
    const question = questionBank.find((q) => q.id === answer.questionId);
    if (question && question.correctAnswer === answer.selectedOption) {
      score += 1;
    }
  });

  const totalScore = `${score}/${questionBank.length}`;
  res.status(200).json({ score: totalScore });
}
