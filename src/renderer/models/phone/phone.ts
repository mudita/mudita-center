import { Slicer } from "@rematch/select"
import Faker from "faker"

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
        contactList: [],
      })
    }

    return fakeStructure
  }

  const placeContactInStructure = () => {
    const fakeStructure = generateFakeStructure()
    fakeStructure.forEach((fakeContact, index) => {
      const contactLetter = fakeContact.letter
      const contactList: string[] = fakeContact.contactList
      sortedContactList.forEach((sortedContact: any) => {
        if (sortedContact.firstName.charAt(0) === contactLetter) {
          contactList.push(sortedContact)
        }
      })
    })
    return fakeStructure
  }

  return placeContactInStructure()
}

// TODO: remove before production
const generateFakeState = (numberOfContacts: number) => {
  const fakeData = Array(numberOfContacts)
    .fill(0)
    .map(_ => ({
      id: Faker.random.uuid(),
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      phoneNumber: Faker.phone.phoneNumber(),
      favourite: Faker.random.boolean(),
    }))
  return fakeData
}

const initialStateValue = {
  contacts: generateFakeState(20),
  inputValue: "",
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
      return slice(state => generateSortedStructure(state.contacts))
    },
  }),
}
