import {
  BaseContactModel,
  Contact,
  ContactID,
  Phone,
} from "Renderer/models/phone/phone.typings"
import {
  addContacts,
  editContact,
  removeContacts,
} from "Renderer/models/phone/phone.helpers"

export const initialModelState: Phone = {
  collection: [],
  db: {},
}

export const model = {
  state: initialModelState,
  reducers: {
    addContact(state: Phone, contact: Contact): Phone {
      return addContacts(state, contact)
    },

    addContactsInBatch(state: Phone, contacts: Contact[]): Phone {
      return addContacts(state, contacts)
    },

    deleteContact(state: Phone, contactID: ContactID): Phone {
      return removeContacts(state, contactID)
    },

    deleteContactsInBatch(state: Phone, contactsIDs: ContactID[]): Phone {
      return removeContacts(state, contactsIDs)
    },

    editContact(
      state: Phone,
      contactID: ContactID,
      data: BaseContactModel
    ): Phone {
      return editContact(state, contactID, data)
    },
  },
  selectors: {},
}
