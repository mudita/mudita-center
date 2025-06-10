/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { defineMessages, useIntl } from "react-intl"
import { Button } from "app-theme/ui"
import { HelpTestId } from "help/models"
import { ButtonSize, ButtonType } from "app-theme/models"

const messages = defineMessages({
  title: {
    id: "page.article.footer.title",
  },
  buttonLabel: {
    id: "page.article.footer.buttonLabel",
  },
})

export const ArticleFooter: FunctionComponent = () => {
  const intl = useIntl()
  const openSupportWebsite = () => {
    window.open("https://support.mudita.com/support/home", "_blank")
  }

  return (
    <Wrapper data-testid={HelpTestId.ArticleFooter}>
      <Text data-testid={HelpTestId.ArticleFooterTitle}>
        {intl.formatMessage(messages.title)}
      </Text>
      <Button
        onClick={openSupportWebsite}
        type={ButtonType.Primary}
        size={ButtonSize.Large}
      >
        {intl.formatMessage(messages.buttonLabel)}
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1.4rem;
  padding: 3.2rem;
  background-color: ${({ theme }) => theme.app.color.grey5};
`

const Text = styled.p`
  font-size: 2rem;
  line-height: 3.2rem;
  font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  white-space: pre;
  text-align: center;
  margin: 0;
`
