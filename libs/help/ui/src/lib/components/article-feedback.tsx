/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { H5, Icon, P1, P3 } from "generic-view/ui"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { useDispatch, useSelector } from "react-redux"
import { rateArticle, selectArticleRateStatus } from "help/store"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { useParams } from "react-router"
import { IconType } from "generic-view/utils"

const messages = defineMessages({
  title: {
    id: "module.help.article.feedback.title",
  },
  thanks: {
    id: "module.help.article.feedback.thanks",
  },
  yesButtonLabel: {
    id: "module.help.article.feedback.yesButtonLabel",
  },
  noButtonLabel: {
    id: "module.help.article.feedback.noButtonLabel",
  },
})

export const ArticleFeedback: FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch>()
  const { articleId } = useParams<{ articleId: string }>()
  const isRated = useSelector((state: ReduxRootState) =>
    selectArticleRateStatus(state, articleId)
  )

  const givePositiveFeedback = () => {
    dispatch(rateArticle({ articleId, positive: true }))
  }

  const giveNegativeFeedback = () => {
    dispatch(rateArticle({ articleId, positive: false }))
  }

  return (
    <Wrapper>
      <H5>{intl.formatMessage(messages.title)}</H5>
      <Content>
        {isRated ? (
          <>
            <NamasteIcon config={{ type: IconType.Namaste }} />
            <Thanks>{intl.formatMessage(messages.thanks)}</Thanks>
          </>
        ) : (
          <>
            <FeedbackButton onClick={givePositiveFeedback}>
              <P1>{intl.formatMessage(messages.yesButtonLabel)}</P1>
            </FeedbackButton>
            <FeedbackButton onClick={giveNegativeFeedback}>
              <P1>{intl.formatMessage(messages.noButtonLabel)}</P1>
            </FeedbackButton>
          </>
        )}
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`

const NamasteIcon = styled(Icon)`
  width: 3rem;
  height: 2.6rem;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;

  &:has(${NamasteIcon}) {
    gap: 1.4rem;
    padding-bottom: 0.6rem;
  }
`

const FeedbackButton = styled.button`
  width: 6.8rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  border-radius: 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  background-color: ${({ theme }) => theme.color.grey6};
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;

  p {
    color: ${({ theme }) => theme.color.black};
    transition: color 0.2s;
  }

  &:hover {
    border-color: ${({ theme }) => theme.color.grey1};
    background-color: ${({ theme }) => theme.color.grey1};

    p {
      color: ${({ theme }) => theme.color.white};
    }
  }
`

const Thanks = styled(P3)`
  color: ${({ theme }) => theme.color.grey1};
`
