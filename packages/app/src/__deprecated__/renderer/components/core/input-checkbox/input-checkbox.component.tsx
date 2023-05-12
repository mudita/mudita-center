/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { ComponentProps } from "react"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { InputProps } from "App/__deprecated__/renderer/interfaces/input.interface"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { InputCheckboxWithTooltip } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox-with-tooltip"
import { TooltipSecondaryContent } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/tooltip-secondary-content.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export enum Size {
  Small,
  Medium,
  Large,
}

const getSize = (size: Size) => {
  switch (size) {
    case Size.Small:
      return css`
        height: 1.4rem;
        width: 1.4rem;
      `
    case Size.Medium:
      return css`
        height: 1.6rem;
        width: 1.6rem;
      `
    case Size.Large:
      return css`
        height: 2rem;
        width: 2rem;
      `
    default:
      return
  }
}

const Label = styled.label`
  display: flex;
  align-items: center;
`

const InputWrapper = styled.div<{ size: Size }>`
  position: relative;
  ${({ size }) => getSize(size)}
`
const CheckIcon = styled(Icon)<{ indeterminate?: boolean }>`
  opacity: 1;
  visibility: visible;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  user-select: none;
  path {
    stroke: ${backgroundColor("row")};
    fill: ${backgroundColor("row")};
  }
`

const LabelText = styled(Text)`
  margin-left: 1.3rem;
`

type Description = ComponentProps<typeof TooltipSecondaryContent>["description"]

export interface CheckboxTooltipDescription {
  uncheckTooltipDescription: Description
  checkTooltipDescription: Description
}

export interface InputCheckboxProps extends InputProps {
  size?: Size
  checkboxTooltipDescription?: CheckboxTooltipDescription
  threadsOffset?: { left: number; top: number }
}

const InputCheckbox: FunctionComponent<InputCheckboxProps> = ({
  className,
  label,
  indeterminate = false,
  size = Size.Large,
  inputRef,
  onChange,
  checkboxTooltipDescription,
  ...props
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (onChange) {
      onChange(event)
    }
  }

  const getDescription = (): undefined | Description => {
    if (checkboxTooltipDescription === undefined) {
      return undefined
    }

    if (props.checked) {
      return checkboxTooltipDescription.uncheckTooltipDescription
    } else {
      return checkboxTooltipDescription.checkTooltipDescription
    }
  }

  const checkbox = (
    <InputWrapper
      className={className}
      size={size}
      data-testid="checkbox-wrapper"
    >
      <InputCheckboxWithTooltip
        description={getDescription()}
        inputRef={inputRef}
        onChange={handleChange}
        {...props}
      />
      {indeterminate ? (
        <CheckIcon
          type={indeterminate ? IconType.CheckIndeterminate : IconType.Check}
          height={1.6}
          width={1}
          indeterminate={indeterminate}
        />
      ) : (
        <CheckIcon type={IconType.Check} width={2.2} height={1.6} />
      )}
    </InputWrapper>
  )
  return (
    <>
      {label ? (
        <Label>
          {checkbox}
          <LabelText
            displayStyle={TextDisplayStyle.Paragraph3}
            className={className}
            element={"span"}
          >
            {label}
          </LabelText>
        </Label>
      ) : (
        checkbox
      )}
    </>
  )
}

export default React.forwardRef<
  HTMLInputElement,
  ComponentProps<typeof InputCheckbox>
>((props, ref) => <InputCheckbox {...props} inputRef={ref} />)
