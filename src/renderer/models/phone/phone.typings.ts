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
  contacts: ContactID[]
}

export type SimpleRecord<T = string | number | boolean> = Record<string, T>
export type ContactFactorySignature<T = Contact | null> = (...args: any[]) => T
