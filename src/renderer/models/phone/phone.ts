import { Slicer, StoreSelectors } from "@rematch/select"
import { Dispatch } from "Renderer/store"
import {
  BaseContactModel,
  Contact,
  ContactID,
  NewContact,
  Phone,
  StoreData,
} from "Renderer/models/phone/phone.typings"
import {
  addContacts,
  contactDatabaseFactory,
  getFlatList,
  getSortedContactList,
  getSpeedDialChosenList,
  removeContact,
  revokeField,
  updateContact,
} from "Renderer/models/phone/phone.helpers"
import { isContactMatchingPhoneNumber } from "Renderer/models/phone/is-contact-matching-phone-number"
import externalProvidersStore from "Renderer/store/external-providers"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import getContactsRequest from "Renderer/requests/get-contacts.request"
import addContactRequest from "Renderer/requests/add-contact.request"
import editContactRequest from "Renderer/requests/edit-contact.request"
import deleteContactsRequest from "Renderer/requests/delete-contacts.request"
import logger from "App/main/utils/logger"

export const initialState: Phone = {
  db: {},
  collection: [],
}

let writeTrials = 0
let failedTrials = 0

/**
 * Probably implement some kind of UI integration with this, to tell user
 * that the data is only stored in the app at the moment.
 *
 * We should keep data in here, so the user won't lose the changes
 * if something is wrong on the hardware side. First successful sync
 * should remove the local data.
 *
 * TODO(Tomek Buszewski): Talk about this when this task is merged
 */
const simulateWriteToPhone = async (time = 2000) => {
  if (failedTrials >= 3) {
    console.error("Cannot write to phone")
    return
  }

  writeTrials = writeTrials + 1

  await new Promise((resolve) => setTimeout(resolve, time))

  if (writeTrials % 3 === 0) {
    console.error("Write failed, retrying")
    failedTrials = failedTrials + 1
    await simulateWriteToPhone(time)
  } else {
    console.log("Write successful")
  }
}

export default {
  state: initialState,
  reducers: {
    setContacts(state: Phone, contacts: Contact[]): Phone {
      return contactDatabaseFactory(contacts)
    },
    setContactsToImport(state: Phone, contacts: Contact[]): Phone {
      return { ...state, contactsToImport: contactDatabaseFactory(contacts) }
    },
    clearContactsToImport(state: Phone): Phone {
      return { ...state, contactsToImport: undefined }
    },
    addContact(state: Phone, contact: Contact): Phone {
      let currentState = state

      /**
       * This is an example situation when two entities share the same (unique)
       * data, so one has to release it.
       */
      if (contact.speedDial) {
        currentState = revokeField(state, { speedDial: contact.speedDial })
      }

      return addContacts(currentState, contact)
    },
    updateContact(state: Phone, data: BaseContactModel): Phone {
      let currentState = state

      if (data.speedDial) {
        currentState = revokeField(state, { speedDial: data.speedDial })
      }

      return updateContact(currentState, data)
    },
    removeContact(state: Phone, input: ContactID | ContactID[]): Phone {
      return removeContact(state, input)
    },
    updateContacts(state: Phone, contacts: Phone) {
      return {
        db: { ...state.db, ...contacts.db },
        collection: [...state.collection, ...contacts.collection],
      }
    },
  },
  /**
   * All these side effects are just for show, since we don't know anything
   * about phone sync flow at the moment.
   */
  effects: (dispatch: Dispatch) => ({
    loadData: async (): Promise<string | void> => {
      const { data = [], error } = await getContactsRequest()
      if (error) {
        logger.error(error)
        return error.message
      } else {
        dispatch.phone.setContacts(data)
      }
    },
    async loadContacts(provider: Provider) {
      let contacts: Contact[]

      switch (provider) {
        case Provider.Google:
          contacts = await externalProvidersStore.dispatch.google.getContacts()
          dispatch.phone.setContactsToImport(contacts)
      }
    },
    authorize(provider: Provider) {
      switch (provider) {
        case Provider.Google:
          return externalProvidersStore.dispatch.google.authorize()
        // TODO: update when adding new providers
        case Provider.Apple:
          return
        case Provider.Microsoft:
          return
      }
    },
    addNewContact: async (contact: NewContact): Promise<string | void> => {
      const { data, error } = await addContactRequest(contact)
      if (error || !data) {
        logger.error(error)
        return error?.message ?? "Something went wrong"
      } else {
        dispatch.phone.addContact(data)
      }
    },
    editContact: async (contact: Contact): Promise<string | void> => {
      const { data, error } = await editContactRequest(contact)
      if (error || !data) {
        logger.error(error)
        return error?.message ?? "Something went wrong"
      } else {
        dispatch.phone.updateContact(data)
      }
    },
    async deleteContacts(input: ContactID[]): Promise<string | void> {
      const { error } = await deleteContactsRequest(input)
      if (error) {
        logger.error(error)
        const successIds = input.filter((id) => !error.data?.includes(id))
        dispatch.phone.removeContact(successIds)
        return error.message
      } else {
        dispatch.phone.removeContact(input)
      }
    },
  }),
  selectors: (slice: Slicer<StoreData>) => ({
    contactList() {
      return slice((state) => getSortedContactList(state))
    },
    flatList() {
      return slice((state) => getFlatList(state))
    },
    speedDialChosenList() {
      return slice((state) => getSpeedDialChosenList(state))
    },
    getContact() {
      return slice((state) => {
        return (id: ContactID) => state.db[id]
      })
    },
    contactsToImport() {
      return slice(
        (state) => state.contactsToImport && getFlatList(state.contactsToImport)
      )
    },
    isContactCreated(models: StoreSelectors<Phone>) {
      return (state: Phone) => {
        const contacts: Contact[] = models.phone.flatList(state)
        return (phoneNumber: string) => {
          return contacts.some((contact) =>
            isContactMatchingPhoneNumber(contact, phoneNumber)
          )
        }
      }
    },
  }),
}
