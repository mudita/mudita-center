import { storiesOf } from "@storybook/react"
import React from "react"
import Messages from "./messages.component"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"
import AttachContactModal from "App/messages/components/attach-contact-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import {
  attachContactFlatListData,
  attachContactListData,
} from "App/messages/__mocks__/attach-contact-list-data"

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
