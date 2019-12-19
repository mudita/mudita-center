import * as React from "react"
import { ReactNode, useState } from "react"
import { width } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

export enum Size {
  S,
  M,
  L,
  XL,
}

interface Props {
  toggler: ReactNode
  size: Size
}

const injectSize = (size: Size) => {
  switch (size) {
    case Size.S:
      return css`
        width: ${width("smallPopUp")};
      `
    case Size.M:
      return css`
        width: ${width("buttonMedium")};
      `
    case Size.L:
      return css`
        width: ${width("buttonBig")};
      `
    case Size.XL:
      return css`
        width: ${width("buttonBig")};
      `
    default:
      return
  }
}

const DropdownList = styled.ul<{ size: Size }>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${({ size }) => injectSize(size)}
  background-color: red;
`

const Dropdown: FunctionComponent<Props> = ({ toggler, size, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      {React.cloneElement(toggler as React.ReactElement, {
        onClick: () => setOpen(!open),
      })}
      {open && <DropdownList size={size}>{children}</DropdownList>}
    </>
  )
}

export default Dropdown
