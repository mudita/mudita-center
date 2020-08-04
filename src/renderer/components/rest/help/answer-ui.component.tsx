import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { RouteComponentProps } from "react-router"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"

interface Props extends RouteComponentProps<{ questionId: string }> {
  list: QuestionAndAnswer
}

const AnswerUI: FunctionComponent<Props> = ({ match, list }) => {
  const { items } = list
  return <div>{items[match.params.questionId].answer}</div>
}

export default AnswerUI
