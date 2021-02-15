/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  ContactWithEmail,
  ContactWithFirstName,
  ContactWithLastName,
  ContactWithPhoneNumber,
  PhoneContacts,
  StoreData,
  StoreEffects,
  StoreSelectors,
} from "App/contacts/store/contacts.interface"

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
