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
import { IconButtonWithTooltipTestIds } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-tooltip.enum"

interface Props {
  className?: string
  description: MessageInterface
}

const Content = styled.div`
  width: max-content;
  max-width: 15rem;
  background-color: ${backgroundColor("disabled")};
  padding: 0.4rem 0.8rem;
  border-radius: ${borderRadius("medium")};
`

export const TooltipSecondaryContent: FunctionComponent<Props> = ({
  description,
  ...props
}) => {
  return (
    <Content {...props}>
      <Text
        displayStyle={TextDisplayStyle.Label}
        color="primary"
        element={"p"}
        message={description}
        data-testid={IconButtonWithTooltipTestIds.Description}
      />
    </Content>
  )
}
