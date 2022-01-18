/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { fulfilledAction, pendingAction, rejectedAction } from "Renderer/store"
import {
  AddNewContactToStateAction,
  ContactsState,
  EditContactInStateAction,
  LoadContactsRejectAction,
  ResultState,
  SetContactsAction,
} from "App/contacts/reducers/contacts.interface"
import { ContactsEvent } from "App/contacts/constants"
import {
  addContacts,
  contactDatabaseFactory,
  editContact,
} from "App/contacts/helpers/contacts.helpers"

export const initialState: ContactsState = {
  db: {},
  collection: [],
  resultState: ResultState.Empty,
  error: null,
}

export const contactsReducer = createReducer<ContactsState>(
  initialState,
  (builder) => {
    builder
      .addCase(pendingAction(ContactsEvent.LoadContacts), (state) => {
        return {
          ...state,
          resultState: ResultState.Loading,
        }
      })
      .addCase(fulfilledAction(ContactsEvent.LoadContacts), (state) => {
        return {
          ...state,
          resultState: ResultState.Loaded,
          error: null,
        }
      })
      .addCase(
        rejectedAction(ContactsEvent.LoadContacts),
        (state, action: LoadContactsRejectAction) => {
          return {
            ...state,
            resultState: ResultState.Error,
            error: action.payload,
          }
        }
      )

      .addCase(
        ContactsEvent.SetContacts,
        (state, action: SetContactsAction) => {
          return {
            ...state,
            ...contactDatabaseFactory(action.payload),
          }
        }
      )

      .addCase(
        ContactsEvent.AddNewContactToState,
        (state, action: AddNewContactToStateAction) => {
          return { ...state, ...addContacts(state, action.payload) }
        }
      )

      .addCase(
        ContactsEvent.EditContactInState,
        (state, action: EditContactInStateAction) => {
          return { ...state, ...editContact(state, action.payload) }
        }
      )

      .addCase(ContactsEvent.DevClearAllContacts, (state) => {
        return {
          ...state,
          db: {},
          collection: [],
          resultState: ResultState.Empty,
        }
      })
  }
)
