import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { RouteComponentProps } from "react-router"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"

interface Props extends RouteComponentProps<{ questionId: string }> {
  list: QuestionAndAnswer[]
}

const AnswerUI: FunctionComponent<Props> = ({ match, list }) => {
  const itemToRender = list.find(({ id }) => id === match.params.questionId)

  return <div>{itemToRender?.answer}</div>
}

export default AnswerUI
