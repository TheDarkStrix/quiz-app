import { create } from "zustand";
import Router from "next/router";
import axios from "axios";

const useStore = create((set) => ({
  questions: [],
  currentQuestion: 0,
  activeQuizId: null,
  setQuestions: (questions) => set(() => ({ questions })),
  setActionQuizId: (activeQuizId) =>
    set(() => ({
      activeQuizId,
    })),
  setCurrentQuestion: (currentQuestion) =>
    set(() => ({
      currentQuestion,
    })),
  resetAll: () =>
    set(() => ({ questions: [], currentQuestion: 0, activeQuizId: null })),
}));

export default useStore;
