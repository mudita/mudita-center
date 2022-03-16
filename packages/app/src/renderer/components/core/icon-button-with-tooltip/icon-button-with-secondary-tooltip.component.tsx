/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import IconButtonWithTooltip, {
  IconButtonWithTooltipPlace,
} from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-tooltip.component"
import { TooltipSecondaryContent } from "Renderer/components/core/icon-button-with-tooltip/tooltip-secondary-content.component"

interface Props
  extends ComponentProps<typeof TooltipSecondaryContent>,
    ComponentProps<typeof IconButtonWithTooltip> {}

export const IconButtonWithSecondaryTooltip: FunctionComponent<Props> = ({
  description,
  ...props
}) => {
  return (
    <IconButtonWithTooltip
      place={IconButtonWithTooltipPlace.BottomLeft}
      {...props}
    >
      <TooltipSecondaryContent description={description} />
    </IconButtonWithTooltip>
  )
}
