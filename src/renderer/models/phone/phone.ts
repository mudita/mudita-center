import { Slicer } from "@rematch/select"
import {
  filterContacts,
  generateSortedStructure,
} from "Renderer/models/phone/phone.utils"
import { Dispatch, RootState } from "Renderer/store"
import {
  Contact,
  NewContact,
  StoreData,
} from "Renderer/models/phone/phone.interface"
import getContacts from "Renderer/requests/get-contacts.request"
import addContact from "Renderer/requests/add-contact.request"
import { defaultContact } from "Renderer/components/rest/phone/contact-edit.component"
import deleteContacts from "Renderer/requests/delete-contacts.request"
import editContact from "Renderer/requests/edit-contact.request"

const initialState: StoreData = {
  inputValue: "",
  contacts: [],
}

export default {
  state: initialState,
  reducers: {
    handleInput(state: StoreData, inputValue: string) {
      return {
        ...state,
        inputValue,
      }
    },
    updateContacts(state: StoreData, contacts: Contact[]) {
      return {
        ...state,
        contacts,
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async loadData() {
      dispatch.phone.updateContacts(await getContacts())
    },
    async addContact(contact: NewContact, state: RootState) {
      const newContact: Contact = await addContact(contact)
      if (newContact) {
        const updatedContacts = [
          ...state.phone.contacts,
          { ...defaultContact, ...newContact },
        ]
        dispatch.phone.updateContacts(updatedContacts)
      }
    },
    async editContact(contact: Contact, state: RootState) {
      const editedContact: Contact = await editContact(contact)
      if (editedContact) {
        const editedContactIndex = state.phone.contacts.findIndex(
          ({ id }) => id === editedContact.id
        )
        if (editedContactIndex >= 0) {
          const updatedContacts = [...state.phone.contacts]
          updatedContacts[editedContactIndex] = editedContact
          dispatch.phone.updateContacts(updatedContacts)
        }
      }
    },
    async deleteContacts(contacts: Contact[], state: RootState) {
      const deletedContactsIds = await deleteContacts(
        contacts.map(contact => contact.id)
      )
      if (deletedContactsIds) {
        const updatedContacts = state.phone.contacts.filter(
          ({ id }) => !deletedContactsIds.includes(id)
        )
        dispatch.phone.updateContacts(updatedContacts)
      }
    },
  }),
  selectors: (slice: Slicer<StoreData>) => ({
    grouped() {
      return slice(state => {
        return generateSortedStructure(
          filterContacts(state.contacts, state.inputValue)
        )
      })
    },
    speedDialContacts() {
      return slice(state => {
        return state.contacts.filter((contact: Contact) => contact.speedDial)
      })
    },
  }),
}
