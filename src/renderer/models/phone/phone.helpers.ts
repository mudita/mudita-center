import {
  BaseContactModel,
  Contact,
  ContactFactorySignature,
  ContactID,
  Phone,
} from "Renderer/models/phone/phone.typings"
import { deburr, find, filter, omit } from "lodash"
import { intl } from "Renderer/utils/intl"
import { SimpleRecord } from "Common/typings"

const lengthy = (input = "") => input.length > 0
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
    "secondaryPhoneNumber" in input &&
    inputValidator(input.secondaryPhoneNumber)
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
      const item = value ? numberFormatter({ [key]: value }) : {}

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

export const removeContact = (
  state: Phone,
  input: ContactID | ContactID[],
  preFormatter = prepareData
) => {
  const inputArray = Array.isArray(input) ? input : [input]
  const { collection: oldCollection, db: oldDb } = state
  const data = preFormatter(input)

  const collection = oldCollection.filter(
    (item) => inputArray.indexOf(item) === -1
  )
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

export const createFullName = ({
  firstName,
  lastName,
}: {
  firstName?: string
  lastName?: string
}): string => {
  return `${firstName || ""} ${lastName || ""}`.trim()
}

export const getSortedContactList = ({ collection, db }: Phone) => {
  const anonymousContacts = []
  const favouriteContacts = []
  const uncategorizedContacts = []
  const speedDialContacts = []
  const labeledContacts = []

  const contacts = collection.map((item) => db[item])

  const sortedContacts = contacts.sort((a, b) => {
    return createFullName(a).localeCompare(createFullName(b))
  })

  for (const contact of sortedContacts) {
    const { firstName, lastName, favourite, speedDial } = contact

    if (speedDial) {
      speedDialContacts.push(contact)
    }

    if (favourite) {
      favouriteContacts.push(contact)
    }

    if (firstName || lastName) {
      const groupLetter = deburr(
        firstName?.charAt(0) || lastName?.charAt(0)
      ).toUpperCase()

      if (/[A-Z]/.test(groupLetter)) {
        const groupIndex = labeledContacts.findIndex(
          (group) => group.category === groupLetter
        )

        if (groupIndex === -1) {
          labeledContacts.push({
            category: groupLetter,
            contacts: [contact],
          })
        } else {
          labeledContacts[groupIndex].contacts.push(contact)
        }
      } else {
        uncategorizedContacts.push(contact)
      }
    } else {
      anonymousContacts.push(contact)
    }
  }

  if (favouriteContacts.length) {
    labeledContacts.unshift({
      category: intl.formatMessage({
        id: "view.name.phone.contacts.list.favourites",
      }),
      contacts: favouriteContacts,
    })
  }

  if (anonymousContacts.length) {
    labeledContacts.push({
      category: "#",
      contacts: [...uncategorizedContacts, ...anonymousContacts],
    })
  }

  return labeledContacts
}

export const getFlatList = ({ collection, db }: Phone): Contact[] => {
  return collection.map((item) => db[item])
}

export const getSpeedDialChosenList = ({ collection, db }: Phone): number[] => {
  return collection
    .map((item) => db[item].speedDial)
    .filter((speedDial): speedDial is number => speedDial !== undefined)
}

export const findContact = (
  phone: Contact[] | Phone,
  query: SimpleRecord,
  idOnly = false,
  formatter = getFlatList
): ContactID | Contact | undefined => {
  const db = Array.isArray(phone) ? phone : formatter(phone)
  const result = find(db, query) as Contact

  if (result) {
    return idOnly ? result.id : result
  }

  return undefined
}

export const findMultipleContacts = (
  db: Contact[],
  query: SimpleRecord | ((input: string | number | SimpleRecord) => boolean)
): ContactID[] | undefined => {
  const result = filter(db, query)

  if (result.length > 0) {
    return result.map(({ id }: any) => id)
  }

  return undefined
}

export const revokeField = (
  state: Phone,
  query: SimpleRecord,
  finder = findContact
): Phone => {
  const userId = finder(state, query, true)

  if (userId && typeof userId === "string") {
    const queryKey = Object.keys(query)[0]
    const userData = omit(state.db[userId], queryKey)

    return {
      ...state,
      db: {
        ...state.db,
        [userId]: userData,
      },
    } as Phone
  }

  return state
}
