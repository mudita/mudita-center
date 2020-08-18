export type ContactUid = string

export interface Contact {
  id: ContactUid
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
