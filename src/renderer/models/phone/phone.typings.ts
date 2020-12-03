import { Provider } from "Renderer/models/external-providers/external-providers.interface"

export type ContactID = string

export interface BaseContactModel {
  id?: ContactID
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

interface ContactWithPhoneNumber extends ContactWithID {
  primaryPhoneNumber: string
}

interface ContactWithEmail extends ContactWithID {
  email: string
}

interface ContactWithFirstName extends ContactWithID {
  firstName: string
}

interface ContactWithLastName extends ContactWithID {
  lastName: string
}

export type Contact =
  | ContactWithPhoneNumber
  | ContactWithEmail
  | ContactWithFirstName
  | ContactWithLastName

export interface Phone {
  collection: ContactID[]
  db: Record<ContactID, Contact>
}

export interface ContactCategory {
  category: string
  contacts: Contact[]
}

export type ContactFactorySignature<T = Contact | null> = (...args: any[]) => T
export type NewContact = Omit<Contact, "id">

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

export type PhoneState = Phone & Pick<StoreData, "resultsState">

interface StoreSelectors extends Contacts {
  speedDialContacts: Contact[]
  savingContact: boolean
}

interface StoreEffects {
  readonly loadData: () => Promise<void>
  readonly editContact?: (id: ContactID, data: Contact) => void
  readonly deleteContacts?: (contacts: Contact[]) => void
  readonly loadContacts: (provider: Provider) => Promise<Phone>
}

export type Store = StoreEffects & StoreData & StoreSelectors
