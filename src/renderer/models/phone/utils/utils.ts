import Faker from "faker"
import { intl } from "Renderer/utils/intl"
import { Contact, ContactCategory } from "Renderer/models/phone/phone.interface"

// TODO: remove before production
const speedDials = Array.from({ length: 10 }).map((_, index) => index)

export const generateFakeData = (numberOfContacts: number) => {
  return Array(numberOfContacts)
    .fill(0)
    .map(_ => {
      const favourite = Math.random() < 0.15
      return {
        id: Faker.random.uuid(),
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        phoneNumbers: Array.from({
          length: Math.random() < 0.3 ? 0 : Math.ceil(Math.random() * 2),
        }).map(() => Faker.phone.phoneNumber("+## ### ### ###")),
        email: Faker.internet.email(),
        notes: Faker.lorem.paragraph(1),
        ice: Math.random() < 0.2,
        favourite,
        blocked: !favourite ? Math.random() < 0.15 : false,
        speedDial: favourite ? speedDials.shift() : undefined,
        address: Faker.address.streetAddress(),
      }
    })
}

export const generateSortedStructure = (contacts: Contact[]) => {
  const sorted = contacts.sort((a, b) => a.firstName.localeCompare(b.firstName))
  const grouped: ContactCategory[] = [
    {
      category: intl.formatMessage({
        id: "view.name.phone.contacts.list.favourites",
      }),
      contacts: [],
    },
  ]
  for (const contact of sorted) {
    if (contact.favourite) {
      grouped[0].contacts.push(contact)
    }
    const firstLetter = contact.firstName.charAt(0)
    const groupIndex = grouped.findIndex(
      group => group.category === firstLetter
    )
    if (groupIndex === -1) {
      grouped.push({
        category: firstLetter,
        contacts: [contact],
      })
    } else {
      grouped[groupIndex].contacts.push(contact)
    }
  }

  return grouped
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
