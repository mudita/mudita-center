/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  fulfilledAction,
  rejectedAction,
} from "Renderer/store/helpers"
import {
  AddNewContactToStateAction,
  ContactsState,
  DeleteContactsInStateAction,
  EditContactInStateAction,
  ResultState,
  SetContactsAction,
} from "App/contacts/reducers/contacts.interface"
import { ContactsEvent } from "App/contacts/constants"
import {
  addContacts,
  contactDatabaseFactory,
  editContact,
  removeContact,
} from "App/contacts/helpers/contacts.helpers"
import { DataSyncEvent, UpdateAllIndexesRejectAction } from "App/data-sync"
import { UpdateAllIndexesAction } from "App/data-sync/reducers/data-sync.interface"

export const initialState: ContactsState = {
  db: {},
  collection: [],
  resultState: ResultState.Loading,
  error: null,
}

export const contactsReducer = createReducer<ContactsState>(
  initialState,
  (builder) => {
    builder
      .addCase(
        fulfilledAction(DataSyncEvent.UpdateAllIndexes),
        (state, action: UpdateAllIndexesAction) => {
          const contacts = Object.keys(action.payload.contacts).map(
            (key) => action.payload.contacts[key]
          )

          return {
            ...state,
            ...contactDatabaseFactory(contacts),
            resultState: ResultState.Loaded,
            error: null,
          }
        }
      )
      .addCase(
        rejectedAction(DataSyncEvent.UpdateAllIndexes),
        (state, action: UpdateAllIndexesRejectAction) => {

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

      .addCase(
        ContactsEvent.DeleteContactsInState,
        (state, action: DeleteContactsInStateAction) => {
          return { ...state, ...removeContact(state, action.payload) }
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
