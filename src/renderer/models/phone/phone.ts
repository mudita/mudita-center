import { Slicer } from "@rematch/select"
import Faker from "faker"

// TODO: remove before production
const generateFakeData = (numberOfContacts: number) => {
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

const generateSortedStructure = (fakeState: any) => {
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
        letter,
        contacts: [],
      })
    }

    return fakeStructure
  }

  const placeContactsInStructure = () => {
    const fakeStructure = generateFakeStructure()
    fakeStructure.forEach((fakeContact, index) => {
      const contactLetter = fakeContact.letter
      const contactList: string[] = fakeContact.contacts
      sortedContactList.forEach((sortedContact: any) => {
        if (sortedContact.firstName.charAt(0) === contactLetter) {
          contactList.push(sortedContact)
        }
      })
    })
    return fakeStructure
  }

  return placeContactsInStructure()
}

const sanitizeContacts = (structure: any) => {
  return structure.filter((el: any) => el.contacts.length > 0)
}

const initialStateValue = {
  contacts: generateFakeData(20),
  inputValue: "",
}

const filterContacts = (contacts: any, substring: string) => {
  return contacts.map((contactsByLetter: any) => ({
    ...contactsByLetter,
    contacts: contactsByLetter.contacts.filter((contact: any) => {
      const filterableFields = Object.values(contact).filter(value => {
        return typeof value === "string"
      })
      return filterableFields.some((value: any) =>
        value.toLowerCase().includes(substring.toLowerCase())
      )
    }),
  }))
}

export default {
  state: initialStateValue,
  reducers: {
    handleInput(state: any, payload: string) {
      return Object.assign({}, state, {
        inputValue: payload,
      })
    },
  },
  selectors: (slice: Slicer<typeof initialStateValue>) => ({
    grouped() {
      return slice(state => {
        const sorted = sanitizeContacts(generateSortedStructure(state.contacts))
        if (state.inputValue === "") {
          return sorted
        }
        return sanitizeContacts(filterContacts(sorted, state.inputValue))
      })
    },
  }),
}
