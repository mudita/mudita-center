/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import Messages from "App/messages/components/messages/messages.component"
import {
  rowMessages,
  rowThreads,
} from "App/__deprecated__/renderer/components/core/table/table.fake-data"
import AttachContactModal from "App/messages/components/attach-contact-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import {
  Contact,
  ContactCategory,
} from "App/contacts/reducers/contacts.interface"
import {
  Receiver,
  ReceiverIdentification,
  ResultState,
} from "App/messages/reducers/messages.interface"
import { action } from "@storybook/addon-actions"
import history from "App/__deprecated__/renderer/routes/history"
import { Router } from "react-router"
import { PayloadAction } from "@reduxjs/toolkit"
import { PaginationBody } from "@mudita/pure"
import { noop } from "App/__deprecated__/renderer/utils/noop"

const promiseAction =
  (msg: string): ((...args: any[]) => Promise<any>) =>
  (...args) => {
    action(msg)(...args)
    return Promise.resolve()
  }

const receivers: Receiver[] = [
  {
    firstName: "Oswald",
    lastName: "Bednar",
    phoneNumber: "+62761294266",
    identification: ReceiverIdentification.unknown,
  },
  {
    lastName: "Abernathy",
    phoneNumber: "+78722986805",
    identification: ReceiverIdentification.unknown,
  },
  {
    firstName: "Sandra",
    lastName: "Zulauf",
    phoneNumber: "+01078963511",
    identification: ReceiverIdentification.unknown,
  },
]

export const attachContactFlatListData: Contact[] = [
  {
    id: "6e3810c8-c917-45d2-ae17-b83f73127e08",
    firstName: "Oswald",
    lastName: "Bednar",
    primaryPhoneNumber: "+62761294266",
    email: "example@mudita.com",
    note: "cum aut voluptatem sunt",
    favourite: true,
    firstAddressLine: "30177 Altenwerth Trace",
    secondAddressLine: "East Percivalberg",
  },
  {
    id: "63cd8522-f4eb-4bdd-a916-a6d5647e89f9",
    lastName: "Abernathy",
    primaryPhoneNumber: "+78722986805",
    note: "eum",
    blocked: true,
  },
  {
    id: "990f38dd-1c84-4d23-a8bb-6fcfff42774b",
    firstName: "Sandra",
    lastName: "Zulauf",
    secondaryPhoneNumber: "+01078963511",
    email: "example@mudita.com",
    note: "sequi sunt nisi",
    firstAddressLine: "09136 Linda Spring",
  },
]
export const attachContactListData: ContactCategory[] = [
  {
    category: "Favorites",
    contacts: [
      {
        id: "6e3810c8-c917-45d2-ae17-b83f73127e08",
        firstName: "Oswald",
        lastName: "Bednar",
        primaryPhoneNumber: "+62761294266",
        email: "example@mudita.com",
        note: "cum aut voluptatem sunt",
        favourite: true,
        firstAddressLine: "30177 Altenwerth Trace",
        secondAddressLine: "East Percivalberg",
      },
    ],
  },
  {
    category: "A",
    contacts: [
      {
        id: "63cd8522-f4eb-4bdd-a916-a6d5647e89f9",
        lastName: "Abernathy",
        primaryPhoneNumber: "+78722986805",
        note: "eum",
        blocked: true,
      },
    ],
  },
  {
    category: "Z",
    contacts: [
      {
        id: "990f38dd-1c84-4d23-a8bb-6fcfff42774b",
        firstName: "Sandra",
        lastName: "Zulauf",
        secondaryPhoneNumber: "+01078963511",
        email: "example@mudita.com",
        note: "sequi sunt nisi",
        firstAddressLine: "09136 Linda Spring",
      },
    ],
  },
]

const getContact = () => attachContactFlatListData[0]
const getMessagesByThreadId = () => rowMessages
const loadData = (): Promise<PayloadAction<PaginationBody | undefined>> =>
  Promise.resolve({ payload: undefined, type: "" })
const getMessagesResultsMapStateByThreadId = () => ResultState.Loaded
const isContactCreatedByPhoneNumber = () => true

storiesOf("Views|Messages", module).add("Messages", () => (
  <Router history={history}>
    <div style={{ maxWidth: "97.5rem" }}>
      <Messages
        language={"en"}
        threads={rowThreads}
        searchValue={""}
        attachContactList={attachContactListData}
        attachContactFlatList={attachContactFlatListData}
        getContact={getContact}
        getMessagesByThreadId={getMessagesByThreadId}
        getMessagesStateByThreadId={getMessagesResultsMapStateByThreadId}
        isContactCreatedByPhoneNumber={isContactCreatedByPhoneNumber}
        addNewMessage={promiseAction("Add New Message")}
        getContactByPhoneNumber={noop}
        getReceiver={noop}
        receivers={receivers}
        loadThreads={loadData}
        threadsState={ResultState.Loaded}
        messageLayoutNotifications={[]}
        removeLayoutNotification={noop}
        threadDeletingState={null}
        hideDeleteModal={noop}
        currentlyDeletingMessageId={null}
        deleteMessage={noop}
        messageDeletingState={null}
        hideMessageDeleteModal={noop}
      />
    </div>
  </Router>
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
