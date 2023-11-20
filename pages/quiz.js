import { useState, useEffect } from "react";
import useStore from "@/store/store";
import { useRouter } from "next/router";
import axios from "axios";
import style from "@/styles/page-styles/quiz-page.module.css";
import CircularProgressBar from "@/components/round-dial-progress/round-dial-progress";
import Image from "next/image";
import Option from "@/components/options/options";
import Button from "@/components/button/button";
import Loading from "@/components/loading/loading";

export default function Quiz() {
  const router = useRouter();
  const setQuestions = useStore((state) => state.setQuestions);
  const questions = useStore((state) => state.questions);
  const quizId = useStore((state) => state.activeQuizId);
  console.log("quizId", quizId);
  const currentQuestion = useStore((state) => state.currentQuestion);
  const setCurrentQuestion = useStore((state) => state.setCurrentQuestion);
  const [selectedOption, setSelectedOption] = useState([]);
  const [loading, setLoading] = useState(false);

  const totalQuestions = questions.length;

  useEffect(() => {
    if (!quizId) {
      router.push("/");
      return;
    }

    setLoading(true);
    axios
      .get("/api/v1/questions")
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("There was an error fetching the questions:", error);
      });
  }, []);

  const handleOptionSelect = (option) => {
    let currentSelectedOption = [...selectedOption];
    if (currentSelectedOption.includes(option)) {
      currentSelectedOption = currentSelectedOption.filter(
        (item) => item !== option
      );
    } else {
      currentSelectedOption.push(option);
    }
    setSelectedOption(currentSelectedOption);
  };

  const handleAnswerSubmit = async () => {
    const payload = {
      quizId: quizId,
      questionId: questions[currentQuestion]?.id,
      selectedOption: selectedOption,
      timeTaken: "time-taken-value",
    };

    console.log("payload", payload);

    setLoading(true);

    await axios
      .post("/api/v1/submit-answer", payload)
      .then((response) => {
        console.log("Answer submitted:", response.data);

        if (currentQuestion == totalQuestions - 1) {
          router.push("/submit");
        } else {
          console.log(currentQuestion + 1);
          setSelectedOption([]);
          setCurrentQuestion(currentQuestion + 1);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
        setLoading(false);
      });
  };

  console.log("questions", questions, currentQuestion);

  const questionData = questions?.[currentQuestion] || [];

  const textComponent = () => {
    return (
      <div>
        <span className={style.currentQuestion}>{currentQuestion + 1}</span>
        <span className={style.questionTotal}>/</span>
        <span className={style.questionTotal}>{questions.length}</span>
      </div>
    );
  };

  return (
    <div className={`${style.container}`}>
      <div className={style.progressContainer}>
        <Image
          src="/background.svg"
          alt="background"
          layout="fill"
          objectFit="cover"
        />
        <div className={style.progressWrapper}>
          {console.log(`${((currentQuestion + 1) / questions.length) * 100}`)}
          <CircularProgressBar
            progress={`${parseInt(
              ((currentQuestion + 1) / questions.length) * 100
            )}`}
            textComponent={textComponent()}
          />
        </div>
      </div>
      <div className={style.mainWrapper}>
        {questionData && (
          <div>
            <div className={style.question}>{questionData.question}</div>
            {questionData.question_image && (
              <div className={style.questionImage}>
                <Image
                  src={questionData.question_image}
                  alt="question_image"
                  width={500}
                  height={500}
                />
              </div>
            )}
            <div className={style.optionContainer}>
              {questionData?.options?.map((option, index) => (
                <Option
                  text={option}
                  checked={selectedOption.includes(option)}
                  key={index}
                  onClick={() => handleOptionSelect(option, index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={style.footer}>
        <Button
          className={style.button}
          onClick={handleAnswerSubmit}
          disabled={selectedOption.length == 0}
          Icon={
            currentQuestion == totalQuestions - 1 ? null : (
              <Image src="/arrow.svg" width={21} height={21} alt="arrow" />
            )
          }
          text={"Next"}
        />
      </div>
      <Loading isLoading={loading} />
    </div>
  );
}
