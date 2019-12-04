import { Slicer } from "@rematch/select"
import Faker from "faker"

const initialContactList = {
  contactList: [],
}

const generateLetters = (contactList: any) => {
  const alphabet = new Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(65 + i))

  for (const letter of alphabet) {
    contactList.push({
      letter,
      contacts: [],
    })
  }
  return contactList
}
// TODO: remove before production
const generateFakeState = (state: any) => {
  const fakeData = Array(10)
    .fill(0)
    .map(_ => ({
      id: Faker.random.uuid(),
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      phoneNumber: Faker.phone.phoneNumber(),
      favourite: Faker.random.boolean(),
    }))

  for (const [i] of state.entries()) {
    const contacts = state[i].contacts
    for (const item of fakeData) {
      contacts.push(item)
    }
  }
  return {
    contactList: state,
  }
}

const initialStateValue = {
  contacts: generateFakeState(generateLetters(initialContactList.contactList)),
  inputValue: "",
}

export default {
  state: initialStateValue,
  selectors: (slice: Slicer<typeof initialStateValue>) => ({
    grouped() {
      return slice(state => state.contacts)
    },
  }),
}
