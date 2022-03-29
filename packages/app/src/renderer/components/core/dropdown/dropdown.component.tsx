/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { ReactElement, useRef, useState } from "react"
import {
  backgroundColor,
  boxShadowColor,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import useOutsideClick from "Renderer/utils/hooks/useOutsideClick"
import styled, { css } from "styled-components"
import { IconButtonWithSecondaryTooltip } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"
import { defineMessages } from "react-intl"
import { IconType } from "Renderer/components/core/icon/icon-type"

const messages = defineMessages({
  dropdownTogllerTooltipDescription: {
    id: "component.dropdownTogllerTooltipDescription",
  },
})

export enum DropdownPosition {
  Left,
  Right,
}

export interface DropdownProps {
  toggler?: ReactElement
  dropdownPosition?: DropdownPosition
  onOpen?: () => void
  onClose?: () => void
}

const DropdownWrapper = styled.div<{ visible: boolean }>`
  position: relative;
  z-index: ${({ visible }) => (visible ? zIndex("dropdown") : zIndex("menu"))};
  svg path {
    fill: textColor("primary");
  }
`

const DropdownList = styled.ul<{
  visible: boolean
  dropdownPosition?: DropdownPosition
  reversedPosition: boolean
}>`
  position: absolute;
  list-style-type: none;
  padding: 1.4rem 0;
  background-color: ${backgroundColor("row")};
  border-radius: 0.2rem 0.2rem;
  box-shadow: 0 1rem 5.5rem -0.5rem ${boxShadowColor("full")};
  min-width: 17rem;
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  ${({ dropdownPosition }) =>
    dropdownPosition === DropdownPosition.Left
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `};
  ${({ reversedPosition }) =>
    reversedPosition
      ? css`
          bottom: 100%;
          margin-bottom: 1rem;
        `
      : css`
          top: 100%;
          margin-top: 1rem;
        `};
`

const Dropdown: FunctionComponent<DropdownProps> = ({
  toggler = (
    <IconButtonWithSecondaryTooltip
      iconType={IconType.More}
      description={messages.dropdownTogllerTooltipDescription}
    />
  ),
  children,
  dropdownPosition = DropdownPosition.Right,
  onOpen,
  onClose,
  ...props
}) => {
  const [visible, setVisible] = useState(false)
  const [reversedPosition, setReversedPosition] = useState(false)
  const ref = useRef<HTMLUListElement>(null)

  const closeDropdown = () => {
    if (visible) {
      setVisible(false)
      setReversedPosition(false)
      if (onClose) {
        onClose()
      }
    }
  }

  useOutsideClick(ref, closeDropdown)

  const calculateVerticalPosition = () => {
    if (ref.current) {
      const box = ref.current.getBoundingClientRect()
      setReversedPosition(box.bottom > window.innerHeight)
    }
  }

  return (
    <DropdownWrapper visible={visible} {...props}>
      {React.isValidElement(toggler as ReactElement) &&
        React.cloneElement(toggler as ReactElement, {
          onClick: () => {
            calculateVerticalPosition()
            setVisible(!visible)
            if (onOpen) {
              onOpen()
            }
          },
        })}
      <DropdownList
        reversedPosition={reversedPosition}
        dropdownPosition={dropdownPosition}
        ref={ref}
        visible={visible}
        data-testid="dropdown"
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return child
          } else {
            return React.cloneElement(child, {
              onClick: () => {
                child.props.onClick()
                closeDropdown()
              },
            })
          }
        })}
      </DropdownList>
    </DropdownWrapper>
  )
}

export default Dropdown
