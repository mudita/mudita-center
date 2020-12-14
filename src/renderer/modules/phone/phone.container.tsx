import { connect } from "react-redux"
import { History, LocationState } from "history"
import Phone from "./phone.component"
import { noop } from "Renderer/utils/noop"
import { select } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import { URL_MAIN } from "Renderer/constants/urls"
import createRouterPath from "Renderer/utils/create-router-path"
import {
  Contact,
  ContactID,
  NewContact,
} from "Renderer/models/phone/phone.typings"
import addContact from "Renderer/requests/add-contact.request"
import logger from "App/main/utils/logger"
import editContact from "Renderer/requests/edit-contact.request"
import deleteContactsRequest from "Renderer/requests/delete-contacts.request"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import externalProvidersStore from "Renderer/store/external-providers"
import {
  contactDatabaseFactory,
  getFlatList,
} from "Renderer/models/phone/phone.helpers"

const selector = select(({ phone, messages }) => ({
  contactList: phone.contactList,
  flatList: phone.flatList,
  speedDialChosenList: phone.speedDialChosenList,
  getContact: phone.getContact,
  isTopicThreadOpened: messages.isTopicThreadOpened,
}))

const mapStateToProps = (state: RootModel) => {
  const { phone, auth } = state
  return {
    ...phone,
    ...auth,
    ...selector(state, {}),
  }
}

const mapDispatch = ({ phone, auth }: any) => {
  return {
    ...phone,
    ...auth,
    onSearchTermChange: noop,
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
          contacts = await externalProvidersStore.dispatch.google.getContacts()
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
        phone.addContact(data)
      }
    },
    editContact: async (contact: Contact): Promise<string | void> => {
      const { data, error } = await editContact(contact)
      if (error || !data) {
        logger.error(error)
        return error?.message ?? "Something went wrong"
      } else {
        phone.editContact(data)
      }
    },
    deleteContacts: async (ids: ContactID[]): Promise<string | void> => {
      const { error } = await deleteContactsRequest(ids)
      if (error) {
        logger.error(error)
        const successIds = ids.filter((id) => !error.data?.includes(id))
        phone.removeContact(successIds)
        return error?.message ?? "Something went wrong"
      } else {
        phone.removeContact(ids)
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatch)(Phone)
