export interface Contact {
  id: number
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
  grouped: ContactCategory[]
}
