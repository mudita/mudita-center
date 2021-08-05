/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { History, LocationState } from "history"
import Contacts from "App/contacts/components/contacts/contacts.component"
import { noop } from "Renderer/utils/noop"
import { select } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import { URL_MAIN } from "Renderer/constants/urls"
import createRouterPath from "Renderer/utils/create-router-path"
import {
  Contact,
  ContactID,
  NewContact,
} from "App/contacts/store/contacts.type"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import addContact from "Renderer/requests/add-contact.request"
import logger from "App/main/utils/logger"
import editContact from "Renderer/requests/edit-contact.request"
import deleteContactsRequest from "Renderer/requests/delete-contacts.request"
import {
  ExternalProvider,
  Provider,
} from "Renderer/models/external-providers/external-providers.interface"
import externalProvidersStore from "Renderer/store/external-providers"
import {
  contactDatabaseFactory,
  getFlatList,
} from "App/contacts/store/contacts.helpers"
import { exportContacts } from "App/contacts/helpers/export-contacts/export-contacts"
import { ContactErrorResponse } from "App/contacts/components/contacts/contacts.type"

const selector = select(({ contacts, messages }) => ({
  contactList: contacts.contactList,
  flatList: contacts.flatList,
  speedDialChosenList: contacts.speedDialChosenList,
  getContact: contacts.getContact,
  isThreadOpened: messages.isThreadOpened,
}))

const mapStateToProps = (state: RootModel) => {
  const { contacts, auth } = state
  return {
    ...contacts,
    ...auth,
    ...selector(state, {}),
  }
}

const mapDispatch = ({ contacts, auth }: any) => {
  return {
    ...contacts,
    ...auth,
    // TODO: Add proper actions
    onExport: exportContacts,
    onForward: noop,
    onBlock: noop,
    onSelect: noop,
    onCall: noop,
    onMessage: (history: History<LocationState>, phoneNumber: string) =>
      history.push(createRouterPath(URL_MAIN.messages, { phoneNumber })),
    onSpeedDialSettingsSave: noop,
    loadContacts: async (provider: ExternalProvider) => {
      let contacts: Contact[]

      switch (provider) {
        case Provider.Google:
          contacts = ((await externalProvidersStore.dispatch.google.getContacts()) as unknown) as Contact[]
          return getFlatList(contactDatabaseFactory(contacts))
        case Provider.Apple:
          return
        case Provider.Outlook:
          contacts = ((await externalProvidersStore.dispatch.outlook.getContacts()) as unknown) as Contact[]
          return getFlatList(contactDatabaseFactory(contacts))
      }
    },
    addNewContact: async (
      contact: NewContact
    ): Promise<ContactErrorResponse | void> => {
      const { data, error, status } = await addContact(contact)
      if (error || !data) {
        logger.error(
          `Contacts: adding new contact throw error. Data: ${JSON.stringify(
            error
          )}`
        )

        return {
          status,
          message: error?.message ?? "AddNewContact: Something went wrong",
        }
      } else {
        contacts.addContact(data)
      }
    },
    importContact: async (contact: NewContact): Promise<string | void> => {
      const { data, error, status } = await addContact(contact)

      // Skipping 409 (Conflict) status code for preventing displaying error about duplicated
      if (status === DeviceResponseStatus.Duplicated) {
        contacts.addContact(data)
        return
      }

      if (error || !data) {
        logger.error(
          `Contacts: adding new contact throw error. Data: ${JSON.stringify(
            error
          )}`
        )

        return error?.message ?? "AddNewContact: Something went wrong"
      } else {
        contacts.addContact(data)
      }
    },
    editContact: async (
      contact: Contact
    ): Promise<ContactErrorResponse | void> => {
      const { data, error, status } = await editContact(contact)
      if (error || !data) {
        logger.error(
          `Contacts: editing new contact throw error. Data: ${JSON.stringify(
            error
          )}`
        )
        return {
          status,
          message: error?.message ?? "EditContact: Something went wrong",
        }
      } else {
        contacts.editContact(data)
      }
    },
    deleteContacts: async (ids: ContactID[]): Promise<string | void> => {
      const { error } = await deleteContactsRequest(ids)
      if (error) {
        logger.error(
          `Contacts: deleting new contact throw error. Data: ${JSON.stringify(
            error
          )}`
        )
        const successIds = ids.filter((id) => !error.data?.includes(id))
        contacts.removeContact(successIds)
        return error?.message ?? "DeleteContact: Something went wrong"
      } else {
        contacts.removeContact(ids)
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatch)(Contacts)
