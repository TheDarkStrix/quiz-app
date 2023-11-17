const { quizzes } = require("@/dataStore");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const quizId = Date.now().toString(); // UUID
  quizzes[quizId] = { answers: [], startTime: new Date() };

  res.status(200).json({ message: "Quiz started successfully", quizId });
}
