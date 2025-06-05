/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { Icon, Typography } from "app-theme/ui"
import { defineMessages, useIntl } from "react-intl"
import { useParams } from "react-router"
import { HelpTestId } from "help/models"
import { IconType } from "app-theme/models"

const messages = defineMessages({
  title: {
    id: "page.article.feedback.title",
  },
  thanks: {
    id: "page.article.feedback.thanks",
  },
  yesButtonLabel: {
    id: "page.article.feedback.yesButtonLabel",
  },
  noButtonLabel: {
    id: "page.article.feedback.noButtonLabel",
  },
})

interface ArticleFeedbackProps {
  ratedArticles: string[]
  rateArticle: ({
    articleId,
    positive,
  }: {
    articleId: string
    positive: boolean
  }) => void
}

export const ArticleFeedback: FunctionComponent<ArticleFeedbackProps> = ({
  ratedArticles,
  rateArticle,
}) => {
  const intl = useIntl()
  const { articleId = "" } = useParams<{ articleId: string }>()

  const isRated = articleId && ratedArticles.includes(articleId)

  const givePositiveFeedback = () => {
    rateArticle({ articleId, positive: true })
  }

  const giveNegativeFeedback = () => {
    rateArticle({ articleId, positive: false })
  }

  return (
    <Wrapper data-testid={HelpTestId.ArticleFeedback}>
      <Typography.H5 data-testid={HelpTestId.ArticleFeedbackTitle}>
        {intl.formatMessage(messages.title)}
      </Typography.H5>
      <Content>
        {isRated ? (
          <>
            <NamasteIcon type={IconType.Namaste} />
            <Thanks data-testid={HelpTestId.ArticleFeedbackThanks}>
              {intl.formatMessage(messages.thanks)}
            </Thanks>
          </>
        ) : (
          <>
            <FeedbackButton
              onClick={givePositiveFeedback}
              data-testid={HelpTestId.ArticleFeedbackYesButton}
            >
              <Typography.P1>
                {intl.formatMessage(messages.yesButtonLabel)}
              </Typography.P1>
            </FeedbackButton>
            <FeedbackButton
              onClick={giveNegativeFeedback}
              data-testid={HelpTestId.ArticleFeedbackNoButton}
            >
              <Typography.P1>
                {intl.formatMessage(messages.noButtonLabel)}
              </Typography.P1>
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
  border: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
  background-color: ${({ theme }) => theme.app.color.grey6};
  cursor: pointer;
  transition:
    border-color 0.2s,
    background-color 0.2s;

  p {
    color: ${({ theme }) => theme.app.color.black};
    transition: color 0.2s;
  }

  &:hover {
    border-color: ${({ theme }) => theme.app.color.grey1};
    background-color: ${({ theme }) => theme.app.color.grey1};

    p {
      color: ${({ theme }) => theme.app.color.white};
    }
  }
`

const Thanks = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.grey1};
`
