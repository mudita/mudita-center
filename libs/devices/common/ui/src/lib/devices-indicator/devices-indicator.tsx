/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import styled, { css } from "styled-components"
import { Button, Icon } from "app-theme/ui"
import {
  ButtonTextModifier,
  ButtonType,
  IconSize,
  IconType,
} from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  text: { id: "general.components.devicesIndicator.text" },
})

type Props = Omit<
  ComponentProps<typeof Button>,
  "type" | "size" | "modifiers" | "children" | "text" | "to" | "target"
> & {
  devicesCount: number
}

export const DevicesIndicator: FunctionComponent<Props> = ({
  devicesCount,
  message,
  values,
  ...rest
}) => {
  return (
    <Wrapper
      {...rest}
      type={ButtonType.Text}
      modifiers={[
        ButtonTextModifier.HoverUnderline,
        ButtonTextModifier.DefaultCase,
      ]}
      $visible={devicesCount > 1}
    >
      <Counter>
        <Icon type={IconType.Phone} size={IconSize.Big} />
        <Badge>{devicesCount}</Badge>
      </Counter>
      {formatMessage(messages.text)}
    </Wrapper>
  )
}

const Counter = styled.div`
  position: relative;
  margin-right: 0.4rem;
`

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: -0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: ${({ theme }) => theme.app.color.white};
  background-color: ${({ theme }) => theme.app.color.black};
  font-size: ${({ theme }) => theme.app.fontSize.headline5};
  line-height: ${({ theme }) => theme.app.lineHeight.headline5};
  font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  transition-property: background-color;
  transition-duration: ${({ theme }) =>
    theme.app.constants.buttonTransitionDuration}ms;
  transition-timing-function: ${({ theme }) =>
    theme.app.constants.buttonTransitionEasing};
`

const Wrapper = styled(Button)<{ $visible?: boolean }>`
  font-size: ${({ theme }) => theme.app.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph1};
  color: ${({ theme }) => theme.app.color.black};
  letter-spacing: 0.02em;
  opacity: 0;
  visibility: hidden;
  transition-property: opacity, visibility;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      visibility: visible;
    `}

  &:disabled {
    ${Badge} {
      background-color: ${({ theme }) => theme.app.color.grey2};
    }
  }
`
