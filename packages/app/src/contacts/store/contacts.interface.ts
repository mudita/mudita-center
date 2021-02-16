/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Contact, ContactID } from "App/contacts/store/contacts.type"
import { ResultsState } from "App/contacts/store/contacts.enum"

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
