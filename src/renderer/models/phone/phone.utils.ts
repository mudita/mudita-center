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
      const firstName = Faker.name.firstName()
      const lastName = Faker.name.lastName()

      return {
        id: Faker.random.uuid(),
        firstName,
        lastName,
        primaryPhoneNumber:
          Math.random() < 0.5 ? Faker.phone.phoneNumber("+## ### ### ###") : "",
        secondaryPhoneNumber:
          Math.random() < 0.5 ? Faker.phone.phoneNumber("+## ### ### ###") : "",
        email:
          Math.random() < 0.5 ? Faker.internet.email(firstName, lastName) : "",
        note: Faker.lorem.words(Math.random() * 4),
        ice: Math.random() < 0.2,
        favourite,
        blocked: !favourite ? Math.random() < 0.15 : false,
        speedDial: favourite ? speedDials.shift() : undefined,
        firstAddressLine:
          Math.random() < 0.5 ? Faker.address.streetAddress() : "",
        secondAddressLine: Math.random() < 0.5 ? Faker.address.city() : "",
      } as Contact
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
