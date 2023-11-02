/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import Contacts, {
  messages,
} from "App/contacts/components/contacts/contacts.component"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"
import ContactDetails from "App/contacts/components/contact-details/contact-details.component"
import ContactEdit, {
  defaultContact,
} from "App/contacts/components/contact-edit/contact-edit.component"
import SpeedDialModal from "App/contacts/components/speed-dial-modal/speed-dial-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import DeleteModal from "App/__deprecated__/renderer/components/core/modal/delete-modal.component"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import { contactsSeed } from "App/__deprecated__/seeds/contacts"
import {
  createFullName,
  getFlatList,
  getSortedContactList,
  getSpeedDialChosenList,
} from "App/contacts/helpers/contacts.helpers"
import { asyncNoop, noop } from "App/__deprecated__/renderer/utils/noop"
import { ContactsProps } from "App/contacts/components/contacts/contacts.interface"
import {
  Contact,
  ContactID,
  ResultState,
} from "App/contacts/reducers/contacts.interface"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
const dummyPromise = (result: any) => () => result
const getContact = (id: ContactID) => contactsSeed.db[id]
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const labeledContactList: any = getSortedContactList(contactsSeed)
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flatList: any = getFlatList(contactsSeed)
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
    flatList={flatList}
    contactList={contactList}
    speedDialChosenList={speedDialChosenList}
    onManageButtonClick={dummyPromise(action("Manage contact"))}
    onEdit={action("Edit contact")}
    onForward={action("Forward contact")}
    onUnblock={action("Unblock contact")}
    onBlock={action("Block contact")}
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
  />
)

export default {
  title: 'Views|Phone',
};

export const _Loading = () => (
    <ContactsWrapper>
      <ContactsComponent resultState={ResultState.Loading} />
    </ContactsWrapper>
  );

export const _Empty = () => (
    <ContactsWrapper>
      <ContactsComponent contactList={[]} />
    </ContactsWrapper>
  );

export const _Loaded = () => (
    <ContactsWrapper>
      <ContactsComponent resultState={ResultState.Loaded} />
    </ContactsWrapper>
  );

export const NoSearchResults = () => (
    <ContactsWrapper>
      <ContactsComponent resultState={ResultState.Loaded} contactList={[]} />
    </ContactsWrapper>
  );

NoSearchResults.story = {
  name: 'No search results',
};

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

export default {
  title: 'Views|Phone/Contact details/Existing',
};

export const Default = () => (
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
  );

export const FavouriteSpeedDial = () => (
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
  );

FavouriteSpeedDial.story = {
  name: 'Favourite, speed dial',
};

export const FavouriteOnly = () => (
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
  );

FavouriteOnly.story = {
  name: 'Favourite only',
};

export const SpeedDialOnly = () => (
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
  );

SpeedDialOnly.story = {
  name: 'Speed dial only',
};

export const Blocked = () => (
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
  );

export default {
  title: 'Views|Phone/Contact details/Edit',
};

export const _Default = () => (
  <ContactEdit
    speedDialChosenList={speedDialChosenList}
    contact={singleContact()}
    onCancel={action("Cancel")}
    onSave={action("Save")}
    onSpeedDialSettingsOpen={action("Open speed dial settings")}
  />
);

export default {
  title: 'Views|Phone/Contact details/New',
};

export const __Default = () => (
  <ContactEdit
    speedDialChosenList={speedDialChosenList}
    onCancel={action("Cancel")}
    onSave={action("Save")}
    onSpeedDialSettingsOpen={action("Open speed dial settings")}
  />
);

export default {
  title: 'Views|Contacts/Modals',
};

export const SpeedDialSettings = () => (
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
          flatList={flatList}
        />
      </ModalWrapper>
      <ModalBackdrop />
    </>
  );

SpeedDialSettings.story = {
  name: 'Speed dial settings',
};

export const DeleteContact = () => (
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
  );

DeleteContact.story = {
  name: 'Delete contact',
};
