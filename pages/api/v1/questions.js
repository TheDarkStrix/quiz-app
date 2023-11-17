const { questions } = require("@/dataStore");

export default function handler(req, res) {
  res.status(200).json(questions);
}
