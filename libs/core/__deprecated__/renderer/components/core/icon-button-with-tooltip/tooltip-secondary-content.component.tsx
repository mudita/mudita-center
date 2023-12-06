/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { Message as MessageInterface } from "Core/__deprecated__/renderer/interfaces/message.interface"
import { IconButtonWithTooltipTestIds } from "Core/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-tooltip.enum"
import { TooltipContent, TooltipContentType } from "./tooltip-content.style"
import styled from "styled-components"

interface Props {
  className?: string
  description: MessageInterface
}

const Content = styled(TooltipContent)`
  width: max-content;
  max-width: 15rem;
`
export const TooltipSecondaryContent: FunctionComponent<Props> = ({
  description,
  ...props
}) => {
  return (
    <Content type={TooltipContentType.secondary} {...props}>
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
