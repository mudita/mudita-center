import { storiesOf } from "@storybook/react"
import React from "react"
import Messages from "./messages.component"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"
import TemplateModal from "Renderer/modules/messages/template-modal.component"
import styled from "styled-components"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import { mockedList } from "Renderer/components/rest/messages/__mocks__/caller-data"
import {
  mockedTemplateData,
  extendedTemplateData,
} from "Renderer/modules/messages/__mocks__/template-modal-data"

const TemplateModalWrapper = styled(ModalWrapper)`
  padding: 4rem 3.2rem;
`

storiesOf("Views|Messages", module).add("Messages", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Messages list={rowsMessages} searchValue={""} />
  </div>
))

storiesOf("Views|Messages/Modals", module)
  .add("Template modal", () => (
    <div style={{ maxWidth: "97.5rem" }}>
      <Messages searchValue="" list={mockedList} />
      <TemplateModalWrapper>
        <TemplateModal templates={mockedTemplateData} />
      </TemplateModalWrapper>
      <ModalBackdrop />
    </div>
  ))
  .add("Template modal - extended", () => (
    <div style={{ maxWidth: "97.5rem" }}>
      <Messages searchValue="" list={mockedList} />
      <TemplateModalWrapper>
        <TemplateModal templates={extendedTemplateData} />
      </TemplateModalWrapper>
      <ModalBackdrop />
    </div>
  ))
