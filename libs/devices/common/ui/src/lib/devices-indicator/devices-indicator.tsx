/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent } from "react"
import styled from "styled-components"
import { Button, Icon, Typography } from "app-theme/ui"
import {
  ButtonTextModifier,
  ButtonType,
  IconSize,
  IconType,
} from "app-theme/models"
import { defineMessages } from "app-localize/utils"
import { AnimatePresence, motion } from "motion/react"

const messages = defineMessages({
  text: { id: "general.components.devicesIndicator.text" },
})

type Props = Omit<
  ComponentProps<typeof Button>,
  "type" | "size" | "modifiers" | "children" | "text" | "to" | "target"
> & {
  devicesCount: number
  visible?: boolean
  loading?: boolean
}

export const DevicesIndicator: FunctionComponent<Props> = ({
  devicesCount,
  visible,
  message,
  values,
  loading,
  ...rest
}) => {
  return (
    <Wrapper>
      <AnimatePresence mode={"wait"} initial={true}>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CustomButton
              type={ButtonType.Text}
              modifiers={[
                ButtonTextModifier.HoverUnderline,
                ButtonTextModifier.DefaultCase,
              ]}
              icon={IconType.Phone}
              iconSize={IconSize.Big}
              $devicesCount={devicesCount}
              {...rest}
            >
              <Text message={messages.text.id} />
              {loading && (
                <Icon type={IconType.Spinner} size={IconSize.Medium} />
              )}
            </CustomButton>
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  )
}

const Text = styled(Typography.P1)`
  color: inherit;
  display: inline-block;
  margin: 0 0.4rem;
  white-space: nowrap;
`

const CustomButton = styled(Button)<{
  $devicesCount?: number
  disabled?: boolean
}>`
  color: ${({ theme }) => theme.app.color.black};

  &[disabled] {
    color: ${({ theme }) => theme.app.color.grey2};
  }

  ${Button.Icon} {
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 1.8rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: currentColor;
    }
    &:after {
      content: "${({ $devicesCount }) => $devicesCount}";
      position: absolute;
      top: -0.05rem;
      left: 1.85rem;
      text-align: center;
      width: 2rem;
      color: ${({ theme }) => theme.app.color.white};
      font-size: ${({ theme }) => theme.app.fontSize.headline5};
      line-height: ${({ theme }) => theme.app.lineHeight.headline5};
      font-weight: ${({ theme }) => theme.app.fontWeight.bold};
      transition-property: background-color;
      transition-duration: ${({ theme }) =>
        theme.app.constants.buttonTransitionDuration}ms;
      transition-timing-function: ${({ theme }) =>
        theme.app.constants.buttonTransitionEasing};
    }
`

const Wrapper = styled.div`
  position: relative;
  width: min-content;
  height: min-content;
`
