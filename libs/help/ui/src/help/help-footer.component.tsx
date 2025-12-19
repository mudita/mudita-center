/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, MouseEventHandler } from "react"
import styled from "styled-components"
import { defineMessages, useIntl } from "react-intl"
import {
  ButtonSize,
  ButtonTextModifier,
  ButtonType,
  IconType,
} from "app-theme/models"
import { Button, Typography } from "app-theme/ui"
import { HelpTestId } from "help/models"

const messages = defineMessages({
  title: {
    id: "page.help.footer.title",
  },
  description: {
    id: "page.help.footer.description",
  },
  buttonLabel: {
    id: "page.help.footer.buttonLabel",
  },
})

interface Props {
  onContactSupport: VoidFunction
}

export const HelpFooter: FunctionComponent<Props> = ({ onContactSupport }) => {
  const intl = useIntl()

  const handleContactSupport: MouseEventHandler = (e) => {
    e.preventDefault() // Prevent default navigation to avoid app reload on click
    onContactSupport()
  }

  return (
    <Wrapper data-testid={HelpTestId.MainFooter}>
      <Typography.H5 data-testid={HelpTestId.MainFooterTitle}>
        {intl.formatMessage(messages.title)}
      </Typography.H5>
      <Text data-testid={HelpTestId.MainFooterDescription}>
        {intl.formatMessage(messages.description)}
      </Text>
      <ButtonContainer>
        <Button
          data-testid={HelpTestId.MainFooterContactSupportButton}
          onClick={handleContactSupport}
          type={ButtonType.Text}
          modifiers={[ButtonTextModifier.Link]}
          size={ButtonSize.Large}
          icon={IconType.Support}
        >
          {intl.formatMessage(messages.buttonLabel)}
        </Button>
      </ButtonContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
  padding: 3.1rem 3.2rem 3.2rem;
  border-top: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
`

const Text = styled.p`
  font-size: ${({ theme }) => theme.app.fontSize.labelText};
  line-height: ${({ theme }) => theme.app.lineHeight.labelText};
  color: ${({ theme }) => theme.app.color.grey1};
  white-space: pre;
  text-align: right;
  margin: 0;
  flex: 1;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
