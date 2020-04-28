import Faker from "faker"
import { intl } from "Renderer/utils/intl"
import { Contact, ContactCategory } from "Renderer/models/phone/phone.interface"

// TODO: remove before production
const speedDials = Array.from({ length: 8 }).map((_, index) => index + 2)

export const generateFakeData = (numberOfContacts: number) => {
  return Array(numberOfContacts)
    .fill(0)
    .map(_ => {
      const favourite = Math.random() < 0.15
      const firstName = Math.random() < 0.6 ? Faker.name.firstName() : ""
      const lastName = Math.random() < 0.6 ? Faker.name.lastName() : ""
      const primaryPhoneNumber =
        Math.random() < 0.5 ? Faker.phone.phoneNumber("+## ### ### ###") : ""
      const secondaryPhoneNumber =
        Math.random() < 0.5 ? Faker.phone.phoneNumber("+## ### ### ###") : ""
      const blocked =
        !favourite && (primaryPhoneNumber || secondaryPhoneNumber)
          ? Math.random() < 0.5
          : false
      const speedDial =
        !favourite && (primaryPhoneNumber || secondaryPhoneNumber)
          ? speedDials.shift()
          : undefined

      return {
        id: Faker.random.uuid(),
        firstName,
        lastName,
        primaryPhoneNumber,
        secondaryPhoneNumber,
        email:
          Math.random() < 0.5 ? Faker.internet.email(firstName, lastName) : "",
        note: Faker.lorem.words(Math.random() * 4),
        ice: Math.random() < 0.2,
        favourite,
        blocked,
        speedDial,
        firstAddressLine:
          Math.random() < 0.5 ? Faker.address.streetAddress() : "",
        secondAddressLine: Math.random() < 0.5 ? Faker.address.city() : "",
      } as Contact
    })
}

export const getFullName = ({ firstName, lastName }: Contact) => {
  return `${firstName} ${lastName}`.trim()
}

export const generateSortedStructure = (contacts: Contact[]) => {
  const unnamedContacts = []
  const favouriteContacts = []
  const labeledContacts: ContactCategory[] = []

  const sortedContacts = contacts.sort((a, b) => {
    return getFullName(a).localeCompare(getFullName(b))
  })

  for (const contact of sortedContacts) {
    const { firstName, lastName, favourite } = contact
    if (firstName || lastName) {
      const groupLetter = firstName?.charAt(0) || lastName?.charAt(0)
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

      if (favourite) {
        favouriteContacts.push(contact)
      }
    } else {
      unnamedContacts.push(contact)
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

  if (unnamedContacts.length) {
    labeledContacts.push({
      category: "#",
      contacts: unnamedContacts,
    })
  }

  return labeledContacts
}

export const filterContacts = (contacts: any, substring: string) => {
  const allowedFields = ["firstName", "lastName", "phoneNumber"]
  if (!substring) {
    return contacts
  }
  return contacts.map((contactsByLetter: any) => ({
    ...contactsByLetter,
    contacts: contactsByLetter.contacts.filter((contact: any) => {
      return Object.keys(contact)
        .filter(key => {
          return allowedFields.includes(key)
        })
        .map(key => contact[key])
        .some((value: any) =>
          value.toLowerCase().includes(substring.toLowerCase())
        )
    }),
  }))
}
