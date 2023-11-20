import useStore from "@/store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/button/button";
import style from "@/styles/page-styles/submit-page.module.css";
import SpeedoProgress from "@/components/speedo-progress/speedo-progress";

export default function Submit() {
  const router = useRouter();
  const quizId = useStore((state) => state.activeQuizId);
  const setResetAll = useStore((state) => state.resetAll);
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);

  const handleStartOver = () => {
    setResetAll();
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
        setScore(parseInt(response.data.score.split("")[0]));
        setTotal(parseInt(response.data.score.split("")[2]));
        // Process the score data as needed
      } catch (error) {
        console.error("Error fetching score:", error);
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

        <SpeedoProgress value={(score / total) * 100} />

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
          //   disabled={selectedOption.length == 0}
          //   Icon={
          //     currentQuestion == totalQuestions - 1 ? null : (
          //       <Image src="/arrow.svg" width={21} height={21} alt="arrow" />
          //     )
          //   }
          text={"Start Again"}
        />
      </div>
    </div>
  );
}
