import Faker from "faker"

// TODO: remove before production
export const generateFakeData = (numberOfContacts: number) => {
  return Array(numberOfContacts)
    .fill(0)
    .map(_ => ({
      id: Faker.random.uuid(),
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      phoneNumber: Faker.phone.phoneNumber(),
      favourite: Faker.random.boolean(),
    }))
}

export const generateSortedStructure = (fakeState: any) => {
  const alphabet = new Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(65 + i))

  const sortedContactList = fakeState.sort((a: any, b: any) =>
    a.firstName.localeCompare(b.firstName)
  )

  const generateFakeStructure = () => {
    const fakeStructure = []

    for (const letter of alphabet) {
      fakeStructure.push({
        category: letter,
        contacts: [],
      })
    }

    fakeStructure.unshift({
      category: "Favourite",
      contacts: [],
    })

    return fakeStructure
  }

  const placeContactsInStructure = () => {
    const fakeStructure: any = generateFakeStructure()
    fakeStructure.forEach((fakeContact: any) => {
      const contactLetter = fakeContact.category
      const contactList: string[] = fakeContact.contacts
      sortedContactList.forEach((sortedContact: any) => {
        if (
          sortedContact.firstName.charAt(0) === contactLetter &&
          !sortedContact.favourite
        ) {
          contactList.push(sortedContact)
        }
      })
    })

    sortedContactList.forEach((contacts: any) => {
      if (contacts.favourite) {
        fakeStructure[0].contacts.push(contacts)
      }
    })

    return fakeStructure
  }

  return placeContactsInStructure()
}

export const removeEmptyContacts = (structure: any) => {
  return structure.filter((el: any) => el.contacts.length > 0)
}

export const filterContacts = (contacts: any, substring: string) => {
  const allowedFields = ["firstName", "lastName", "phoneNumber"]
  if (!substring) {
    return contacts
  }
  return contacts.map((contactsByLetter: any) => ({
    ...contactsByLetter,
    contacts: contactsByLetter.contacts.filter((contact: any) => {
      const filterableFields = Object.keys(contact)
        .filter(key => {
          return allowedFields.includes(key)
        })
        .reduce((res: any, key: string) => {
          return (res[key] = contact[key]), res
        }, {})
      return Object.values(filterableFields).some((value: any) =>
        value.toLowerCase().includes(substring.toLowerCase())
      )
    }),
  }))
}
