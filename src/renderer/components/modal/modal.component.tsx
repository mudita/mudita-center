import * as React from "react"
import { ReactNode, useState } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

export const ModalWrapper = styled.section`
  position: fixed;
  z-index: ${2 ** 31 - 1};

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`

const useModal = (content: ReactNode) => {
  const [visible, setVisibility] = useState(false)

  const open = () => {
    console.log("open")
    setVisibility(true)

    ReactDOM.createPortal(<ModalWrapper>{content}</ModalWrapper>, document.body)
  }

  const close = () => {
    console.log("close")
    setVisibility(false)
  }

  return {
    visible,
    open,
    close,
  }
}

export default useModal
