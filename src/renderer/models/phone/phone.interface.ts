export interface Contact {
  id: string
  firstName: string
  lastName: string
  primaryPhoneNumber: string
  secondaryPhoneNumber: string
  favourite: boolean
  blocked: boolean
  ice: boolean
  speedDial?: number
  note: string
  email: string
  firstAddressLine: string
  secondAddressLine: string
}

export interface ContactCategory {
  category: string
  contacts: Contact[]
}

export interface Contacts {
  contactList: ContactCategory[]
}
