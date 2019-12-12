export interface Contact {
  id: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
}

export interface ContactCategory {
  category: string
  contacts: Contact[]
}

export interface InitialContactList {
  contactList: ContactCategory[]
}
