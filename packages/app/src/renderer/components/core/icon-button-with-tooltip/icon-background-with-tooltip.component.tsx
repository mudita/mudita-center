/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TooltipSecondaryContent } from "Renderer/components/core/icon-button-with-tooltip/tooltip-secondary-content.component"
import ElementWithTooltip, {
  ElementWithTooltipPlace,
} from "Renderer/components/core/tooltip/element-with-tooltip.component"
import { IconButtonWithTooltipTestIds } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-tooltip.enum"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"
import { IconSize } from "Renderer/components/core/icon/icon.component"

const IconButton = styled(ButtonComponent).attrs(() => ({
  displayStyle: DisplayStyle.IconOnlyWithBackground,
}))``

interface Props
  extends Omit<
      ComponentProps<typeof ButtonComponent>,
      "children" | "displayStyle"
    >,
    Omit<ComponentProps<typeof ElementWithTooltip>, "Element">,
    ComponentProps<typeof TooltipSecondaryContent> {
  iconType?: Type
}

export const IconBackgroundWithTooltip: FunctionComponent<Props> = ({
  description,
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
      place={ElementWithTooltipPlace.TopLeft}
      {...props}
    >
      <TooltipSecondaryContent description={description} />
    </ElementWithTooltip>
  )
}
