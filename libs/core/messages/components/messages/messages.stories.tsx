/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { PayloadAction } from "@reduxjs/toolkit"
import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import { PaginationBody } from "Core/device/types/mudita-os"
import {
  Contact,
  ContactCategory,
} from "Core/contacts/reducers/contacts.interface"
import Messages from "Core/messages/components/messages/messages.component"
import { ResultState } from "Core/messages/constants"
import {
  Receiver,
  ReceiverIdentification,
} from "Core/messages/reducers/messages.interface"
import {
  rowMessages,
  rowThreads,
} from "Core/__deprecated__/renderer/components/core/table/table.fake-data"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { State } from "Core/core/constants"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const promiseAction = (msg: string): ((...args: any[]) => Promise<any>) => {
  return (...args) => {
    action(msg)(...args)
    return Promise.resolve()
  }
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
  <Router>
    <div style={{ maxWidth: "97.5rem" }}>
      <Messages
        language={"en"}
        threads={rowThreads}
        searchValue={""}
        getContact={getContact}
        getActiveMessagesByThreadIdSelector={getMessagesByThreadId}
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
        currentlyDeletingMessageId={null}
        deleteMessage={noop}
        resendMessage={jest.fn()}
        updateMessage={jest.fn()}
        templates={[]}
        error={null}
        selectedItems={{
          rows: [],
        }}
        toggleItem={jest.fn()}
        selectAllItems={jest.fn()}
        resetItems={jest.fn()}
        searchMessages={jest.fn()}
        searchMessagesForPreview={jest.fn()}
        searchResult={{}}
        searchPreviewResult={{}}
        state={State.Initial}
      />
    </div>
  </Router>
))
