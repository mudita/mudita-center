import { storiesOf } from "@storybook/react"
import React from "react"
import Messages from "./messages.component"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"
import TemplateModal from "Renderer/modules/messages/template-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import {
  mockedTemplateData,
  extendedTemplateData,
} from "Renderer/modules/messages/__mocks__/template-modal-data"

storiesOf("Views/Messages", module).add("Messages", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Messages list={rowsMessages} searchValue={""} />
  </div>
))

storiesOf("Views/Messages/Modals", module)
  .add("Template modal", () => (
    <div style={{ maxWidth: "97.5rem" }}>
      <ModalWrapper>
        <TemplateModal templates={mockedTemplateData} />
      </ModalWrapper>
      <ModalBackdrop />
    </div>
  ))
  .add("Template modal - extended", () => (
    <div style={{ maxWidth: "97.5rem" }}>
      <ModalWrapper>
        <TemplateModal templates={extendedTemplateData} />
      </ModalWrapper>
      <ModalBackdrop />
    </div>
  ))
