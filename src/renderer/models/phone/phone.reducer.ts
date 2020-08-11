import {
  BaseContactModel,
  Contact,
  ContactID,
  Phone,
} from "Renderer/models/phone/phone.typings"
import {
  addContacts,
  editContact,
  generateSortedStructure,
  removeContacts,
} from "Renderer/models/phone/phone.helpers"

export const initialState: Phone = {
  collection: [],
  db: {},
}

export const phoneModel = {
  state: initialState,
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
  selectors: () => ({
    /**
     * For any kind of array-based operation (mostly legacy)
     */
    getFlatList() {
      return ({ phone }: any) => {
        const { collection, db } = phone

        // @ts-ignore
        return collection.map((item: string) => db[item])
      }
    },

    getContactDetails() {
      // @ts-ignore
      return ({ phone }: any, id: ContactID) => {
        const { db } = phone

        return db[id]
      }
    },

    /**
     * Assuming that contact "0" will always be the owner
     */
    getPhoneOwner() {
      return ({ phone }: any) => {
        const { db } = phone

        return db["0"]
      }
    },

    getGrouped() {
      return ({ phone }: any) => {
        return generateSortedStructure(phone)
      }
    },

    getGroupedAsList() {
      return ({ phone }: any) => {
        // @ts-ignore
        const data: Record<string, any> = this.getGrouped({ phone })

        return Object.keys(data).map((key: string) => {
          return [key, data[key]]
        })
      }
    },
  }),
}

export default phoneModel
