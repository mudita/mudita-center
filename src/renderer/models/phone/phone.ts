import { Slicer, StoreSelectors } from "@rematch/select"
import { Dispatch } from "Renderer/store"
import {
  BaseContactModel,
  Contact,
  NewContact,
  ContactID,
  Phone,
  StoreData,
  ResultsState,
  PhoneState,
} from "Renderer/models/phone/phone.typings"

import {
  addContacts,
  contactDatabaseFactory,
  editContact,
  getFlatList,
  getSortedContactList,
  getSpeedDialChosenList,
  removeContact,
  revokeField,
} from "Renderer/models/phone/phone.helpers"
import { isContactMatchingPhoneNumber } from "Renderer/models/phone/is-contact-matching-phone-number"
import externalProvidersStore from "Renderer/store/external-providers"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import getContacts from "Renderer/requests/get-contacts.request"
import addContact from "Renderer/requests/add-contact.request"

export const initialState: PhoneState = {
  db: {},
  collection: [],
  resultsState: ResultsState.Empty,
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
    setContacts(state: PhoneState, contacts: Contact[]): PhoneState {
      return {...state, ...contactDatabaseFactory(contacts)}
    },
    addContact(state: PhoneState, contact: Contact): PhoneState {
      let currentState = state

      /**
       * This is an example situation when two entities share the same (unique)
       * data, so one has to release it.
       */
      if (contact.speedDial) {
        currentState = revokeField(state, { speedDial: contact.speedDial })
      }

      return {...state, ...addContacts(currentState, contact)}
    },
    editContact(
      state: PhoneState,
      contactID: ContactID,
      data: BaseContactModel
    ): PhoneState {
      let currentState = state

      if (data.speedDial) {
        currentState = revokeField(state, { speedDial: data.speedDial })
      }

      return {...state, ...editContact(currentState, contactID, data)}
    },
    removeContact(state: PhoneState, input: ContactID | ContactID[]): PhoneState {
      return {...state, ...removeContact(state, input)}
    },
    updateContacts(state: PhoneState, contacts: Phone) {
      return {
        ...state,
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
      const { data = [], error } = await getContacts()
      if (error) {
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
          dispatch.phone.updateContacts(contactDatabaseFactory(contacts))
      }
    },
    addNewContact: async (contact: NewContact): Promise<string | void> => {
      const { data, error } = await addContact(contact)
      if (error || !data) return error?.message ?? "Something went wrong"
      else {
        dispatch.phone.addContact(data)
      }
    },
    async editContact() {
      await simulateWriteToPhone()
    },

    async removeContact() {
      await simulateWriteToPhone()
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
