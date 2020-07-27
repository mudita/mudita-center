import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { RouteComponentProps } from "react-router"
import { QuestionAndAnswer } from "Renderer/models/help/help.interface"

interface Props extends RouteComponentProps<{ questionId: string }> {
  helpQuestionsAndAnswers: QuestionAndAnswer[]
}

const AnswerUI: FunctionComponent<Props> = ({
  match,
  helpQuestionsAndAnswers,
}) => {
  const questionAndAnswer = helpQuestionsAndAnswers.find(
    ({ id }) => id === match.params.questionId
  )

  return <div>{questionAndAnswer?.answer}</div>
}

export default AnswerUI
