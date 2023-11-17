const { quizzes } = require("@/dataStore");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { quizId, questionId, selectedOption, timeTaken } = req.body;

    if (!quizzes[quizId]) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    quizzes[quizId].answers.push({ questionId, selectedOption, timeTaken });

    res.status(200).json({ message: "Answer received" });
  } else {
    res.status(405).end();
  }
}
