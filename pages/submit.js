import useStore from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

export default function Submit() {
  const router = useRouter();
  const quizId = useStore((state) => state.activeQuizId);

  const handleStartOver = () => {
    router.push("/");
  };

  // Retrieve the quizId from your store

  useEffect(() => {
    const getScore = async () => {
      if (!quizId) {
        console.log("No quiz ID available");
        return;
      }

      try {
        const response = await axios.post("/api/v1/get-score", {
          quizId: quizId,
        });
        console.log("Score:", response.data);
        // Process the score data as needed
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };

    getScore();
  }, [quizId]); // Dependency on quizId

  return (
    <div>
      <div>the quiz is submitted</div>
      <button onClick={handleStartOver}>start again</button>
    </div>
  );
}
