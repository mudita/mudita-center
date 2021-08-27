/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import Contacts, { messages } from "App/contacts/components/contacts/contacts.component"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"
import ContactDetails from "App/contacts/components/contact-details/contact-details.component"
import { Contact, ContactID } from "App/contacts/store/contacts.type"
import { ResultsState } from "App/contacts/store/contacts.enum"
import ContactEdit, {
  defaultContact,
} from "App/contacts/components/contact-edit/contact-edit.component"
import SpeedDialModal from "App/contacts/components/speed-dial-modal/speed-dial-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { intl, textFormatters } from "Renderer/utils/intl"
import { contactsSeed, contactsSeedInput } from "App/seeds/contacts"
import {
  createFullName,
  getFlatList,
  getSortedContactList,
  getSpeedDialChosenList,
} from "App/contacts/store/contacts.helpers"
import { asyncNoop, noop } from "Renderer/utils/noop"
import { PhoneProps } from "App/contacts/components/contacts/contacts.type"

const dummyPromise = (result: any) => () => result
const getContact = (id: ContactID) => contactsSeed.db[id]
const labeledContactList: any = getSortedContactList(contactsSeed)
const flatList: any = getFlatList(contactsSeed)
const speedDialChosenList: number[] = getSpeedDialChosenList(contactsSeed)
const isThreadOpened = () => true

const ContactsWrapper = styled.div`
  max-width: 97.5rem;
  height: 100vh;
  overflow: hidden;
`

const ContactsComponent = ({
  resultsState = ResultsState.Empty,
  contactList = labeledContactList,
}: Partial<Pick<PhoneProps, "resultsState" | "contactList">>) => (
  <Contacts
    getContact={getContact as any}
    flatList={flatList}
    contactList={contactList}
    speedDialChosenList={speedDialChosenList}
    onManageButtonClick={dummyPromise(action("Manage contact"))}
    onNewButtonClick={action("New contact")}
    onEdit={action("Edit contact")}
    onExport={action("Export contact")}
    onForward={action("Forward contact")}
    onUnblock={action("Unblock contact")}
    onBlock={action("Block contact")}
    onDelete={action("Delete contact")}
    onMessage={action("Send message")}
    onCall={action("Call")}
    onSpeedDialSettingsSave={action("Save speed dial settings")}
    resultsState={resultsState}
    selectedContacts={[]}
    resetRows={action("Reset rows")}
    setProviderData={noop}
    isThreadOpened={isThreadOpened}
    loadData={asyncNoop}
    addNewContact={asyncNoop}
    importContact={asyncNoop}
    editContact={asyncNoop}
    contacts={contactsSeedInput}
    loadContacts={asyncNoop}
    inputValue={""}
    savingContact={false}
    speedDialContacts={[]}
    deleteContacts={asyncNoop}
    authorize={asyncNoop}
    editMode={false}
  />
)

storiesOf("Views|Phone", module)
  .add("Loading", () => (
    <ContactsWrapper>
      <ContactsComponent resultsState={ResultsState.Loading} />
    </ContactsWrapper>
  ))
  .add("Empty", () => (
    <ContactsWrapper>
      <ContactsComponent contactList={[]} />
    </ContactsWrapper>
  ))
  .add("Loaded", () => (
    <ContactsWrapper>
      <ContactsComponent resultsState={ResultsState.Loaded} />
    </ContactsWrapper>
  ))
  .add("No search results", () => (
    <ContactsWrapper>
      <ContactsComponent resultsState={ResultsState.Loaded} contactList={[]} />
    </ContactsWrapper>
  ))

const singleContact = ({
  favourite = false,
  blocked = false,
  speedDial,
}: Partial<Contact> = {}) => ({
  ...defaultContact,
  id: "107c8787-31a8-4499-ab43-776640fd3ca7",
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: "+40 211 456 285",
  secondaryPhoneNumber: "+37 030 922 283",
  email: "example@mudita.com",
  note: "Lorem ipsum dolor sit amet.",
  firstAddressLine: "50856 Mabelle Motorway",
  secondAddressLine: "USA",
  favourite,
  blocked,
  speedDial,
  ice: true,
})

storiesOf("Views|Phone/Contact details/Existing", module)
  .add("Default", () => (
    <ContactDetails
      contact={singleContact()}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onUnblock={action("Unblock contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
      isThreadOpened={isThreadOpened}
    />
  ))
  .add("Favourite, speed dial", () => (
    <ContactDetails
      contact={singleContact({ favourite: true, speedDial: 3 })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onUnblock={action("Unblock contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
      isThreadOpened={isThreadOpened}
    />
  ))
  .add("Favourite only", () => (
    <ContactDetails
      contact={singleContact({ favourite: true })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onUnblock={action("Unblock contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
      isThreadOpened={isThreadOpened}
    />
  ))
  .add("Speed dial only", () => (
    <ContactDetails
      contact={singleContact({ speedDial: 3 })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onUnblock={action("Unblock contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
      isThreadOpened={isThreadOpened}
    />
  ))
  .add("Blocked", () => (
    <ContactDetails
      contact={singleContact({ blocked: true })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onUnblock={action("Unblock contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
      isThreadOpened={isThreadOpened}
    />
  ))

storiesOf("Views|Phone/Contact details/Edit", module).add("Default", () => (
  <ContactEdit
    speedDialChosenList={speedDialChosenList}
    contact={singleContact()}
    onCancel={action("Cancel")}
    onSave={action("Save")}
    onSpeedDialSettingsOpen={action("Open speed dial settings")}
  />
))

storiesOf("Views|Phone/Contact details/New", module).add("Default", () => (
  <ContactEdit
    speedDialChosenList={speedDialChosenList}
    onCancel={action("Cancel")}
    onSave={action("Save")}
    onSpeedDialSettingsOpen={action("Open speed dial settings")}
  />
))

storiesOf("Views|Contacts/Modals", module)
  .add("Speed dial settings", () => (
    <>
      <ModalWrapper>
        <SpeedDialModal
          editContact={noop as any}
          onSave={action("Save")}
          onClose={action("Close")}
          flatList={flatList}
        />
      </ModalWrapper>
      <ModalBackdrop />
    </>
  ))
  .add("Delete contact", () => (
    <>
      <ModalWrapper>
        <DeleteModal
          title={intl.formatMessage({
            ...messages.deleteTitle,
          })}
          message={{
            ...messages.deleteText,
            values: {
              name: createFullName(singleContact()),
              ...textFormatters,
            },
          }}
          onDelete={action("Delete")}
          onClose={action("Close")}
        />
      </ModalWrapper>
      <ModalBackdrop />
    </>
  ))
