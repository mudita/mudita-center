/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import Contacts, {
  messages,
} from "Core/contacts/components/contacts/contacts.component"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"
import ContactDetails from "Core/contacts/components/contact-details/contact-details.component"
import ContactEdit, {
  defaultContact,
} from "Core/contacts/components/contact-edit/contact-edit.component"
import SpeedDialModal from "Core/contacts/components/speed-dial-modal/speed-dial-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Core/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import DeleteModal from "Core/__deprecated__/renderer/components/core/modal/delete-modal.component"
import { intl, textFormatters } from "Core/__deprecated__/renderer/utils/intl"
import { contactsSeed } from "Core/__deprecated__/seeds/contacts"
import {
  createFullName,
  getContacts,
  getSortedContactList,
  getSpeedDialChosenList,
} from "Core/contacts/helpers/contacts.helpers"
import { asyncNoop, noop } from "Core/__deprecated__/renderer/utils/noop"
import { ContactsProps } from "Core/contacts/components/contacts/contacts.interface"
import {
  Contact,
  ContactID,
  ResultState,
} from "Core/contacts/reducers/contacts.interface"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
const dummyPromise = (result: any) => () => result
const getContact = (id: ContactID) => contactsSeed.db[id]
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const labeledContactList: any = getSortedContactList(contactsSeed)
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const contacts: any = getContacts(contactsSeed)
const speedDialChosenList: number[] = getSpeedDialChosenList(contactsSeed)
const isThreadOpened = () => true

const ContactsWrapper = styled.div`
  max-width: 97.5rem;
  height: 100vh;
  overflow: hidden;
`

const ContactsComponent = ({
  resultState = ResultState.Empty,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  contactList = labeledContactList,
}: Partial<Pick<ContactsProps, "resultState" | "contactList">>) => (
  <Contacts
    allItemsSelected={false}
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    getContact={getContact as any}
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    contacts={contacts}
    contactList={contactList}
    speedDialChosenList={speedDialChosenList}
    onManageButtonClick={dummyPromise(action("Manage contact"))}
    onEdit={action("Edit contact")}
    onDelete={action("Delete contact")}
    onMessage={action("Send message")}
    onCall={action("Call")}
    onSpeedDialSettingsSave={action("Save speed dial settings")}
    resultState={resultState}
    setProviderData={noop}
    isThreadOpened={isThreadOpened}
    addNewContactsToState={asyncNoop}
    addNewContact={asyncNoop}
    importContact={asyncNoop}
    editContact={asyncNoop}
    loadContacts={asyncNoop}
    deleteContacts={asyncNoop}
    authorize={asyncNoop}
    exportContacts={asyncNoop}
    selectedItems={[]}
    allRowsSelected={false}
    resetAllItems={noop}
    selectAllItems={noop}
    toggleItem={noop}
    closeImportWindow={noop}
    getPaths={noop}
  />
)

storiesOf("Views|Phone", module)
  .add("Loading", () => (
    <ContactsWrapper>
      <ContactsComponent resultState={ResultState.Loading} />
    </ContactsWrapper>
  ))
  .add("Empty", () => (
    <ContactsWrapper>
      <ContactsComponent contactList={[]} />
    </ContactsWrapper>
  ))
  .add("Loaded", () => (
    <ContactsWrapper>
      <ContactsComponent resultState={ResultState.Loaded} />
    </ContactsWrapper>
  ))
  .add("No search results", () => (
    <ContactsWrapper>
      <ContactsComponent resultState={ResultState.Loaded} contactList={[]} />
    </ContactsWrapper>
  ))

const singleContact = ({
  favourite = false,
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
  speedDial,
  ice: true,
})

storiesOf("Views|Phone/Contact details/Existing", module)
  .add("Default", () => (
    <ContactDetails
      contact={singleContact()}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
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
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          editContact={noop as any}
          onSave={action("Save")}
          onClose={action("Close")}
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          contacts={contacts}
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
