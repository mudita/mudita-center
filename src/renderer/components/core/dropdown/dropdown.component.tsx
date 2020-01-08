import * as React from "react"
import { ReactNode, useEffect, useRef, useState } from "react"
import {
  backgroundColor,
  boxShadowColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import useOutsideClick from "Renderer/utils/hooks/useOutsideClick"
import styled, { css } from "styled-components"

interface Props {
  toggler: ReactNode
}

const fadeEnter = css`
  @keyframes fadeEnter {
    from {
      opacity: 0;
    }
  }
  animation: fadeEnter 0.5s both ease-in;
`

const fadeLeave = css`
  @keyframes fadeLeave {
    to {
      opacity: 0;
    }
  }
  animation: fadeLeave 0.5s both ease-out;
`

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownList = styled.ul<{ showAnimation: boolean }>`
  position: absolute;
  right: 0;
  list-style-type: none;
  margin: 1.3rem 0 0 0;
  padding: 2.4rem 0;
  background-color: ${backgroundColor("light")};
  border-radius: 0.6rem 0.2rem;
  box-shadow: 0 1rem 5.5rem -0.5rem ${boxShadowColor("grey")};
  min-width: 17rem;
  ${({ showAnimation }) => (showAnimation ? fadeEnter : fadeLeave)}
`

const Dropdown: FunctionComponent<Props> = ({ toggler, children }) => {
  const [show, setShow] = useState(false)
  const [render, setRender] = useState(show)
  const ref = useRef(null)
  useOutsideClick(ref, () => {
    if (show) {
      setShow(false)
    }
  })

  useEffect(() => {
    if (show) {
      setRender(true)
    }
  }, [show])

  const onAnimationEnd = () => {
    if (!show) {
      setRender(false)
    }
  }

  return (
    <DropdownWrapper>
      {React.cloneElement(toggler as React.ReactElement, {
        onClick: () => setShow(!show),
      })}
      {render && (
        <DropdownList
          ref={ref}
          showAnimation={show}
          data-testid="dropdown"
          onAnimationEnd={onAnimationEnd}
        >
          {children}
        </DropdownList>
      )}
    </DropdownWrapper>
  )
}

export default Dropdown
