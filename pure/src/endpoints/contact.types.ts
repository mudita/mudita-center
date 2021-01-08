export interface Contact {
  address: string
  altName: string
  blocked: boolean
  favourite: boolean
  id: number
  numbers: string[]
  priName: string
}

export type NewContact = Omit<Contact, "id">

export interface GetBodyContact {
  count: true | number
}

export interface CountBodyResponse {
  count: number
}
