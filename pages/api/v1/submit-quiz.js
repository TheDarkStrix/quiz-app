const { quizzes } = require("@/dataStore");

export default function handler(req, res) {
  if (req.method !== "POST") {
    // If the request method is not POST, return a 405 Method Not Allowed
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { quizId } = req.body;

  if (!quizId) {
    // If quizId is not provided in the request body
    return res.status(400).json({ message: "Bad Request: Missing quizId" });
  }

  if (!quizzes[quizId]) {
    // If the quizId does not exist in our data store
    return res.status(404).json({ message: "Quiz not found" });
  }
  // Send a success response
  res.status(200).json({ message: "Quiz submitted successfully" });
}
