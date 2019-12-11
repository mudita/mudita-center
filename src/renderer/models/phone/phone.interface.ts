export interface Contact {
  id: number
  firstName: string
  lastName: string
  phoneNumber: number
}

export interface ContactCategory {
  category: string
  contacts: Contact[]
}

export interface InitialContactList {
  contactList: ContactCategory[]
  grouped?: any
  handleInput: (event: string) => string
}
