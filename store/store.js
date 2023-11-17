import { create } from "zustand";

const useStore = create((set) => ({
  questions: [],
  currentQuestion: 0,
  setQuestions: (questions) => set(() => ({ questions })),
  setCurrentQuestion: (currentQuestion) =>
    set(() => ({
      currentQuestion,
    })),
}));

export default useStore;
