/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { ComponentProps } from "react"
import { TooltipSecondaryContent } from "Renderer/components/core/icon-button-with-tooltip/tooltip-secondary-content.component"
import { InputProps } from "Renderer/interfaces/input.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ElementWithTooltip, {
  ElementWithTooltipPlace,
} from "Renderer/components/core/tooltip/element-with-tooltip.component"
import styled, { css } from "styled-components"
import {
  backgroundColor,
  borderColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"

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
}

export const InputCheckboxWithTooltip: FunctionComponent<Props> = ({
  description,
  inputRef,
  ...props
}) => {
  return (
    <>
      {description === undefined ? (
        <Input type="checkbox" ref={inputRef} {...props} />
      ) : (
        <ElementWithTooltip
          Element={<Input type="checkbox" ref={inputRef} {...props} />}
          place={ElementWithTooltipPlace.BottomLeft}
        >
          <TooltipSecondaryContent description={description} />
        </ElementWithTooltip>
      )}
    </>
  )
}
