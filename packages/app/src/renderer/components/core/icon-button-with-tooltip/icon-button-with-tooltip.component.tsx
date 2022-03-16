/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import styled from "styled-components"
import _uniqueId from "lodash/uniqueId"
import { TooltipProps } from "react-tooltip"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Type } from "Renderer/components/core/icon/icon.config"
import Tooltip from "Renderer/components/core/tooltip/tooltip.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { IconSize } from "Renderer/components/core/icon/icon.component"
import { IconButtonWithTooltipTestIds } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-tooltip.enum"
import { DisplayStyle } from "Renderer/components/core/button/button.config"

const IconButton = styled(ButtonComponent).attrs(() => ({
  displayStyle: DisplayStyle.IconOnly,
  iconSize: IconSize.Medium,
}))``

interface Props extends Omit<TooltipProps, "children"> {
  iconType?: Type
}

const overridePosition: TooltipProps["overridePosition"] = (
  { left, top },
  event,
  triggerElement
) => {
  const arrowLeft = (triggerElement as HTMLElement).getBoundingClientRect().left
  const arrowTop =
    (triggerElement as HTMLElement).getBoundingClientRect().top +
    (triggerElement as HTMLElement).offsetHeight +
    15

  return { left: arrowLeft, top: arrowTop }
}

const IconButtonWithTooltip: FunctionComponent<Props> = ({
  iconType = Type.Tooltip,
  children,
  className,
  ...props
}) => {
  const [id] = useState(_uniqueId("prefix-"))

  return (
    <div>
      <IconButton
        data-tip
        data-for={id}
        Icon={iconType}
        data-testid={IconButtonWithTooltipTestIds.Icon}
        className={className}
      />
      <Tooltip
        id={id}
        effect="solid"
        data-border={false}
        arrowColor="transparent"
        backgroundColor={"transparent"}
        overridePosition={overridePosition}
        {...props}
      >
        {children}
      </Tooltip>
    </div>
  )
}

export default IconButtonWithTooltip
