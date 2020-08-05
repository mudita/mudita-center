import Help, { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { RouteComponentProps } from "react-router"
import AnswerUI from "Renderer/components/rest/help/answer-ui.component"
import React from "react"

export const renderHelp = (data: QuestionAndAnswer) => <Help list={data} />

export const renderAnswer = (
  data: QuestionAndAnswer,
  props: RouteComponentProps<{ questionId: string }>
) => <AnswerUI list={data} {...props} />
