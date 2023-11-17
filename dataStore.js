let quizzes = {};
let questionBank = [
  {
    id: 1,
    question: "What is 2+2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    id: 2,
    question: "What is 2+2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    id: 3,
    question: "What is 2+2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    id: 4,
    question: "What is 2+2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
];

let questions = questionBank.map((q) => ({
  id: q.id,
  question: q.question,
  options: q.options,
}));

export { quizzes, questions, questionBank };
