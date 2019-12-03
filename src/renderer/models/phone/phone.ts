import Faker from "faker"

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
      letter: "Bob",
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
