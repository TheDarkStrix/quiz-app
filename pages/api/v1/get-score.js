import supabase from "@/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { quizId } = req.body;
  if (!quizId) {
    return res.status(400).json({ message: "Bad Request: Missing quizId" });
  }

  // Fetch the quiz session
  const { data: quizSession, error: quizSessionError } = await supabase
    .from("quiz_sessions")
    .select("answers")
    .eq("quiz_id", quizId)
    .single();

  if (quizSessionError || !quizSession) {
    console.error("Error fetching quiz session:", quizSessionError);
    return res.status(404).json({ message: "Quiz not found" });
  }

  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select("*");

  if (questionsError) {
    console.error("Error fetching questions:", questionsError);
    return res.status(500).json({ error: questionsError.message });
  }

  let score = 0;
  quizSession.answers.forEach((answer) => {
    console.log("answers", answer);
    const question = questions.find((q) => q.id === answer.questionId);
    console.log(
      "selected answer",
      answer.selectedOption,
      answer.selectedOption.includes(question.correct_answer)
    );
    if (question && answer.selectedOption.includes(question.correct_answer)) {
      score += 1;
    }
  });

  const totalScore = `${score}/${questions.length}`;
  res.status(200).json({ score: totalScore });
}
