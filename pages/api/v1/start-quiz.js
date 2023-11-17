const { quizzes } = require("@/dataStore");

export default function handler(req, res) {
  if (req.method === "POST") {
    const quizId = Date.now().toString();
    quizzes[quizId] = { answers: [], startTime: new Date() };

    res.status(200).json({ message: "Quiz started successfully", quizId });
  } else {
    res.status(405).end();
  }
}
