/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Type } from "Renderer/components/core/icon/icon.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { IconSize } from "Renderer/components/core/icon/icon.component"
import { IconButtonWithTooltipTestIds } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-tooltip.enum"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ElementWithTooltip from "Renderer/components/core/tooltip/element-with-tooltip.component"

const IconButton = styled(ButtonComponent).attrs(() => ({
  displayStyle: DisplayStyle.IconOnly,
}))``

interface Props
  extends Omit<
      ComponentProps<typeof ButtonComponent>,
      "children" | "displayStyle" | "onClick"
    >,
    Omit<ComponentProps<typeof ElementWithTooltip>, "Element"> {
  iconType?: Type
}

const IconButtonWithTooltip: FunctionComponent<Props> = ({
  iconType = Type.Tooltip,
  iconSize = IconSize.Medium,
  ...props
}) => {
  return (
    <ElementWithTooltip
      Element={
        <IconButton
          Icon={iconType}
          data-testid={IconButtonWithTooltipTestIds.Icon}
          iconSize={iconSize}
        />
      }
      {...props}
    />
  )
}

export default IconButtonWithTooltip
