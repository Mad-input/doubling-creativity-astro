import userStore from '../store/userStore.js'
import { useEffect } from "react";
import TutorialQuiz from "../assets/js/Quiz.js";
import '../assets/css/quizStyles.css'

export default function QuizComponent({ questions }) {
  const { isAuthenticated } = userStore()

  useEffect(() => {
    const options = {
      containerIndicator: document.querySelector(".indicators"),
      containerQuestion: document.querySelector(".question-container"),
      elementProgess: document.querySelector(".progress"),
      $quiz: document.querySelector(".quiz"),
      sounds: {
        error: new Audio("/audio/wrong-answer.mp3"),
        send: new Audio("/audio/send.mp3"),
        correct: new Audio("/audio/correct.mp3"),
        congratulations: new Audio("/audio/succefull.mp3"),
      },
      icons: {
        error: "/img/wrong.svg",
        check: "/img/check.svg",
      },
    };

    if (isAuthenticated) {
      const QuizT = new TutorialQuiz(questions, options);
      QuizT.init();
    }
  }, [isAuthenticated])
  return (

    isAuthenticated
      ?
      <div className="quiz">
        <header>
          <h2 className="quiz-title">Quiz</h2>
          <ul className="indicators"></ul>
        </header>
        <div className="question-container">
          <div className="loader-container">
            <div className="loader"></div>
            <span>Cargando...</span>
          </div>
        </div>
        <small className="progress"></small>
      </div>
      : <h1 className="noAuthenticated">access or register to access all our content</h1>

  )
}
