import React, { ChangeEvent } from "react"
import InputText, {
  TextInputLayouts,
} from "Renderer/components/core/input-text/input-text.component"
import { Icon } from "Renderer/components/core/input-text/input-text.stories"
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

interface PanelInterface {
  handleInput: (event: string) => string
}

const ContactPanel: FunctionComponent<PanelInterface> = ({ handleInput }) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleInput(event.target.value)
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
      <div>
        <button>Manage</button>
        <button>New contact</button>
      </div>
    </Panel>
  )
}

export default ContactPanel
