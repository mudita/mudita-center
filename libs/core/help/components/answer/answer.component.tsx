/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { RouteComponentProps } from "react-router"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import styled from "styled-components"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { QuestionAndAnswer } from "Core/help/components/help.component"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextReactComponentOptions } from "Core/__deprecated__/renderer/utils/rich-text/rich-text-renderer"
import { backgroundColor } from "Core/core/styles/theming/theme-getters"
import { AnswerUiTestIds } from "Core/help/components/answer/answer-test-ids.enum"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

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

const AnswerContent = styled.div`
  max-width: 48rem;
`

interface Props extends RouteComponentProps<{ questionId: string }> {
  list: QuestionAndAnswer
}

const Answer: FunctionComponent<Props> = ({ match, list }) => {
  const { items } = list
  return (
    <AnswerContainer>
      <AnswerHeader>
        <BackLink
          Icon={IconType.ArrowLongLeft}
          displayStyle={DisplayStyle.Link}
          label={intl.formatMessage({
            id: "module.help.backLinkText",
          })}
          to={URL_MAIN.help}
          iconSize={IconSize.Medium}
          data-testid={AnswerUiTestIds.BackLink}
        />
      </AnswerHeader>
      <AnswerContent data-testid={AnswerUiTestIds.Content}>
        {items[match.params.questionId]?.answer ? (
          documentToReactComponents(
            items[match.params.questionId].answer,
            richTextReactComponentOptions
          )
        ) : (
          <Text
            displayStyle={TextDisplayStyle.Paragraph3}
            message={{ id: "module.help.answerError" }}
          />
        )}
      </AnswerContent>
    </AnswerContainer>
  )
}

export default Answer
