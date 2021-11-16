/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import {
  backgroundColor,
  borderRadius,
  boxShadowColor,
  transitionTime,
  zIndex,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import { TooltipTestIds } from "Renderer/components/core/tooltip/tooltip.enum"

const TooltipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`

const TooltipContent = styled.div`
  width: max-content;
  max-width: 24.3rem;
  background-color: ${backgroundColor("row")};
  padding: 1.6rem;
  position: absolute;
  top: 2.7rem;
  left: 0;
  opacity: 0;
  border-radius: ${borderRadius("medium")};
  transition: opacity ${transitionTime("faster")}
    ${transitionTimingFunction("easeInOut")};
  box-shadow: 0 1rem 5.5rem -0.5rem ${boxShadowColor("light")};
`

const TooltipIcon = styled(Icon)`
  z-index: ${zIndex("tooltip")};
  cursor: pointer;
  &:hover {
    background-color: ${backgroundColor("minor")};
    border-radius: ${borderRadius("small")};
    + ${TooltipContent} {
      visibility: visible;
      opacity: 1;
      z-index: ${zIndex("tooltip")};
    }
  }
`

const TooltipTitle = styled(Text)`
  margin-bottom: 0.8rem;
`
interface Props {
  className?: string
  title?: MessageInterface
  description: MessageInterface
  iconType?: Type
  iconSize?: number
}

const Tooltip: FunctionComponent<Props> = ({
  className,
  title,
  description,
  iconType = Type.Tooltip,
  iconSize = 1.6,
}) => {
  return (
    <TooltipWrapper className={className}>
      <TooltipIcon
        type={iconType}
        height={iconSize}
        width={iconSize}
        data-testid={TooltipTestIds.Icon}
      />
      <TooltipContent>
        {title && (
          <TooltipTitle
            displayStyle={TextDisplayStyle.MediumText}
            element={"p"}
            message={title}
          />
        )}
        {description && (
          <Text
            displayStyle={TextDisplayStyle.MediumFadedLightText}
            element={"p"}
            message={description}
            data-testid={TooltipTestIds.Description}
          />
        )}
      </TooltipContent>
    </TooltipWrapper>
  )
}

export default Tooltip
