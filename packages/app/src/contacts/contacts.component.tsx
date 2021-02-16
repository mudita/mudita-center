/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { connect } from "react-redux"
import { History, LocationState } from "history"
import Contacts from "./contacts-ui.component"
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
import addContact from "Renderer/requests/add-contact.request"
import logger from "App/main/utils/logger"
import editContact from "Renderer/requests/edit-contact.request"
import deleteContactsRequest from "Renderer/requests/delete-contacts.request"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import externalProvidersStore from "Renderer/store/external-providers"
import {
  contactDatabaseFactory,
  getFlatList,
} from "App/contacts/store/contacts.helpers"

const selector = select(({ contacts, messages }) => ({
  contactList: contacts.contactList,
  flatList: contacts.flatList,
  speedDialChosenList: contacts.speedDialChosenList,
  getContact: contacts.getContact,
  isTopicThreadOpened: messages.isTopicThreadOpened,
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
    onExport: noop,
    onForward: noop,
    onBlock: noop,
    onSelect: noop,
    onCall: noop,
    onMessage: (history: History<LocationState>, phoneNumber: string) =>
      history.push(createRouterPath(URL_MAIN.messages, { phoneNumber })),
    onSpeedDialSettingsSave: noop,
    loadContacts: async (provider: Provider) => {
      let contacts: Contact[]

      switch (provider) {
        case Provider.Google:
          contacts = ((await externalProvidersStore.dispatch.google.getContacts()) as unknown) as Contact[]
          return getFlatList(contactDatabaseFactory(contacts))
        case Provider.Apple:
          return
        case Provider.Microsoft:
          return
      }
    },
    addNewContact: async (contact: NewContact): Promise<string | void> => {
      const { data, error } = await addContact(contact)
      if (error || !data) {
        logger.error(error)
        return error?.message ?? "Something went wrong"
      } else {
        contacts.addContact(data)
      }
    },
    editContact: async (contact: Contact): Promise<string | void> => {
      const { data, error } = await editContact(contact)
      if (error || !data) {
        logger.error(error)
        return error?.message ?? "Something went wrong"
      } else {
        contacts.editContact(data)
      }
    },
    deleteContacts: async (ids: ContactID[]): Promise<string | void> => {
      const { error } = await deleteContactsRequest(ids)
      if (error) {
        logger.error(error)
        const successIds = ids.filter((id) => !error.data?.includes(id))
        contacts.removeContact(successIds)
        return error?.message ?? "Something went wrong"
      } else {
        contacts.removeContact(ids)
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatch)(Contacts)
