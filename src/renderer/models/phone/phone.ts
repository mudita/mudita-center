import { Slicer } from "@rematch/select"
import {
  filterContacts,
  generateSortedStructure,
} from "Renderer/models/phone/phone.utils"
import { Dispatch, RootState } from "Renderer/store"
import {
  Contact,
  NewContact,
  ResultsState,
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
  savingContact: false,
  resultsState: ResultsState.Loading,
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
    updateSavingStatus(state: StoreData, savingContact: boolean) {
      return {
        ...state,
        savingContact,
      }
    },
    setResultsState(state: StoreData, resultsState: ResultsState) {
      return {
        ...state,
        resultsState,
      }
    },
  },
  effects: (dispatch: Dispatch): any => ({
    async loadData(payload: any, { phone: { contacts } }: RootState) {
      // TODO: Add 'downloaded' flag in case phonebook will be empty and there will
      //  be no way to add a contact from phone when it's connected to the app.
      if (contacts.length === 0) {
        const phonebookContacts = await getContacts()
        if (phonebookContacts.length) {
          dispatch.phone.updateContacts(phonebookContacts)
          dispatch.phone.setResultsState(ResultsState.Loaded)
        } else {
          dispatch.phone.setResultsState(ResultsState.Empty)
        }
      }
    },
    async addContact(contact: NewContact, state: RootState) {
      const newContact: Contact = await addContact(contact)
      const updatedContacts = [
        ...state.phone.contacts,
        { ...defaultContact, ...newContact },
      ]
      dispatch.phone.updateContacts(updatedContacts)
    },
    async editContact(contact: Contact, state: RootState) {
      dispatch.phone.updateSavingStatus(true)
      const editedContact: Contact = await editContact(contact)
      const editedContactIndex = state.phone.contacts.findIndex(
        ({ id }) => id === editedContact.id
      )
      if (editedContactIndex >= 0) {
        const updatedContacts = [...state.phone.contacts]
        updatedContacts[editedContactIndex] = editedContact
        await dispatch.phone.updateContacts(updatedContacts)
        dispatch.phone.updateSavingStatus(false)
      }
    },
    async deleteContacts(contacts: Contact[], state: RootState) {
      const deletedContactsIds = await deleteContacts(
        contacts.map((contact) => contact.id)
      )
      const updatedContacts = state.phone.contacts.filter(
        ({ id }) => !deletedContactsIds.includes(id)
      )
      dispatch.phone.updateContacts(updatedContacts)
    },
  }),
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
