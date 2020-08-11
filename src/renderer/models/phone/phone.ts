import { Slicer } from "@rematch/select"
import {
  filterContacts,
  generateSortedStructure,
} from "Renderer/models/phone/phone.utils"
import { Dispatch, RootState } from "Renderer/store"
import {
  Contact,
  ResultsState,
  StoreData,
} from "Renderer/models/phone/phone.interface"
import getContacts from "Renderer/requests/get-contacts.request"
import {
  BaseContactModel,
  ContactID,
  Phone,
} from "Renderer/models/phone/phone.typings"

import { addContacts, editContact } from "Renderer/models/phone/phone.helpers"

export const initialState: StoreData = {
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

    editContact(
      state: Phone,
      contactID: ContactID,
      data: BaseContactModel
    ): Phone {
      return editContact(state, contactID, data)
    },

    addContact(state: Phone, contact: Contact): Phone {
      return addContacts(state, contact)
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
