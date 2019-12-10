import React, { ChangeEvent } from "react"
import { dispatch } from "Renderer/store"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3.2rem 0 4rem 0;
`

const ContactButtons = styled.div``

const ContactPanel: FunctionComponent = () => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "phoneView/handleInput", payload: event.target.value })
  }
  return (
    <Panel>
      <input type="text" onChange={onChange} />
      <ContactButtons>
        <button>Manage</button>
        <button>New contact</button>
      </ContactButtons>
    </Panel>
  )
}

export default ContactPanel
