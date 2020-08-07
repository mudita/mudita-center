import {
  BaseContactModel,
  Contact,
  ContactFactorySignature,
  ContactID,
  Phone,
  SimpleRecord,
} from "Renderer/models/phone/phone.typings"

const lengthy = (input: string) => input.length > 0
const prepareData = <T = any>(input: T | T[]): T[] =>
  Array.isArray(input) ? input : [input]

export const phoneNumberFormatter = (
  input: SimpleRecord<string>,
  haystack: string[] = ["primaryPhoneNumber", "secondaryPhoneNumber"]
): SimpleRecord<string> => {
  const needle = Object.keys(input)[0]
  if (haystack.indexOf(needle) > -1) {
    return {
      [needle]: input[needle].replace(new RegExp(/\s/g), ""),
    }
  }

  return input
}

export const contactTypeGuard = (
  input: any,
  inputValidator: (str: string) => boolean = lengthy
): input is Contact => {
  const firstNameIsDeclared =
    "firstName" in input && inputValidator(input.firstName)
  const lastNameIsDeclared =
    "lastName" in input && inputValidator(input.lastName)
  const primaryPhoneNumberIsDeclared =
    "primaryPhoneNumber" in input && inputValidator(input.primaryPhoneNumber)
  const secondaryPhoneNumberIsDeclared =
    "primaryPhoneNumber" in input && inputValidator(input.secondaryPhoneNumber)
  const emailIsDeclared = "email" in input && inputValidator(input.email)

  return (
    firstNameIsDeclared ||
    lastNameIsDeclared ||
    primaryPhoneNumberIsDeclared ||
    secondaryPhoneNumberIsDeclared ||
    emailIsDeclared
  )
}

export const contactFactory = (
  input: Record<string, any>,
  guard: (input: any) => boolean = contactTypeGuard,
  numberFormatter: (
    input: SimpleRecord<string>
  ) => SimpleRecord<string> = phoneNumberFormatter
): Contact | null => {
  if (guard(input)) {
    return (Object.keys(input).reduce((acc: SimpleRecord, key: string) => {
      const value = input[key]
      const item = Boolean(value) ? numberFormatter({ [key]: value }) : {}

      return {
        ...acc,
        ...item,
      }
    }, {}) as unknown) as Contact
  }

  return null
}

export const contactDatabaseFactory = (
  input: Contact[],
  factory: ContactFactorySignature = contactFactory
): Phone => {
  return input.reduce(
    (acc: Phone, item: Contact) => {
      const contact = factory(item)

      if (contact) {
        const key = contact.id

        return {
          collection: [...acc.collection, key],
          db: {
            ...acc.db,
            [key]: contact,
          },
        }
      }
      return acc
    },
    {
      collection: [],
      db: {},
    }
  )
}

export const addContacts = (
  state: Phone,
  input: Contact | Contact[],
  factory: (input: Contact[]) => Phone = contactDatabaseFactory,
  preFormatter = prepareData
) => {
  const result = factory(preFormatter(input))

  if (result) {
    const { collection, db } = result
    return {
      ...state,
      db: {
        ...state.db,
        ...db,
      },
      collection: [...state.collection, ...collection],
    }
  }

  return state
}

export const removeContacts = (
  state: Phone,
  input: ContactID | ContactID[],
  preFormatter = prepareData
) => {
  const { collection: oldCollection, db: oldDb } = state
  const data = preFormatter(input)

  const collection = oldCollection.filter((item) => input.indexOf(item) === -1)
  const db = { ...oldDb }

  data.forEach((item) => {
    delete db[item]
  })

  return { db, collection }
}

export const editContact = (
  state: Phone,
  id: ContactID,
  data: BaseContactModel,
  guard: (input: any) => boolean = contactTypeGuard
): Phone => {
  if (guard(data)) {
    return {
      ...state,
      db: {
        ...state.db,
        [id]: {
          ...state.db[id],
          ...data,
        },
      },
    }
  }

  return state
}
