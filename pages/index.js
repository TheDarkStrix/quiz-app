import useStore from "@/store/store";
import axios from "axios";
import { useRouter } from "next/router";

import style from "@/styles/page-styles/home-page.module.css";
import Button from "@/components/button/button";
import { useState } from "react";
import Loading from "@/components/loading/loading";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setActionQuizId = useStore((state) => state.setActionQuizId);

  const handleStartQuiz = async () => {
    setLoading(true);
    await axios
      .post("/api/v1/start-quiz")
      .then((response) => {
        setActionQuizId(response.data.quizId);
        setLoading(false);
        router.push("/quiz");
      })
      .catch((error) => {
        console.error("Error starting quiz:", error);
        setLoading(false);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Image src="/upraised.png" width={300} height={70} alt="upraisedlogo" />
      </div>
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
      <Loading isLoading={loading} />
    </div>
  );
}
