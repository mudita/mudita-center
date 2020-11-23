import { Slicer, StoreSelectors } from "@rematch/select"
import { Dispatch } from "Renderer/store"
import { Contact } from "Renderer/models/phone/phone.typings"
import {
  BaseContactModel,
  ContactID,
  Phone,
  StoreData,
} from "Renderer/models/phone/phone.typings"

import {
  addContacts,
  editContact,
  removeContact,
  revokeField,
  getSortedContactList,
  getSpeedDialChosenList,
  getFlatList,
  contactDatabaseFactory,
} from "Renderer/models/phone/phone.helpers"
import { isContactMatchingPhoneNumber } from "Renderer/models/phone/is-contact-matching-phone-number"
import getContacts from "Renderer/requests/get-contacts.request"
import deleteContact from "Renderer/requests/delete-contact.request"

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

    editContact(
      state: Phone,
      contactID: ContactID,
      data: BaseContactModel
    ): Phone {
      let currentState = state

      if (data.speedDial) {
        currentState = revokeField(state, { speedDial: data.speedDial })
      }

      return editContact(currentState, contactID, data)
    },

    removeContact(state: Phone, input: ContactID | ContactID[]): Phone {
      return removeContact(state, input)
    },
  },
  /**
   * All these side effects are just for show, since we don't know anything
   * about phone sync flow at the moment.
   */
  effects: (dispatch: Dispatch) => ({
    loadData: async (): Promise<string | void> => {
      const { data = [], error } = await getContacts()
      if (error) return error.message
      else {
        dispatch.phone.setContacts(data)
      }
    },
    async addContact() {
      await simulateWriteToPhone()
    },

    async editContact() {
      await simulateWriteToPhone()
    },

    async deleteContacts(input: ContactID) {
      const { data = "" } = await deleteContact(input)
      dispatch.phone.removeContact(data)
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
