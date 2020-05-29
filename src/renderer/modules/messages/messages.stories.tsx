import { storiesOf } from "@storybook/react"
import React from "react"
import Messages from "./messages.component"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"
import TemplateModal from "Renderer/modules/messages/template-modal.component"
import styled from "styled-components"
import { ModalWrapper } from "Renderer/components/core/modal/modal.styled.elements"

const TemplateWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: gray;
`

storiesOf("Views|Messages", module).add("Messages", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Messages list={rowsMessages} searchValue={""} />
  </div>
))

storiesOf("Views|Messages/Modals", module).add("Template modal", () => (
  <TemplateWrapper>
    <ModalWrapper>
      <TemplateModal templates={["lala1", "lala2", "lala3"]} />
    </ModalWrapper>
  </TemplateWrapper>
))
