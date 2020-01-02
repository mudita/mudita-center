import * as React from "react"
import { ReactNode, useRef, useState } from "react"
import {
  backgroundColor,
  boxShadowColor,
  width,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import useOutsideClick from "Renderer/utils/hooks/useOutsideClick"
import styled, { css } from "styled-components"

export enum Width {
  S,
  M,
}

interface Props {
  toggler: ReactNode
  size: Width
}

const injectWidth = (size: Width) => {
  switch (size) {
    case Width.S:
      return css`
        width: ${width("smallPopUp")};
      `
    case Width.M:
      return css`
        width: ${width("mediumPopUp")};
      `
    default:
      return
  }
}

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownList = styled.ul<{ size: Width }>`
  position: absolute;
  right: 0;
  list-style-type: none;
  margin: 0;
  padding: 2.4rem 0;
  background-color: ${backgroundColor("light")};
  border-radius: 0.6rem 0.2rem;
  box-shadow: 0 1rem 5.5rem -0.5rem ${boxShadowColor("grey")};
  ${({ size }) => injectWidth(size)}
`

const Dropdown: FunctionComponent<Props> = ({ toggler, size, children }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutsideClick(ref, () => {
    if (open) {
      setOpen(false)
    }
  })
  return (
    <DropdownWrapper>
      {React.cloneElement(toggler as React.ReactElement, {
        onClick: () => setOpen(!open),
      })}
      {open && (
        <DropdownList size={size} ref={ref} data-testid="dropdown">
          {children}
        </DropdownList>
      )}
    </DropdownWrapper>
  )
}

export default Dropdown
