/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { ButtonPrimary } from "generic-view/ui"
import { HelpTestId } from "../test-ids"

const messages = defineMessages({
  title: {
    id: "module.help.article.footer.title",
  },
  buttonLabel: {
    id: "module.help.article.footer.buttonLabel",
  },
})

export const ArticleFooter: FunctionComponent = () => {
  const openSupportWebsite = () => {
    window.open("https://support.mudita.com/support/home", "_blank")
  }
  return (
    <Wrapper data-testid={HelpTestId.ArticleFooter}>
      <Text data-testid={HelpTestId.ArticleFooterTitle}>
        {intl.formatMessage(messages.title)}
      </Text>
      <ButtonPrimary
        config={{
          text: intl.formatMessage(messages.buttonLabel),
          action: {
            type: "custom",
            callback: openSupportWebsite,
          },
        }}
        data-testid={HelpTestId.ArticleFooterButton}
      />
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
  background-color: ${({ theme }) => theme.color.grey5};
`

const Text = styled.p`
  font-size: 2rem;
  line-height: 3.2rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  white-space: pre;
  text-align: center;
  margin: 0;
`
