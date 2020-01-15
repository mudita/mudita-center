import * as React from "react"
import { ReactNode, useRef, useState } from "react"
import transition from "Renderer/styles/functions/transition"
import {
  backgroundColor,
  boxShadowColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import useOutsideClick from "Renderer/utils/hooks/useOutsideClick"
import styled, { css } from "styled-components"

export enum DropdownPosition {
  Right,
  Left,
}

const getDropdownPositionStyles = (position: DropdownPosition) => {
  if (position === DropdownPosition.Right) {
    return css`
      right: 0;
      margin-top: 1rem;
    `
  }
  return css`
    margin-top: 0.5rem;
  `
}

interface Props {
  toggler: ReactNode
  dropdownPosition: DropdownPosition
}

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownList = styled.ul<{
  visible: boolean
  dropdownPosition: DropdownPosition
}>`
  position: absolute;
  list-style-type: none;
  padding: 2.4rem 0;
  background-color: ${backgroundColor("light")};
  border-radius: 0.2rem 0.2rem;
  box-shadow: 0 1rem 5.5rem -0.5rem ${boxShadowColor("grey")};
  min-width: 17rem;
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: ${transition("opacity", undefined, "ease")};
  ${({ dropdownPosition }) => getDropdownPositionStyles(dropdownPosition)}
`

const Dropdown: FunctionComponent<Props> = ({
  toggler,
  children,
  dropdownPosition = DropdownPosition.Right,
}) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  useOutsideClick(ref, () => {
    if (visible) {
      setVisible(false)
    }
  })

  return (
    <DropdownWrapper>
      {React.cloneElement(toggler as React.ReactElement, {
        onClick: () => setVisible(!visible),
      })}
      <DropdownList
        dropdownPosition={dropdownPosition}
        ref={ref}
        visible={visible}
        data-testid="dropdown"
      >
        {children}
      </DropdownList>
    </DropdownWrapper>
  )
}

export default Dropdown
