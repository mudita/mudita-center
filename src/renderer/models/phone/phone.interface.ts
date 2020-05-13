export type ContactUid = string

export interface Contact {
  id?: ContactUid
  firstName: string
  lastName: string
  primaryPhoneNumber: string
  secondaryPhoneNumber: string
  blocked: boolean
  favourite: boolean
  ice: boolean
  speedDial?: number
  note: string
  email: string
  firstAddressLine: string
  secondAddressLine: string
}

export type NewContact = Omit<Contact, "id">

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
}

interface StoreEffects {
  readonly loadData?: () => void
  readonly addContact?: (contact: Contact) => void
}

export type Store = StoreEffects & StoreData
