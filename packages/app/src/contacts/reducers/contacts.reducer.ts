/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// TODO: CP-1494, CP-1495

import { createReducer } from "@reduxjs/toolkit"
import {
  fulfilledAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"
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
import { DataSyncEvent } from "App/data-sync/constants"
import {
  ReadAllIndexesAction,
  ReadAllIndexesRejectAction,
} from "App/data-sync/reducers/data-sync.interface"
import { selectAllItems, resetAllItems, toggleItem } from "App/contacts/actions"
import { changeLocation } from "App/core/actions"

export const initialState: ContactsState = {
  db: {},
  collection: [],
  resultState: ResultState.Loading,
  error: null,
  selectedItems: {
    rows: [],
    allItemsSelected: false,
  },
}

export const contactsReducer = createReducer<ContactsState>(
  initialState,
  (builder) => {
    builder
      .addCase(
        fulfilledAction(DataSyncEvent.ReadAllIndexes),
        (state, action: ReadAllIndexesAction) => {
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
        rejectedAction(DataSyncEvent.ReadAllIndexes),
        (state, action: ReadAllIndexesRejectAction) => {
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
        ContactsEvent.AddNewContactsToState,
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

      .addCase(selectAllItems.fulfilled, (state, action) => {
        return {
          ...state,
          selectedItems: {
            ...state.selectedItems,
            rows: action.payload,
            allItemsSelected: true,
          },
        }
      })
      .addCase(toggleItem.fulfilled, (state, action) => {
        return {
          ...state,
          selectedItems: {
            ...state.selectedItems,
            rows: action.payload,
            allItemsSelected: action.payload.length === state.collection.length,
          },
        }
      })
      .addCase(resetAllItems, (state) => {
        return {
          ...state,
          selectedItems: {
            ...state.selectedItems,
            rows: [],
            allItemsSelected: false,
          },
        }
      })
      .addCase(changeLocation, (state) => {
        return {
          ...state,
          selectedItems: {
            rows: [],
            allItemsSelected: false,
          },
        }
      })
  }
)
