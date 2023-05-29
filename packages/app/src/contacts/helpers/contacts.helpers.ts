/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { deburr, find } from "lodash"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { SimpleRecord } from "App/__deprecated__/common/typings"
import { isNameAvailable } from "App/__deprecated__/renderer/components/rest/messages/is-name-available"
import {
  BaseContactModel,
  Contact,
  ContactCategory,
  ContactFactorySignature,
  ContactID,
  ContactsState,
  PhoneContacts,
} from "App/contacts/reducers/contacts.interface"
import { mapToRawNumber } from "App/messages/helpers"

const lengthy = (input = "") => input.length > 0

const inputPropertyValidator = (input: unknown, key: string): boolean => {
  return (
    typeof input === "object" &&
    input !== null &&
    key in input &&
    lengthy(key as keyof typeof input)
  )
}

const prepareData = <T = unknown>(input: T | T[]): T[] =>
  Array.isArray(input) ? input : [input]

export const phoneNumberFormatter = (
  input: SimpleRecord<string>,
  haystack: string[] = ["primaryPhoneNumber", "secondaryPhoneNumber"]
): SimpleRecord<string> => {
  const needle = Object.keys(input)[0]
  if (haystack.indexOf(needle) > -1) {
    return {
      [needle]: mapToRawNumber(input[needle]),
    }
  }

  return input
}

export const contactTypeGuard = (input: unknown): input is Contact => {
  if (!inputPropertyValidator(input, "firstName")) {
    return false
  }
  if (!inputPropertyValidator(input, "lastName")) {
    return false
  }
  if (!inputPropertyValidator(input, "primaryPhoneNumberId")) {
    return false
  }
  if (!inputPropertyValidator(input, "secondaryPhoneNumberId")) {
    return false
  }

  if (!inputPropertyValidator(input, "email")) {
    return false
  }

  return true
}

export const contactFactory = (
  input: Record<string, keyof Contact>,
  guard: (input: unknown) => boolean = contactTypeGuard,
  numberFormatter: (
    input: SimpleRecord<string>
  ) => SimpleRecord<string> = phoneNumberFormatter
): Contact | null => {
  if (guard(input)) {
    return Object.keys(input).reduce((acc: SimpleRecord, key: string) => {
      const value = input[key]
      const item = value ? numberFormatter({ [key]: value }) : {}

      return {
        ...acc,
        ...item,
      }
    }, {}) as unknown as Contact
  }

  return null
}

export const contactDatabaseFactory = (
  input: Contact[],
  factory: ContactFactorySignature = contactFactory
): PhoneContacts => {
  const result = input.reduce(
    (acc: PhoneContacts, item: Contact) => {
      const contact = factory(item)

      if (contact) {
        const key = contact.id

        return {
          collection: [...new Set([...acc.collection, key])],
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
  return result
}

export const addContacts = (
  state: ContactsState,
  input: Contact | Contact[],
  factory: (input: Contact[]) => PhoneContacts = contactDatabaseFactory,
  preFormatter = prepareData
): ContactsState => {
  const result = factory(preFormatter(input))

  if (result) {
    const { collection, db } = result
    return {
      ...state,
      db: {
        ...state.db,
        ...db,
      },
      collection: [...new Set([...state.collection, ...collection])],
    }
  }

  return state
}

export const removeContact = (
  state: ContactsState,
  input: ContactID | ContactID[],
  preFormatter = prepareData
): PhoneContacts => {
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
  state: ContactsState,
  data: BaseContactModel,
  guard: (input: unknown) => boolean = contactTypeGuard
): PhoneContacts => {
  if (guard(data)) {
    return {
      ...state,
      db: {
        ...state.db,
        [data.id]: {
          ...state.db[data.id],
          ...data,
        },
      },
    }
  }

  return state
}

export const createFullName = ({
  firstName = "",
  lastName = "",
}: {
  firstName?: string
  lastName?: string
} = {}): string => {
  return `${firstName} ${lastName}`.trim()
}

export const createFullNameStartingFromLastName = ({
  firstName = "",
  lastName = "",
}: {
  firstName?: string
  lastName?: string
} = {}): string => {
  return `${lastName} ${firstName}`.trim()
}

export const getSortedContactList = ({
  collection,
  db,
}: PhoneContacts): ContactCategory[] => {
  const anonymousContacts = []
  const favouriteContacts = []
  const uncategorizedContacts = []
  const speedDialContacts = []
  const labeledContacts = []

  const contacts = collection
    .map((item) => db[item])
    .filter((contact) => {
      return contact.primaryPhoneNumber
    })

  const sortedContacts = contacts.sort((a, b) => {
    const sortTextA = a.lastName || a.firstName || ""
    const sortTextB = b.lastName || b.firstName || ""
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return sortTextA.localeCompare(sortTextB)
  })

  for (const contact of sortedContacts) {
    const { firstName, lastName, favourite, speedDial } = contact

    if (speedDial) {
      speedDialContacts.push(contact)
    }

    if (favourite) {
      favouriteContacts.push(contact)
    }

    if (isNameAvailable(contact)) {
      const groupLetter = deburr(
        lastName?.charAt(0) || firstName?.charAt(0)
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
        id: "module.contacts.listFavourites",
      }),
      contacts: favouriteContacts,
    })
  }

  if (anonymousContacts.length || uncategorizedContacts.length) {
    labeledContacts.push({
      category: "#",
      contacts: [...uncategorizedContacts, ...anonymousContacts],
    })
  }

  return labeledContacts
}

export const getFlatList = ({ collection, db }: PhoneContacts): Contact[] => {
  return collection.map((item) => db[item])
}

export const getSpeedDialChosenList = ({
  collection,
  db,
}: PhoneContacts): number[] => {
  return collection
    .map((item) => db[item].speedDial)
    .filter((speedDial): speedDial is number => speedDial !== undefined)
}

export const findContact = (
  phone: Contact[] | PhoneContacts,
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
