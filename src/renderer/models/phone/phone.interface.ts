export interface Contact {
  id: string
  firstName: string
  lastName: string
  phoneNumbers: string[]
  favourite: boolean
  blocked: boolean
  ice: boolean
  speedDial?: number
  note: string
  email: string
  address: string
}

export interface ContactCategory {
  category: string
  contacts: Contact[]
}

export interface Contacts {
  contactList: ContactCategory[]
}
