/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import IconButtonWithTooltip from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-tooltip.component"
import { TooltipPrimaryContent } from "Renderer/components/core/icon-button-with-tooltip/tooltip-primary-content.component"

interface Props
  extends ComponentProps<typeof TooltipPrimaryContent>,
    ComponentProps<typeof IconButtonWithTooltip> {}

export const IconButtonWithPrimaryTooltip: FunctionComponent<Props> = ({
  description,
  title,
  ...props
}) => {
  return (
    <IconButtonWithTooltip {...props}>
      <TooltipPrimaryContent title={title} description={description} />
    </IconButtonWithTooltip>
  )
}
