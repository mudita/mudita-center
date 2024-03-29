/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { ComponentProps } from "react"
import { TooltipSecondaryContent } from "Core/__deprecated__/renderer/components/core/icon-button-with-tooltip/tooltip-secondary-content.component"
import { InputProps } from "Core/__deprecated__/renderer/interfaces/input.interface"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import ElementWithTooltip from "Core/__deprecated__/renderer/components/core/tooltip/element-with-tooltip.component"
import styled, { css } from "styled-components"
import {
  backgroundColor,
  borderColor,
  transitionTime,
  transitionTimingFunction,
} from "Core/core/styles/theming/theme-getters"

const checkedStyles = css`
  background-color: ${backgroundColor("primary")};
  border-color: ${borderColor("hover")};
  + svg {
    display: initial;
  }
`

const Input = styled.input<Omit<InputProps, "children">>`
  appearance: none;
  outline: none;
  margin: 0;
  display: inline-block;
  height: 100%;
  width: 100%;
  background-clip: content-box;
  border: 0.1rem solid ${borderColor("secondary")};
  border-radius: 0.2rem;
  background-color: ${backgroundColor("row")};
  transition: border-color ${transitionTime("quick")}
    ${transitionTimingFunction("smooth")};

  &:hover {
    border-color: ${borderColor("hover")};
    cursor: pointer;
  }

  &:checked {
    ${checkedStyles};
  }
  ${({ indeterminate }) => indeterminate && checkedStyles};
`

interface Props extends Omit<InputProps, "children"> {
  description?: ComponentProps<typeof TooltipSecondaryContent>["description"]
  threadsOffset?: { left: number; top: number }
}

export const InputCheckboxWithTooltip: FunctionComponent<Props> = ({
  description,
  inputRef,
  threadsOffset,
  ...props
}) => {
  return (
    <>
      {description === undefined ? (
        <Input type="checkbox" ref={inputRef} {...props} />
      ) : (
        <ElementWithTooltip
          Element={<Input type="checkbox" ref={inputRef} {...props} />}
          threadsOffset={threadsOffset}
        >
          <TooltipSecondaryContent description={description} />
        </ElementWithTooltip>
      )}
    </>
  )
}
