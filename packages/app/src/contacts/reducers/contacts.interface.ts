/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type ContactID = string
export type Contact =
  | ContactWithPhoneNumber
  | ContactWithEmail
  | ContactWithFirstName
  | ContactWithLastName
export type ContactFactorySignature<T = Contact | null> = (...args: any[]) => T
export type NewContact = Omit<Contact, "id">
export type ContactsState = PhoneContacts & Pick<StoreData, "resultsState">
export type Store = StoreEffects & StoreData & StoreSelectors

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

export enum ResultsState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export interface StoreData {
  inputValue: string
  contacts: Contact[]
  savingContact: boolean
  resultsState: ResultsState
}

export interface StoreSelectors extends Contacts {
  speedDialContacts: Contact[]
  savingContact: boolean
}

export interface StoreEffects {
  readonly loadData: () => Promise<void>
}
