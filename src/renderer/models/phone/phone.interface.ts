export interface Contact {
  id: number
  firstName: string
  lastName: string
  phoneNumber: number
}

export interface ContactCategory {
  letter: string
  contacts: Contact[]
}

export interface InitialContactList {
  contacts: ContactCategory[]
}
