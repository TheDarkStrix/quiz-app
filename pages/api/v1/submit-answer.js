const { quizzes } = require("../../../dataStore");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { quizId, questionId, selectedOption, timeTaken } = req.body;
  if (!quizId || questionId == null || selectedOption == null) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing required fields" });
  }

  if (!quizzes[quizId]) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  quizzes[quizId].answers.push({ questionId, selectedOption, timeTaken });
  res.status(200).json({ message: "Answer received" });
}
