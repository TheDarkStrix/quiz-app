import useStore from "@/store/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import style from "@/styles/page-styles/home-page.module.css";
import Button from "@/components/button/button";

export default function Home() {
  const router = useRouter();
  const setActionQuizId = useStore((state) => state.setActionQuizId);
  const startQuiz = useStore((state) => state.startQuiz);

  const handleStartQuiz = async () => {
    // startQuiz();
    await axios
      .post("/api/v1/start-quiz")
      .then((response) => {
        console.log("Quiz started:", response.data);

        // You can store the quiz ID or any other response data if needed
        // For example, using local state or a global state manager like Zustand

        // Navigate to the quiz page
        setActionQuizId(response.data.quizId);
        router.push("/quiz");
      })
      .catch((error) => {
        console.error("Error starting quiz:", error);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.logo}></div>
      <div className={style.quizBannerContainer}>
        <div className={style.quizBanner}>Quiz</div>
        <div className={style.buttonContainer}>
          <Button
            className={style.startButton}
            text="Start"
            onClick={handleStartQuiz}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
