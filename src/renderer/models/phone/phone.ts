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

const generateNames = (state: any) => {
  const fakeNames = Array(50)
    .fill(0)
    .map(_ => Faker.name.firstName())

  for (const [i] of state.entries()) {
    const letter = state[i].letter
    const contacts = state[i].contacts
    for (const name of fakeNames) {
      if (name.charAt(0) === letter) {
        contacts.push({
          firstName: name.charAt(0),
        })
      }
    }
  }
  return state
}

console.log(generateNames(generateLetters(initialContactList.contactList)))

const initialState = {
  contactList: [
    {
      letter: "A",
      contacts: [
        {
          firstName: "Adam",
          lastName: "Smiths",
          phoneNumber: Faker.phone.phoneNumber(),
          id: 1,
          favourite: true,
        },
      ],
    },
    {
      letter: "B",
      contacts: [
        {
          name: "Bob",
          lastName: "Smiths",
          phoneNumber: Faker.phone.phoneNumber(),
          id: 1,
          favourite: false,
        },
      ],
    },
  ],
}

export default {
  state: initialState,
}
