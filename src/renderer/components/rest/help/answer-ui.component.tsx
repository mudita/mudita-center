import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { RouteComponentProps } from "react-router"
import Button from "Renderer/components/core/button/button.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { intl } from "Renderer/utils/intl"
import styled from "styled-components"
import { URL_MAIN } from "Renderer/constants/urls"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextReactComponentOptions } from "Renderer/utils/rich-text/rich-text-renderer"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import { AnswerUiTestIds } from "Renderer/components/rest/help/answer-ui-test-ids.enum"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const AnswerContainer = styled.div`
  padding: 0 10.5rem;
  background-color: ${backgroundColor("row")};
  height: 100vh;
`

const AnswerHeader = styled.div`
  padding: 4.5rem 0 5.3rem 0;
  background-color: ${backgroundColor("row")};
`

const BackLink = styled(Button)`
  width: max-content;
`

interface Props extends RouteComponentProps<{ questionId: string }> {
  list: QuestionAndAnswer
}

const AnswerUI: FunctionComponent<Props> = ({ match, list }) => {
  const { items } = list
  return (
    <AnswerContainer>
      <AnswerHeader>
        <BackLink
          Icon={Type.ArrowLongLeft}
          displayStyle={DisplayStyle.Link1}
          label={intl.formatMessage({
            id: "view.name.help.backLinkText",
          })}
          to={URL_MAIN.help}
          data-testid={AnswerUiTestIds.BackLink}
        />
      </AnswerHeader>
      <div data-testid={AnswerUiTestIds.Content}>
        {items[match.params.questionId]?.answer ? (
          documentToReactComponents(
            items[match.params.questionId].answer,
            richTextReactComponentOptions
          )
        ) : (
          <Text
            displayStyle={TextDisplayStyle.MediumText}
            message={{ id: "view.name.help.answer.error" }}
          />
        )}
      </div>
    </AnswerContainer>
  )
}

export default AnswerUI
