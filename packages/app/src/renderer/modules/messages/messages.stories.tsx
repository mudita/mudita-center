import { storiesOf } from "@storybook/react"
import React from "react"
import Messages from "./messages.component"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"
import TemplateModal from "Renderer/modules/messages/template-modal.component"
import AttachContactModal from "Renderer/components/rest/messages/attach-contact-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import {
  mockedTemplateData,
  extendedTemplateData,
} from "Renderer/modules/messages/__mocks__/template-modal-data"
import {
  attachContactFlatListData,
  attachContactListData,
} from "Renderer/modules/messages/__mocks__/attach-contact-list-data"

storiesOf("Views|Messages", module).add("Messages", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Messages
      language={"en"}
      list={rowsMessages}
      searchValue={""}
      attachContactList={attachContactListData}
      attachContactFlatList={attachContactFlatListData}
    />
  </div>
))

storiesOf("Views|Messages/Modals", module)
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
  .add("Attach contact", () => {
    return (
      <div style={{ maxWidth: "97.5rem" }}>
        <ModalWrapper>
          <AttachContactModal
            contactList={attachContactListData}
            contactFlatList={attachContactFlatListData}
          />
        </ModalWrapper>
        <ModalBackdrop />
      </div>
    )
  })
  .add("Attach contact - empty list", () => {
    return (
      <div style={{ maxWidth: "97.5rem" }}>
        <ModalWrapper>
          <AttachContactModal contactList={[]} contactFlatList={[]} />
        </ModalWrapper>
        <ModalBackdrop />
      </div>
    )
  })
