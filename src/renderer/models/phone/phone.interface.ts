export interface Contact {
  id: string
  firstName: string
  lastName: string
  phoneNumbers: string[]
  favourite: boolean
  blocked: boolean
}

export interface ContactCategory {
  category: string
  contacts: Contact[]
}

export interface Contacts {
  contactList: ContactCategory[]
}
