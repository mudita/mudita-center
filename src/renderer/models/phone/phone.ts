import { Slicer } from "@rematch/select"
import {
  filterContacts,
  generateSortedStructure,
} from "Renderer/models/phone/phone.utils"
import { Contact, StoreData } from "Renderer/models/phone/phone.interface"
import {
  BaseContactModel,
  ContactID,
  Phone,
} from "Renderer/models/phone/phone.typings"

import {
  addContacts,
  editContact,
  revokeField,
} from "Renderer/models/phone/phone.helpers"

export const initialState: Phone = {
  db: {},
  collection: [],
}

export default {
  state: initialState,
  reducers: {
    addContact(state: Phone, contact: Contact): Phone {
      return addContacts(state, contact)
    },

    editContact(
      state: Phone,
      contactID: ContactID,
      data: BaseContactModel
    ): Phone {
      let currentState = state

      /**
       * This is an example situation when two entities share the same (unique)
       * data, so one has to release it.
       */
      if ("speedDial" in data) {
        currentState = revokeField(state, { speedDial: data.speedDial! })
      }

      return editContact(currentState, contactID, data)
    },
  },
  selectors: (slice: Slicer<StoreData>) => ({
    grouped() {
      return slice((state) => {
        return generateSortedStructure(
          filterContacts(state.contacts, state.inputValue)
        )
      })
    },
    speedDialContacts() {
      return slice((state) => {
        return state.contacts.filter((contact: Contact) => contact.speedDial)
      })
    },
  }),
}
