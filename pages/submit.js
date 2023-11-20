import useStore from "@/store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/button/button";
import style from "@/styles/page-styles/submit-page.module.css";
import SpeedoProgress from "@/components/speedo-progress/speedo-progress";
import Loading from "@/components/loading/loading";

export default function Submit() {
  const router = useRouter();
  const quizId = useStore((state) => state.activeQuizId);
  const setResetAll = useStore((state) => state.resetAll);
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartOver = () => {
    setResetAll();
    router.push("/");
  };

  // Retrieve the quizId from your store

  useEffect(() => {
    const getScore = async () => {
      if (!quizId) {
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post("/api/v1/get-score", {
          quizId: quizId,
        });

        setScore(parseInt(response.data.score.split("")[0]));
        setTotal(parseInt(response.data.score.split("")[2]));
        setLoading(false);
        // Process the score data as needed
      } catch (error) {
        console.error("Error fetching score:", error);
        setLoading(false);
      }
    };

    getScore();
  }, [quizId]); // Dependency on quizId

  return (
    <div className={`${style.container}`}>
      <div className={style.progressContainer}>
        <Image
          src="/background.svg"
          alt="background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={style.mainWrapper}>
        <div className={style.resultText}>Your Result</div>
        {/* {questionData && (
          <div>
            <div className={style.question}>{questionData.question}</div>
            <div className={style.optionContainer}></div>
          </div>
        )} */}

        <div className={style.meter}>
          <SpeedoProgress value={(score / total) * 100} />
        </div>

        <div className={style.block}>
          <div className={style.correct}></div>
          <div className={style.count}>{score}</div>
          <div>Corrent</div>
        </div>

        <div className={style.inCorrectBlock}>
          <div className={style.inCorrect}></div>
          <div className={style.count}>{total - score}</div>
          <div>Incorrect</div>
        </div>
      </div>
      <div className={style.footer}>
        <Button
          className={style.button}
          onClick={handleStartOver}
          text={"Start Again"}
        />
      </div>
      <Loading isLoading={loading} />
    </div>
  );
}
