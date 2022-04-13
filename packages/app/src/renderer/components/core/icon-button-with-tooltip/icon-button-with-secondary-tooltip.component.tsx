/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import IconButtonWithTooltip from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-tooltip.component"
import { TooltipSecondaryContent } from "Renderer/components/core/icon-button-with-tooltip/tooltip-secondary-content.component"
import { ElementWithTooltipPlace } from "Renderer/components/core/tooltip/element-with-tooltip.component"

interface Props
  extends ComponentProps<typeof TooltipSecondaryContent>,
    Omit<ComponentProps<typeof IconButtonWithTooltip>, "children"> {}

export const IconButtonWithSecondaryTooltip: FunctionComponent<Props> = ({
  description,
  ...props
}) => {
  return (
    <IconButtonWithTooltip
      place={ElementWithTooltipPlace.BottomLeft}
      {...props}
    >
      <TooltipSecondaryContent description={description} />
    </IconButtonWithTooltip>
  )
}
