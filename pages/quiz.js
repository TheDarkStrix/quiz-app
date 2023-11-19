import { useState, useEffect } from "react";
import useStore from "@/store/store";
import { useRouter } from "next/router";
import axios from "axios";

export default function Quiz() {
  const router = useRouter();
  const setQuestions = useStore((state) => state.setQuestions);
  const questions = useStore((state) => state.questions);
  const quizId = useStore((state) => state.activeQuizId);
  console.log("quizId", quizId);
  const currentQuestion = useStore((state) => state.currentQuestion);
  const setCurrentQuestion = useStore((state) => state.setCurrentQuestion);
  const setActionQuizId = useStore((state) => state.setActionQuizId);
  const [selectedOption, setSelectedOption] = useState([]);

  const totalQuestions = questions.length;

  useEffect(() => {
    if (!quizId) {
      router.push("/");
      return;
    }

    axios
      .get("/api/v1/questions")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the questions:", error);
      });
  }, []);

  const handleOptionSelect = (option, index) => {
    let currentSelectedOption = [...selectedOption];
    if (currentSelectedOption.includes(index)) {
      currentSelectedOption = currentSelectedOption.filter(
        (item) => item !== index
      );
    } else {
      currentSelectedOption.push(option);
    }

    setSelectedOption(currentSelectedOption);
    console.log(index);
  };

  const handleAnswerSubmit = async () => {
    // Prepare your data payload
    const payload = {
      quizId: quizId, // Replace with your actual quiz ID
      questionId: questions[currentQuestion]?.id, // Assuming you have question IDs
      selectedOption: selectedOption,
      timeTaken: "time-taken-value", // Replace with actual time taken if you track it
    };

    console.log("payload", payload);

    // Submit the answer using Axios
    await axios
      .post("/api/v1/submit-answer", payload)
      .then((response) => {
        console.log("Answer submitted:", response.data);

        // Navigate to the next question or to the submit page
        if (currentQuestion == totalQuestions - 1) {
          router.push("/submit");
        } else {
          console.log(currentQuestion + 1);
          setSelectedOption([]); // Reset the selected options for the next question
          setCurrentQuestion(currentQuestion + 1);
        }
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
      });
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
              style={
                selectedOption.includes(option)
                  ? { border: "1px solid red" }
                  : undefined
              }
              key={index}
              onClick={() => handleOptionSelect(option, index)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={handleAnswerSubmit}
        disabled={selectedOption.length == 0}
      >
        {currentQuestion == totalQuestions - 1 ? "Submit" : "Next Question"}
      </button>
    </div>
  );
}
