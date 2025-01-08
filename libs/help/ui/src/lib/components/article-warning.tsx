/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { Typography } from "generic-view/ui"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectCurrentArticle } from "help/store"
import { HelpTestId } from "../test-ids"

const messages = defineMessages({
  warning: {
    id: "module.help.article.warning",
  },
})

export const ArticleWarning: FunctionComponent = () => {
  const { articleId } = useParams<{ articleId: string }>()
  const article = useSelector((state: ReduxRootState) =>
    selectCurrentArticle(state, articleId)
  )

  if (!article?.warningMessage) {
    return null
  }

  return (
    <Wrapper>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid={HelpTestId.ArticleWarningIcon}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 20C7.5 13.0964 13.0964 7.5 20 7.5C26.9036 7.5 32.5 13.0964 32.5 20C32.5 26.9036 26.9036 32.5 20 32.5C13.0964 32.5 7.5 26.9036 7.5 20ZM20 9.16667C14.0169 9.16667 9.16667 14.0169 9.16667 20C9.16667 25.9831 14.0169 30.8333 20 30.8333C25.9831 30.8333 30.8333 25.9831 30.8333 20C30.8333 14.0169 25.9831 9.16667 20 9.16667Z"
          fill="#DD802A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.8612 23.1407C20.6666 23.1407 21.3195 23.7434 21.3195 24.4869C21.3195 25.2303 20.6666 25.833 19.8612 25.833C19.0558 25.833 18.4028 25.2303 18.4028 24.4869C18.4028 23.7434 19.0558 23.1407 19.8612 23.1407ZM19.8612 13.333C20.6263 13.333 21.2538 13.9264 21.3147 14.6811L21.3195 14.8015L21.0764 20.1862C21.0764 20.862 20.5323 21.4099 19.8612 21.4099C19.2295 21.4099 18.7103 20.9246 18.6515 20.304L18.6459 20.1862L18.4028 14.8015C18.4028 13.9905 19.0558 13.333 19.8612 13.333Z"
          fill="#DD802A"
        />
      </svg>
      <Content>
        <Typography.H4>{intl.formatMessage(messages.warning)}</Typography.H4>
        <Typography.P1 data-testid={HelpTestId.ArticleWarning}>
          {article.warningMessage}
        </Typography.P1>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: ${({ theme }) => theme.color.black};
  }
`
