/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { History, LocationState } from "history"
import { AuthProviders } from "App/__deprecated__/renderer/models/auth/auth.typings"
import {
  ExternalProvider,
  Provider,
} from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import {
  Contact,
  ContactID,
  NewContact,
} from "App/contacts/reducers/contacts.interface"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { ResultState } from "App/contacts/reducers/contacts.interface"
import { ContactCategory } from "App/contacts/dto"

export interface ExternalService {
  type: Provider
}

export interface FileService {
  type: "files"
  data: File[]
}

export interface ContactsProps {
  selectedItems: string[]
  allRowsSelected: boolean
  allItemsSelected: boolean
  resetAllItems: () => void
  selectAllItems: () => void
  toggleItem: (id: string) => void
  onSpeedDialSettingsSave: (contacts?: Contact[]) => void
  getContact: (id: ContactID) => Contact
  flatList: Contact[]
  speedDialChosenList: number[]
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setProviderData: (provider: AuthProviders, data: any) => void
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onManageButtonClick: (cb?: any) => Promise<void>
  isThreadOpened: (phoneNumber: string) => boolean
  onMessage: (history: History<LocationState>, phoneNumber: string) => void
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authorize: (provider: ExternalProvider) => Promise<PayloadAction<Error | any>>
  addNewContact: (
    contact: NewContact
  ) => Promise<PayloadAction<Error | undefined>>
  importContact: (
    contact: NewContact
  ) => Promise<PayloadAction<Error | Contact>>
  editContact: (contact: Contact) => Promise<PayloadAction<Error | undefined>>
  deleteContacts: (
    ids: ContactID[]
  ) => Promise<PayloadAction<Error | undefined>>
  loadContacts: (provider: Provider) => Promise<Contact[]>
  addNewContactsToState: (contacts: Contact[]) => Promise<void>
  exportContacts: (contacts: Contact[]) => Promise<boolean>
  onCall: (phoneNumber: string) => void
  onEdit: (contacts: Contact) => void
  onForward: (contact: Contact) => void
  onBlock: (contact: Contact) => void
  onUnblock: (contact: Contact) => void
  onDelete: (id: string) => void
  resultState: ResultState
  contactList: ContactCategory[]
}

export interface NewContactResponse extends NewContact {
  successfullyAdded: boolean
}

export type FormError = { field: keyof Contact; error: string }

export interface ContactErrorResponse {
  status: RequestResponseStatus
  message: string
}
