import React from "react"
import { storiesOf } from "@storybook/react"
import Phone from "Renderer/modules/phone/phone.component"
import { action } from "@storybook/addon-actions"
import {
  generateFakeData,
  generateSortedStructure,
} from "Renderer/models/phone/utils/utils"
import styled from "styled-components"

const contactList = generateSortedStructure(generateFakeData(40))

const PhoneWrapper = styled.div`
  max-width: 97.5rem;
  height: 100vh;
  overflow: hidden;
`

storiesOf("Views|Phone", module).add("Phone", () => (
  <PhoneWrapper>
    <Phone
      contactList={contactList}
      onSearchTermChange={action("Search")}
      onManageButtonClick={action("Manage contact")}
      onNewButtonClick={action("New contact")}
      onContactExport={action("Export contact")}
      onContactForward={action("Forward contact")}
      onContactBlock={action("Block contact")}
      onContactDelete={action("Delete contact")}
      onContactSelect={action("Selected contact")}
    />
  </PhoneWrapper>
))
