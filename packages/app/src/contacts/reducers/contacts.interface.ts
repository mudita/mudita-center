/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"

export type ContactID = string
export type Contact =
  | ContactWithPhoneNumber
  | ContactWithEmail
  | ContactWithFirstName
  | ContactWithLastName
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContactFactorySignature<T = Contact | null> = (...args: any[]) => T
export type NewContact = Omit<Contact, "id">
export type ContactsState = PhoneContacts &
  Pick<StoreData, "resultState"> & {
    error: Error | string | null
    selectedItems: {
      rows: string[]
      allItemsSelected: boolean
    }
  }
export type Store = StoreData & StoreSelectors

export interface BaseContactModel {
  id: ContactID
  firstName?: string
  lastName?: string
  primaryPhoneNumber?: string
  secondaryPhoneNumber?: string
  favourite?: boolean
  blocked?: boolean
  ice?: boolean
  speedDial?: number
  note?: string
  email?: string
  firstAddressLine?: string
  secondAddressLine?: string
}

export interface ContactWithID extends BaseContactModel {
  id: ContactID
}

export interface ContactWithPhoneNumber extends ContactWithID {
  primaryPhoneNumber: string
}

export interface ContactWithEmail extends ContactWithID {
  email: string
}

export interface ContactWithFirstName extends ContactWithID {
  firstName: string
}

export interface ContactWithLastName extends ContactWithID {
  lastName: string
}

export interface PhoneContacts {
  collection: ContactID[]
  db: Record<ContactID, Contact>
}

export interface ContactCategory {
  category: string
  contacts: Contact[]
}

export interface ContactCategory {
  category: string
  contacts: Contact[]
}

export interface Contacts {
  contactList: ContactCategory[]
}

export enum ResultState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export interface StoreData {
  inputValue: string
  contacts: Contact[]
  resultState: ResultState
}

export interface StoreSelectors extends Contacts {
  speedDialContacts: Contact[]
}

export type SetContactsAction = PayloadAction<
  Contact[],
  ContactsEvent.SetContacts
>

export type AddNewContactToStateAction = PayloadAction<
  Contact[],
  ContactsEvent.AddNewContactsToState
>

export type EditContactInStateAction = PayloadAction<
  Contact,
  ContactsEvent.EditContactInState
>

export type DeleteContactsInStateAction = PayloadAction<
  ContactID[],
  ContactsEvent.DeleteContactsInState
>
