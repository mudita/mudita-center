import React, { ChangeEvent } from "react"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import { Icon } from "Renderer/components/core/input-text/input-text.stories"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { intl } from "Renderer/utils/intl"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

const Panel = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 38rem 1fr;
  padding: 3.2rem 3rem 1rem 4rem;
  background-color: ${backgroundColor("tableLabel")};

  label {
    width: auto;
  }
`

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(13rem, 1fr));
  grid-column-gap: 1.6rem;
  justify-self: end;

  button {
    width: auto;
  }
`

interface PanelInterface {
  onSearchTermChange: (event: string) => void
}

const ContactPanel: FunctionComponent<PanelInterface> = ({
  onSearchTermChange,
}) => {
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(target.value)
  }
  return (
    <Panel>
      <InputComponent
        leadingIcons={[<Icon key={1} />]}
        placeholder={intl.formatMessage({
          id: "view.name.phone.contacts.panel.searchPlaceholder",
        })}
        onChange={onChange}
        type="search"
        outlined
      />
      <Buttons>
        <ButtonComponent
          displayStyle={DisplayStyle.Secondary}
          labelMessage={{ id: "view.name.phone.contacts.panel.manageButton" }}
        />
        <ButtonComponent
          labelMessage={{
            id: "view.name.phone.contacts.panel.newContactButton",
          }}
        />
      </Buttons>
    </Panel>
  )
}

export default ContactPanel
