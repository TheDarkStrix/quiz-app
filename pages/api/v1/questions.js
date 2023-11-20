import supabase from "@/supabaseClient";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  let { data: questions, error } = await supabase.from("questions").select("*");

  console.log("data", questions);

  if (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }

  // Transform questions to match the original format, if necessary
  questions = questions.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
    question_image: q?.question_image || null,
  }));

  res.status(200).json(questions);
}
