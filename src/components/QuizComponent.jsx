import userStore from '../store/userStore.js'
import { useEffect, useState } from "react";
import TutorialQuiz from "../assets/js/Quiz.js";
import '../assets/css/quizStyles.css'
import { createDetail } from "../api/auth.js";

export default function QuizComponent({ questions, tutorialTitle }) {
  const { isAuthenticated, user, quizzes, setQuizzes } = userStore()
  const [lodadin, setLodadin] = useState(false)
  const [completed, setCompleted] = useState(false)

  const gameover = async () => {
    try {
      setLodadin(true)
      await createDetail({
        user: user.id,
        tutorialTitle,
        points: JSON.parse(localStorage.getItem("scoreboard")).at(-1).currentScore,
        maxPoints: questions.length
      })
      setLodadin(false)
      setCompleted(true)
      setQuizzes(tutorialTitle)
    } catch (error) {
      setLodadin(false)
      throw new Error(error)
    } finally {
      setLodadin(false)
    }
  }

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
        congratulations: "/img/check-game-over-quiz.webp",
      },
    };

    if (isAuthenticated && !completed) {
      const QuizT = new TutorialQuiz(questions, options, user, gameover);
      QuizT.init();
    }


  }, [isAuthenticated])

  useEffect(() => {
    if (quizzes.includes(tutorialTitle)) {
      setCompleted(true)
    }
  }, [quizzes])

  return (

    isAuthenticated
      ?
      !completed
        ? <div className="quiz">
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
          {lodadin && <span className='loader'></span>}
        </div>
        : <h1 className='title-completed'>Ya haz completado este quiz</h1>
      : <h1 className="noAuthenticated">Accede Para Ver Todo el Contenido</h1>

  )
}
