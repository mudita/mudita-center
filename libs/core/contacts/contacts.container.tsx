/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { History, LocationState } from "history"
import { PayloadAction } from "@reduxjs/toolkit"
import Contacts from "Core/contacts/components/contacts/contacts.component"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { ReduxRootState, TmpDispatch } from "Core/__deprecated__/renderer/store"
import { RootModel } from "Core/__deprecated__/renderer/models/models"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import createRouterPath from "Core/__deprecated__/renderer/utils/create-router-path"
import {
  Contact,
  ContactID,
  NewContact,
} from "Core/contacts/reducers/contacts.interface"

import {
  ExternalProvider,
  Provider,
} from "Core/__deprecated__/renderer/models/external-providers/external-providers.interface"
import externalProvidersStore from "Core/__deprecated__/renderer/store/external-providers"
import {
  contactDatabaseFactory,
  getContacts,
} from "Core/contacts/helpers/contacts.helpers"
import { exportContacts } from "Core/contacts/helpers/export-contacts/export-contacts"
import { ContactErrorResponse } from "Core/contacts/components/contacts/contacts.interface"
import { isThreadOpenedSelector } from "Core/messages/selectors"
import { createNewContact } from "Core/contacts/actions/create-new-contacts.action"
import { deleteContacts } from "Core/contacts/actions/delete-contacts.action"
import { importContact } from "Core/contacts/actions/import-contact.action"
import { addNewContactsToState } from "Core/contacts/actions/base.action"
import { getContactSelector } from "Core/contacts/selectors/get-contact.selector"
import { speedDialChosenListSelector } from "Core/contacts/selectors/speed-dial-chosen-list.selector"
import { contactsSelector } from "Core/contacts/selectors/contacts.selector"
import { contactListSelector } from "Core/contacts/selectors/contact-list.selector"
import { authorize } from "Core/contacts/actions/authorize.action"
import { closeWindow } from "Core/contacts/actions/close-window.action"
import { editContact } from "Core/contacts/actions/edit-contact.action"
import {
  resetAllItems,
  selectAllItems,
  toggleItem,
} from "Core/contacts/actions"

const mapStateToProps = (state: RootModel & ReduxRootState) => {
  const { contacts, auth } = state
  const contactsList = contactListSelector(state)

  return {
    ...auth,
    selectedItems: state.contacts.selectedItems.rows,
    allItemsSelected: state.contacts.selectedItems.allItemsSelected,
    resultState: contacts.resultState,
    contactList: contactsList,
    contacts: contactsSelector(state),
    speedDialChosenList: speedDialChosenListSelector(state),
    getContact: (id: string) => getContactSelector(id)(state),
    isThreadOpened: (phoneNumber: string) =>
      isThreadOpenedSelector(phoneNumber)(state),
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...dispatch.auth,
    exportContacts: exportContacts,
    onMessage: (history: History<LocationState>, phoneNumber: string) =>
      history.push(createRouterPath(URL_MAIN.messages, { phoneNumber })),
    onSpeedDialSettingsSave: noop,
    loadContacts: async (provider: ExternalProvider) => {
      let contacts: Contact[]

      switch (provider) {
        case Provider.Google:
          contacts =
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/await-thenable
            (await externalProvidersStore.dispatch.google.getContacts()) as unknown as Contact[]
          return getContacts(contactDatabaseFactory(contacts))
        case Provider.Apple:
          return
        case Provider.Outlook:
          contacts =
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/await-thenable
            (await externalProvidersStore.dispatch.outlook.getContacts()) as unknown as Contact[]
          return getContacts(contactDatabaseFactory(contacts))
      }
    },
    addNewContact: async (
      contact: NewContact
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/require-await
    ): Promise<ContactErrorResponse | void> =>
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      dispatch(createNewContact(contact)),
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    importContact: async (contact: NewContact): Promise<string | void> =>
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      dispatch(importContact(contact)),
    editContact: async (
      contact: Contact
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/require-await
    ): Promise<PayloadAction<ContactErrorResponse | undefined>> =>
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      dispatch(editContact(contact)),
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    deleteContacts: async (ids: ContactID[]): Promise<string | void> =>
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      dispatch(deleteContacts(ids)),
    authorize: async (
      provider: ExternalProvider
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    ): Promise<string | undefined> => dispatch(authorize(provider)),
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    addNewContactsToState: async (contacts: Contact[]): Promise<void> =>
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      dispatch(addNewContactsToState(contacts)),
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    resetAllItems: () => dispatch(resetAllItems()),
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    selectAllItems: () => dispatch(selectAllItems()),
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    toggleItem: (id: string) => dispatch(toggleItem(id)),
    // TODO: Add proper actions
    onForward: noop,
    onBlock: noop,
    onSelect: noop,
    onCall: noop,
    closeImportWindow: (provider: ExternalProvider) => {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      void dispatch(closeWindow(provider))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)