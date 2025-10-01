/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { FormattedMessage } from "react-intl"
import styled from "styled-components"
import { noop } from "lodash"
import { CheckboxSize } from "app-theme/models"
import { backgroundColor, borderColor, borderRadius } from "app-theme/utils"
import { Checkbox } from "../form/checkbox/checkbox"
import { Typography } from "../typography/typography"
import { SelectionManagerProps } from "./selection-manager.interface"

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

const Info = styled(Typography.P4)`
  grid-area: Info;
  line-height: 1.1;
`

const SelectionManagerWrapper = styled.section`
  display: grid;
  grid-template-areas: "Checkbox Info Buttons";
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 0.8rem;
  align-items: center;
  height: 4rem;
  padding: 0 2.4rem 0 1.2rem;
  background-color: ${backgroundColor("minor")};
  border-radius: ${borderRadius("medium")};
  border: solid 0.1rem ${borderColor("verticalSeparator")};
  box-sizing: border-box;
`

export const SelectionManager: FunctionComponent<
  SelectionManagerProps & { className?: string }
> = ({
  className,
  selectedItemsNumber,
  allItemsSelected,
  message,
  buttons,
  checkboxSize = CheckboxSize.Small,
  onToggle = noop,
  ...rest
}) => {
  return (
    <SelectionManagerWrapper className={className} {...rest}>
      <CheckboxWrapper>
        <Checkbox
          checked
          indeterminate={!allItemsSelected}
          onChange={onToggle}
          size={checkboxSize}
        />
      </CheckboxWrapper>
      <Info data-testid="info" color={"grey1"}>
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
