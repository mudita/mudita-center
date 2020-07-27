import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { helpQuestionsAndAnswers } from "App/__mocks__/help-data"
import { RouteComponentProps } from "react-router"

interface QuestionAndAnswer {
  questionId: string
  question: string
  answer: string
}

const Answer: FunctionComponent<RouteComponentProps<QuestionAndAnswer>> = ({
  match,
}) => {
  const questionAndAnswer = helpQuestionsAndAnswers.find(
    ({ id }) => id === match.params.questionId
  )

  return <div>{questionAndAnswer?.answer}</div>
}

export default Answer
