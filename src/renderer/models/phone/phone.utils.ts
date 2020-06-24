import Faker from "faker"
import { intl } from "Renderer/utils/intl"
import { Contact, ContactCategory } from "Renderer/models/phone/phone.interface"
import { deburr } from "lodash"

// TODO: remove before production
export const speedDialNumbers = [2, 3, 4, 5, 6, 7, 8, 9]

const createPrimaryPhoneNumber = (force?: boolean) => {
  if (force) {
    return Faker.phone.phoneNumber("+## ### ### ###")
  }
  return Math.random() < 0.5 ? Faker.phone.phoneNumber("+## ### ### ###") : ""
}

export const generateFakeContact = (
  speedDials: number[] = [],
  options?: { forcePrimaryPhoneNumber?: boolean }
): Contact => {
  const favourite = Math.random() < 0.15
  const firstName =
    Math.random() < 0.6 || favourite ? Faker.name.firstName() : ""
  const lastName = Math.random() < 0.6 ? Faker.name.lastName() : ""
  const primaryPhoneNumber = createPrimaryPhoneNumber(
    options?.forcePrimaryPhoneNumber
  )
  const secondaryPhoneNumber =
    Math.random() < 0.5 ? Faker.phone.phoneNumber("+## ### ### ###") : ""
  const blocked =
    !favourite && (primaryPhoneNumber || secondaryPhoneNumber)
      ? Math.random() < 0.5
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
    email: Math.random() < 0.5 ? Faker.internet.email(firstName, lastName) : "",
    note: Faker.lorem.words(Math.random() * 4),
    ice: Math.random() < 0.2,
    favourite,
    blocked,
    speedDial,
    firstAddressLine: Math.random() < 0.5 ? Faker.address.streetAddress() : "",
    secondAddressLine: Math.random() < 0.5 ? Faker.address.city() : "",
  }
}

export const generateFakeData = (numberOfContacts: number) => {
  const speedDials = [...speedDialNumbers]

  return Array(numberOfContacts)
    .fill(0)
    .map(() => generateFakeContact(speedDials))
}

export const createFullName = ({
  firstName,
  lastName,
}: {
  firstName: string
  lastName: string
}) => {
  return `${firstName || ""} ${lastName || ""}`.trim()
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
          group => group.category === groupLetter
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
    return allowedFields.some(field => {
      return contact[field]
        ?.toString()
        .toLowerCase()
        .includes(substring.toLowerCase())
    })
  })
}
