import supabase from "@/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { quizId, questionId, selectedOption, timeTaken } = req.body;

  if (!quizId || questionId == null || selectedOption == null) {
    return res
      .status(400)
      .json({ message: "Bad Request: Missing required fields" });
  }

  // Fetch the existing quiz session
  let { data: quizSession, error: fetchError } = await supabase
    .from("quiz_sessions")
    .select("answers")
    .eq("quiz_id", quizId)
    .single();

  if (fetchError || !quizSession) {
    console.error("Error fetching quiz session:", fetchError);
    return res.status(404).json({ message: "Quiz not found" });
  }

  // Update the answers array
  const updatedAnswers = [
    ...(quizSession.answers || []),
    { questionId, selectedOption, timeTaken },
  ];

  // Update the quiz session with the new answer
  const { error: updateError } = await supabase
    .from("quiz_sessions")
    .update({ answers: updatedAnswers })
    .eq("quiz_id", quizId);

  if (updateError) {
    console.error("Error updating quiz session:", updateError);
    return res.status(500).json({ error: updateError.message });
  }

  res.status(200).json({ message: "Answer received" });
}
