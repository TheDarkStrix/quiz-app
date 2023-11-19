import supabase from "@/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const quizId = Date.now().toString();

  const { data, error } = await supabase
    .from("quiz_sessions")
    .insert([{ quiz_id: quizId, answers: [] }]);

  if (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }

  console.log("Quiz session created:", data);
  res.status(200).json({ message: "Quiz started successfully", quizId });
}
