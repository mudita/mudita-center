import React, { ChangeEvent } from "react"
import InputText, {
  TextInputLayouts,
} from "Renderer/components/core/input-text/input-text.component"
import { Icon } from "Renderer/components/core/input-text/input-text.stories"
import { dispatch } from "Renderer/store"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3.2rem 3rem 1rem 4rem;
`

const SearchInput = styled(InputText)`
  min-width: 39rem;
`

const ContactButtons = styled.div``

const ContactPanel: FunctionComponent = () => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "phoneView/handleInput", payload: event.target.value })
  }
  return (
    <Panel>
      <SearchInput
        layout={TextInputLayouts.Outlined}
        condensed
        leadingIcons={[<Icon key={1} />]}
        placeholder="Search contacts"
        onChange={onChange}
      />
      <ContactButtons>
        <button>Manage</button>
        <button>New contact</button>
      </ContactButtons>
    </Panel>
  )
}

export default ContactPanel
