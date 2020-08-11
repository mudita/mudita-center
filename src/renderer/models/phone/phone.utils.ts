import Faker from "faker"
import { intl } from "Renderer/utils/intl"
import { Contact, ContactCategory } from "Renderer/models/phone/phone.typings"
import { deburr } from "lodash"
import { createFullName } from "Renderer/models/phone/phone.helpers"

// TODO: remove before production
export const speedDialNumbers = [2, 3, 4, 5, 6, 7, 8, 9]

const generatePhoneNumberOrEmptyString = (force?: boolean) => {
  if (force) {
    return Faker.phone.phoneNumber("+## ### ### ###")
  }
  return Faker.random.boolean()
    ? Faker.phone.phoneNumber("+## ### ### ###")
    : ""
}

export const generateFakeContact = (
  speedDials: number[] = [],
  options?: { forcePrimaryPhoneNumber?: boolean }
): Contact => {
  const favourite = Math.random() < 0.15
  const firstName =
    Faker.random.boolean() || favourite ? Faker.name.firstName() : ""
  const lastName = Faker.random.boolean() ? Faker.name.lastName() : ""
  const primaryPhoneNumber = generatePhoneNumberOrEmptyString(
    options?.forcePrimaryPhoneNumber
  )
  const secondaryPhoneNumber = generatePhoneNumberOrEmptyString()
  const blocked =
    !favourite && (primaryPhoneNumber || secondaryPhoneNumber)
      ? Faker.random.boolean()
      : false
  const speedDial =
    !blocked &&
    (firstName || lastName) &&
    (primaryPhoneNumber || secondaryPhoneNumber)
      ? speedDials.shift()
      : undefined

  return {
    id: Faker.random.uuid(),
    firstName,
    lastName,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    email: Faker.random.boolean()
      ? Faker.internet.email(firstName, lastName)
      : "",
    note: Faker.lorem.words(Math.random() * 4),
    ice: Faker.random.boolean(),
    favourite,
    blocked,
    speedDial,
    firstAddressLine: Faker.random.boolean()
      ? Faker.address.streetAddress()
      : "",
    secondAddressLine: Faker.random.boolean() ? Faker.address.city() : "",
  }
}

export const generateFakeData = (numberOfContacts: number) => {
  const speedDials = [...speedDialNumbers]

  return Array(numberOfContacts)
    .fill(0)
    .map(() => generateFakeContact(speedDials))
}

export const generateSortedStructure = (contacts: Contact[]) => {
  const anonymousContacts = []
  const favouriteContacts = []
  const uncategorizedContacts = []
  const labeledContacts: ContactCategory[] = []

  const sortedContacts = contacts.sort((a, b) => {
    return createFullName(a).localeCompare(createFullName(b))
  })

  for (const contact of sortedContacts) {
    const { firstName, lastName, favourite } = contact

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

export const filterContacts = (contacts: Contact[], substring: string) => {
  const allowedFields: (keyof Partial<Contact>)[] = [
    "firstName",
    "lastName",
    "primaryPhoneNumber",
    "secondaryPhoneNumber",
  ]
  if (!substring) {
    return contacts
  }
  return contacts.filter((contact: Contact) => {
    return allowedFields.some((field) => {
      return contact[field]
        ?.toString()
        .toLowerCase()
        .includes(substring.toLowerCase())
    })
  })
}
