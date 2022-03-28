/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import InputCheckbox, {
  CheckboxTooltipDescription,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "Renderer/components/rest/animated-opacity/animated-opacity"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  checkTooltipDescription: { id: "component.rowCheckTooltipDescription" },
  uncheckTooltipDescription: { id: "component.rowUncheckTooltipDescription" },
})

const checkboxTooltipDescription: CheckboxTooltipDescription = {
  checkTooltipDescription: messages.checkTooltipDescription,
  uncheckTooltipDescription: messages.uncheckTooltipDescription,
}

export const VisibleCheckbox = styled(InputCheckbox).attrs(() => ({
  checkboxTooltipDescription,
}))<{ visible?: boolean }>`
  ${animatedOpacityStyles};
  ${({ visible }) => visible && animatedOpacityActiveStyles};
`
