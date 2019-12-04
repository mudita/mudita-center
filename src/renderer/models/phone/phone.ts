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

const generateFakeState = (state: any) => {
  const fakeData = Array(50)
    .fill(0)
    .map(_ => ({
      id: Faker.random.uuid(),
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      phoneNumber: Faker.phone.phoneNumber(),
      favourite: Faker.random.boolean(),
    }))

  for (const [i] of state.entries()) {
    const letter = state[i].letter
    const contacts = state[i].contacts
    for (const item of fakeData) {
      if (item.firstName.charAt(0) === letter) {
        contacts.push(item)
      }
    }
  }
  return {
    contactList: state,
  }
}

export default {
  state: generateFakeState(generateLetters(initialContactList.contactList)),
}
