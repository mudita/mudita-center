/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// TODO: CP-1494, CP-1495

import { createReducer } from "@reduxjs/toolkit"
import {
  fulfilledAction,
  rejectedAction,
} from "Core/__deprecated__/renderer/store/helpers"
import {
  AddNewContactToStateAction,
  ContactsState,
  DeleteContactsInStateAction,
  EditContactInStateAction,
  ResultState,
  SetContactsAction,
} from "Core/contacts/reducers/contacts.interface"
import { ContactsEvent } from "Core/contacts/constants"
import {
  addContacts,
  contactDatabaseFactory,
  editContact,
  removeContact,
} from "Core/contacts/helpers/contacts.helpers"
import { DataSyncEvent } from "Core/data-sync/constants"
import {
  ReadAllIndexesAction,
  ReadAllIndexesRejectAction,
} from "Core/data-sync/reducers/data-sync.interface"
import {
  selectAllItems,
  resetAllItems,
  toggleItem,
  deleteContacts,
  setInitialContactsState,
} from "Core/contacts/actions"
import { changeLocation } from "Core/core/actions"

export const initialState: ContactsState = {
  db: {},
  collection: [],
  resultState: ResultState.Loading,
  error: null,
  selectedItems: {
    rows: [],
    allItemsSelected: false,
  },
  deletedCount: 0,
}

export const contactsReducer = createReducer<ContactsState>(
  initialState,
  (builder) => {
    builder
      .addCase(setInitialContactsState, (state) => {
        return { ...initialState }
      })
      .addCase(
        fulfilledAction(DataSyncEvent.ReadAllIndexes),
        (state, action: ReadAllIndexesAction) => {
          const contacts = Object.keys(action.payload.contacts).map(
            (key) => action.payload.contacts[key]
          )
          const contactsDb = contactDatabaseFactory(contacts)
          const rows = state.selectedItems.rows.filter((row) =>
            contactsDb.collection.includes(row)
          )
          const selectedItems = {
            rows,
            allItemsSelected: contactsDb.collection.every((row) =>
              rows.includes(row)
            ),
          }
          return {
            ...state,
            ...contactsDb,
            selectedItems,
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
          return {
            ...state,
            ...removeContact(state, action.payload),
            deletedCount: action.payload.length,
          }
        }
      )
      .addCase(deleteContacts.fulfilled, (state) => {
        return { ...state, deletedCount: 0 }
      })

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
