/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { IconButtonWithTooltipTestIds } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-tooltip.enum"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import ElementWithTooltip from "App/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const IconButton = styled(ButtonComponent).attrs(() => ({
  displayStyle: DisplayStyle.IconOnly,
}))``

interface Props
  extends Omit<
      ComponentProps<typeof ButtonComponent>,
      "children" | "displayStyle"
    >,
    Omit<ComponentProps<typeof ElementWithTooltip>, "Element"> {
  iconType?: IconType
  testId?: string
}

const IconButtonWithTooltip: FunctionComponent<Props> = ({
  iconType = IconType.Tooltip,
  iconSize = IconSize.Medium,
  testId,
  ...props
}) => {
  return (
    <ElementWithTooltip
      Element={
        <IconButton
          Icon={iconType}
          data-testid={testId ?? IconButtonWithTooltipTestIds.Icon}
          iconSize={iconSize}
        />
      }
      {...props}
    />
  )
}

export default IconButtonWithTooltip
