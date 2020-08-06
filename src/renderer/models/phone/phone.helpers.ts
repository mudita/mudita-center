import { Contact, Phone } from "Renderer/models/phone/phone.typings"

type SimpleRecord<T = string | number | boolean> = Record<string, T>
type ContactFactorySignature<T = Contact | null> = (...args: any[]) => T

const lengthy = (input: string) => input.length > 0

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

export const contactTypeGuard = (input: any): input is Contact => {
  const firstNameIsDeclared = "firstName" in input && lengthy(input.firstName)
  const lastNameIsDeclared = "lastName" in input && lengthy(input.lastName)
  const primaryPhoneNumberIsDeclared =
    "primaryPhoneNumber" in input && lengthy(input.primaryPhoneNumber)
  const emailIsDeclared = "email" in input && lengthy(input.email)

  return (
    firstNameIsDeclared ||
    lastNameIsDeclared ||
    primaryPhoneNumberIsDeclared ||
    emailIsDeclared
  )
}

export const contactFactory = (
  input: Record<string, any>,
  typeGuard: (input: any) => boolean = contactTypeGuard,
  numberFormatter: (
    input: SimpleRecord<string>
  ) => SimpleRecord<string> = phoneNumberFormatter
): Contact | null => {
  if (typeGuard(input)) {
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
