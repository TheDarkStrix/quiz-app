const { quizzes } = require("@/dataStore");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { quizId } = req.body;

    if (!quizzes[quizId]) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz submitted successfully" });
  } else {
    res.status(405).end;
  }
}
