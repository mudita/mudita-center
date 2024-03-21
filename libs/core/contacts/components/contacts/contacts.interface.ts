/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OpenDialogOptions } from "electron"
import { PayloadAction } from "@reduxjs/toolkit"
import { History, LocationState } from "history"
import { AuthProviders } from "Core/__deprecated__/renderer/models/auth/auth.typings"
import {
  ExternalProvider,
  Provider,
} from "Core/__deprecated__/renderer/models/external-providers/external-providers.interface"
import {
  Contact,
  ContactCategory,
  ContactID,
  NewContact,
  ResultState,
} from "Core/contacts/reducers/contacts.interface"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import { ExportContactsResult } from "Core/contacts/constants"
import { ImportContactArg } from "Core/contacts/actions"
import { ResultObject } from "Core/core/builder"

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
  contacts: Contact[]
  speedDialChosenList: number[]
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setProviderData: (provider: AuthProviders, data: any) => void
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onManageButtonClick: (cb?: any) => Promise<void>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authorize: (provider: ExternalProvider) => Promise<PayloadAction<Error | any>>
  addNewContact: (
    contact: NewContact
  ) => Promise<PayloadAction<ContactErrorResponse | undefined>>
  importContact: (
    arg: ImportContactArg
  ) => Promise<PayloadAction<Error | Contact>>
  editContact: (
    contact: Contact
  ) => Promise<PayloadAction<ContactErrorResponse | undefined>>
  deleteContacts: (
    ids: ContactID[]
  ) => Promise<PayloadAction<Error | undefined>>
  loadContacts: (provider: Provider) => Promise<Contact[]>
  addNewContactsToState: (contacts: Contact[]) => Promise<void>
  exportContacts: (contacts: Contact[]) => Promise<ExportContactsResult>
  onEdit: (contacts: Contact) => void
  onDelete: (id: string) => void
  resultState: ResultState
  contactList: ContactCategory[]
  closeImportWindow: (provider: ExternalProvider) => Promise<void>
  getPaths: (
    options: OpenDialogOptions
  ) => Promise<PayloadAction<ResultObject<string[] | undefined>>>
}

export interface NewContactResponse extends NewContact {
  successfullyAdded: boolean
}

export type FormError = { field: keyof Contact; error: string }

export interface ContactErrorResponse {
  status: RequestResponseStatus
  message: string
  payload?: {
    primaryPhoneNumberIsDuplicated?: boolean
    secondaryPhoneNumberIsDuplicated?: boolean
  }
}
