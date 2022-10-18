/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  backgroundColor,
  borderRadius,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { Message as MessageInterface } from "App/__deprecated__/renderer/interfaces/message.interface"
import { LongTextTooltipTestIds } from "App/ui/components/long-text-tooltip/long-text-tooltip-test-ids"

interface Props {
  className?: string
  description?: string
  message?: MessageInterface
}

const Content = styled.div`
  width: 80%;
  background-color: ${backgroundColor("disabled")};
  padding: 0.4rem 0.8rem;
  border-radius: ${borderRadius("medium")};
`

export const LongTextTooltip: FunctionComponent<Props> = ({
  description,
  message,
  ...props
}) => {
  return (
    <Content {...props}>
      <Text
        displayStyle={TextDisplayStyle.Label}
        color="primary"
        element={"p"}
        message={message ? message : undefined}
        data-testid={LongTextTooltipTestIds.Text}
      >
        {!message && description}
      </Text>
    </Content>
  )
}
