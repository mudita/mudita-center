import React from "react"
import { storiesOf } from "@storybook/react"
import Contacts, {
  messages,
  PhoneProps,
} from "App/contacts/contacts-ui.component"
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
import { phoneSeed, phoneSeedInput } from "App/seeds/phone"
import {
  createFullName,
  getFlatList,
  getSortedContactList,
  getSpeedDialChosenList,
} from "App/contacts/store/contacts.helpers"
import { asyncNoop, noop } from "Renderer/utils/noop"

const dummyPromise = (result: any) => () => result
const getContact = (id: ContactID) => phoneSeed.db[id]
const labeledContactList: any = getSortedContactList(phoneSeed)
const flatList: any = getFlatList(phoneSeed)
const speedDialChosenList: number[] = getSpeedDialChosenList(phoneSeed)
const isTopicThreadOpened = () => true

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
    isTopicThreadOpened={isTopicThreadOpened}
    loadData={asyncNoop}
    addNewContact={asyncNoop}
    editContact={asyncNoop}
    contacts={phoneSeedInput}
    loadContacts={asyncNoop}
    inputValue={""}
    savingContact={false}
    speedDialContacts={[]}
    deleteContacts={asyncNoop}
    authorize={asyncNoop}
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
  email: "jondoe@gmail.com",
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
      isTopicThreadOpened={isTopicThreadOpened}
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
      isTopicThreadOpened={isTopicThreadOpened}
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
      isTopicThreadOpened={isTopicThreadOpened}
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
      isTopicThreadOpened={isTopicThreadOpened}
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
      isTopicThreadOpened={isTopicThreadOpened}
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
