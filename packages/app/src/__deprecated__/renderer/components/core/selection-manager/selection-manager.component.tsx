/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages, FormattedMessage } from "react-intl"
import InputCheckbox, {
  CheckboxTooltipDescription,
} from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { SelectionManagerProps } from "App/__deprecated__/renderer/components/core/selection-manager/selection-manager.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderColor,
  borderRadius,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import styled from "styled-components"

const messages = defineMessages({
  checkTooltipDescription: {
    id: "component.selectionUnselectAllTooltipDescription",
  },
  uncheckTooltipDescription: {
    id: "component.selectionSelectAllTooltipDescription",
  },
})

const checkboxTooltipDescription: CheckboxTooltipDescription = {
  checkTooltipDescription: messages.checkTooltipDescription,
  uncheckTooltipDescription: messages.uncheckTooltipDescription,
}

const Buttons = styled.div`
  grid-area: Buttons;
  justify-self: end;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 1.6rem;
  padding-right: 2.4rem;

  button {
    &:hover {
      background-color: ${backgroundColor("minor")};
    }
  }
`

const CheckboxWrapper = styled.div`
  grid-area: Checkbox;
`

const Info = styled(Text)`
  grid-area: Info;
  line-height: 1.1;
`

const SelectionManagerWrapper = styled.section<{ enlarged?: boolean }>`
  display: grid;
  grid-template-areas: "Checkbox Info Buttons";
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 0.8rem;
  align-items: center;
  height: 4rem;
  padding: 0 0.7rem;
  padding-left: ${({ enlarged }) => (enlarged ? 1.4 : 0.7)}rem;
  background-color: ${backgroundColor("minor")};
  border-radius: ${borderRadius("medium")};
  border: solid 0.1rem ${borderColor("verticalSeparator")};
  box-sizing: border-box;
`

const SelectionManager: FunctionComponent<SelectionManagerProps> = ({
  className,
  selectedItemsNumber,
  allItemsSelected,
  message,
  buttons,
  enlarged,
  checkboxSize,
  onToggle = noop,
  ...rest
}) => {
  return (
    <SelectionManagerWrapper
      className={className}
      enlarged={enlarged}
      {...rest}
    >
      <CheckboxWrapper>
        <InputCheckbox
          checked
          indeterminate={!allItemsSelected}
          onChange={onToggle}
          size={checkboxSize}
          checkboxTooltipDescription={checkboxTooltipDescription}
        />
      </CheckboxWrapper>
      <Info
        displayStyle={TextDisplayStyle.Paragraph4}
        data-testid="info"
        color="secondary"
      >
        <FormattedMessage
          {...message}
          values={{ num: allItemsSelected ? -1 : selectedItemsNumber }}
        />
      </Info>
      {Boolean(buttons?.length) && (
        <Buttons data-testid="buttons">{buttons}</Buttons>
      )}
    </SelectionManagerWrapper>
  )
}

export default SelectionManager
