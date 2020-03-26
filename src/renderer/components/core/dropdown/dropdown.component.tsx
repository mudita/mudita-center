import * as React from "react"
import { ReactNode, useRef, useState } from "react"
import transition from "Renderer/styles/functions/transition"
import {
  backgroundColor,
  boxShadowColor,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import useOutsideClick from "Renderer/utils/hooks/useOutsideClick"
import styled, { css } from "styled-components"

interface Props {
  toggler: ReactNode
  leftPosition?: boolean
}

const DropdownWrapper = styled.div<{ visible: boolean }>`
  position: relative;
  z-index: ${({ visible }) => (visible ? zIndex("dropdown") : 0)};
  overflow: ${({ visible }) => (visible ? "initial" : "hidden")};
`

const DropdownList = styled.ul<{
  visible: boolean
  leftPosition?: boolean
  reversedPosition: boolean
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
  ${({ leftPosition }) =>
    leftPosition
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

const Dropdown: FunctionComponent<Props> = ({
  toggler,
  children,
  leftPosition,
}) => {
  const [visible, setVisible] = useState(false)
  const [reversedPosition, setReversedPosition] = useState(false)
  const ref = useRef<HTMLUListElement>(null)

  useOutsideClick(ref, () => {
    if (visible) {
      setVisible(false)
      setReversedPosition(false)
    }
  })

  const calculateVerticalPosition = () => {
    if (ref.current) {
      const box = (ref.current as HTMLUListElement).getBoundingClientRect()
      setReversedPosition(box.bottom > window.innerHeight)
    }
  }

  return (
    <DropdownWrapper visible={visible}>
      {React.cloneElement(toggler as React.ReactElement, {
        onClick: () => {
          calculateVerticalPosition()
          setVisible(!visible)
        },
      })}
      <DropdownList
        reversedPosition={reversedPosition}
        leftPosition={leftPosition}
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
