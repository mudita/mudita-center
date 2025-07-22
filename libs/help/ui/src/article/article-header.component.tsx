/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { useNavigate } from "react-router"
import { Button, Typography } from "app-theme/ui"
import { defineMessages, useIntl } from "react-intl"
import { HelpTestId } from "help/models"

const messages = defineMessages({
  buttonLabel: {
    id: "page.article.backButton.text",
  },
})

interface Props {
  title: string
}

export const ArticleHeader: FunctionComponent<Props> = ({ title }) => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const intl = useIntl()

  return (
    <Wrapper>
      <Button
        onClick={goBack}
        type={ButtonType.Text}
        icon={IconType.ArrowBack}
        size={ButtonSize.AutoMin}
      >
        {intl.formatMessage(messages.buttonLabel)}
      </Button>
      <Typography.H3 data-testid={HelpTestId.ArticleTitle}>
        {title}
      </Typography.H3>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 0.6rem;
  padding: 1.8rem 3.2rem 1.7rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.app.color.grey4};

  button {
    height: initial;
  }
`
