import * as React from "react"
import { ReactNode, useRef, useState } from "react"
import {
  backgroundColor,
  boxShadowColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import useOutsideClick from "Renderer/utils/hooks/useOutsideClick"
import styled from "styled-components"

interface Props {
  toggler: ReactNode
}

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownList = styled.ul`
  position: absolute;
  right: 0;
  list-style-type: none;
  margin: 1.3rem 0 0 0;
  padding: 0.7rem 0;
  background-color: ${backgroundColor("light")};
  border-radius: 0.6rem 0.2rem;
  box-shadow: 0 1rem 5.5rem -0.5rem ${boxShadowColor("grey")};
  min-width: 17rem;
`

const Dropdown: FunctionComponent<Props> = ({ toggler, children }) => {
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
        <DropdownList ref={ref} data-testid="dropdown">
          {children}
        </DropdownList>
      )}
    </DropdownWrapper>
  )
}

export default Dropdown
