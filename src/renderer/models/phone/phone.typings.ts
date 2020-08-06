export type ContactID = string

export type SpeedDial = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

interface BaseContactModel {
  id: ContactID
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

interface ContactWithPhoneNumber extends BaseContactModel {
  primaryPhoneNumber: string
}

interface ContactWithEmail extends BaseContactModel {
  email: string
}

interface ContactWithFirstName extends BaseContactModel {
  firstName: string
}

interface ContactWithLastName extends BaseContactModel {
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
