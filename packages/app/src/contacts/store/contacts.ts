/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Slicer, StoreSelectors } from "@rematch/select"
import { RootState } from "Renderer/store"
import {
  Contact,
  ContactID,
  ContactsState,
} from "App/contacts/store/contacts.type"
import {
  addContacts,
  contactDatabaseFactory,
  editContact,
  getFlatList,
  getSortedContactList,
  getSpeedDialChosenList,
  removeContact,
  revokeField,
} from "App/contacts/store/contacts.helpers"
import { isContactMatchingPhoneNumber } from "App/contacts/helpers/is-contact-matching-phone-number/is-contact-matching-phone-number"
import getContacts from "Renderer/requests/get-contacts.request"
import logger from "App/main/utils/logger"
import externalProvidersStore from "Renderer/store/external-providers"
import {
  ExternalProvider,
  Provider,
} from "Renderer/models/external-providers/external-providers.interface"
import { Scope } from "Renderer/models/external-providers/google/google.interface"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"
import { ResultsState } from "App/contacts/store/contacts.enum"
import {
  BaseContactModel,
  PhoneContacts,
  StoreData,
} from "App/contacts/store/contacts.interface"
import { OutLookScope } from "Renderer/models/external-providers/outlook/outlook.interface"

export const initialState: ContactsState = {
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

const contacts = createModel<RootModel>({
  state: initialState,
  reducers: {
    setResultsState(
      state: ContactsState,
      resultsState: ResultsState
    ): ContactsState {
      return { ...state, resultsState }
    },
    setContacts(state: ContactsState, contacts: PhoneContacts): ContactsState {
      return { ...state, ...contacts }
    },
    addContact(state: ContactsState, contact: Contact): ContactsState {
      let currentState = state

      /**
       * This is an example situation when two entities share the same (unique)
       * data, so one has to release it.
       */
      if (contact.speedDial) {
        currentState = revokeField(state, { speedDial: contact.speedDial })
      }

      return { ...state, ...addContacts(currentState, contact) }
    },
    editContact(state: ContactsState, data: BaseContactModel): ContactsState {
      let currentState = state

      if (data.speedDial) {
        currentState = revokeField(state, { speedDial: data.speedDial })
      }

      return { ...state, ...editContact(currentState, data) }
    },
    removeContact(
      state: ContactsState,
      input: ContactID | ContactID[]
    ): ContactsState {
      return { ...state, ...removeContact(state, input) }
    },
    updateContacts(state: ContactsState, contacts: PhoneContacts) {
      return {
        ...state,
        db: { ...state.db, ...contacts.db },
        collection: [...state.collection, ...contacts.collection],
      }
    },
    _devClearAllContacts(state: ContactsState) {
      return {
        ...state,
        db: {},
        collection: [],
        resultsState: ResultsState.Empty,
      }
    },
  },
  /**
   * All these side effects are just for show, since we don't know anything
   * about phone sync flow at the moment.
   */
  effects: (d) => {
    const dispatch = (d as unknown) as RootState

    return {
      async loadData(
        _: any,
        rootState: { contacts: { resultsState: ResultsState } }
      ) {
        if (rootState.contacts.resultsState === ResultsState.Loading) {
          return
        }

        dispatch.contacts.setResultsState(ResultsState.Loading)

        const { data = [], error } = await getContacts()
        if (error) {
          logger.error(error)
          dispatch.contacts.setResultsState(ResultsState.Error)
        } else {
          dispatch.contacts.setContacts(contactDatabaseFactory(data))
          dispatch.contacts.setResultsState(ResultsState.Loaded)
        }
      },
      authorize(provider: ExternalProvider) {
        switch (provider) {
          case Provider.Google:
            return externalProvidersStore.dispatch.google.authorize(
              Scope.Contacts
            )
          // TODO: update when adding new providers
          case Provider.Apple:
            return undefined
          case Provider.Outlook:
            return externalProvidersStore.dispatch.outlook.authorize(
              OutLookScope.Contacts
            )
        }
      },
    }
  },
  selectors: (slice: Slicer<StoreData>) => ({
    resultsState() {
      return slice(({ resultsState }) => resultsState)
    },
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
    getContactMap() {
      return slice((state) => state.db)
    },
    //FIXME: uses old model of data when phone number was required
    isContactCreatedDeprecated(models: StoreSelectors<PhoneContacts>) {
      return (state: PhoneContacts) => {
        const contacts: Contact[] = models.contacts.flatList(state)
        return (phoneNumber: string) => {
          return contacts.some((contact) =>
            isContactMatchingPhoneNumber(contact, phoneNumber)
          )
        }
      }
    },
    isContactCreated(models: StoreSelectors<PhoneContacts>) {
      return (state: PhoneContacts) => {
        const contacts: Contact[] = models.contacts.flatList(state)
        return (id: string) => {
          return contacts.some((contact) => contact.id === id)
        }
      }
    },
  }),
})

export default contacts
