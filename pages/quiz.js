import { useState, useEffect } from "react";
import useStore from "@/store/store";
import { useRouter } from "next/router";

export default function Quiz() {
  const router = useRouter();
  const setQuestions = useStore((state) => state.setQuestions);
  const questions = useStore((state) => state.questions);
  const currentQuestion = useStore((state) => state.currentQuestion);
  const setCurrentQuestion = useStore((state) => state.setCurrentQuestion);

  const totalQuestions = questions.length;

  useEffect(() => {
    fetch("/api/v1/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  const handleAnswerSubmit = (selectedOption) => {
    // Submit answer logic

    if (currentQuestion == totalQuestions - 1) {
      router.push("/submit");
      return;
    }

    console.log(currentQuestion + 1);
    setCurrentQuestion(currentQuestion + 1);
  };

  console.log("questions", questions, currentQuestion);

  const questionData = questions?.[currentQuestion] || [];

  return (
    <div>
      <h1>Quiz</h1>
      {questionData && (
        <div>
          <p>{questionData.question}</p>
          {questionData?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => console.log("selected option", option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <button onClick={handleAnswerSubmit}>
        {currentQuestion == totalQuestions - 1 ? "Submit" : "Next Question"}
      </button>
    </div>
  );
}
