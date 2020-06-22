import Faker from "faker"

const createCaller = () => ({
  id: Faker.random.uuid(),
  firstName: Faker.name.firstName(),
  lastName: Faker.name.lastName(),
  primaryPhoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
  secondaryPhoneNumber: "",
  inContacts: true,
})

const caller = createCaller()
const unknownContact = {
  id: "11",
  firstName: "",
  lastName: "",
  primaryPhoneNumber: "+123 456 123",
  secondaryPhoneNumber: "",
  inContacts: false,
}

export const mockedList = [
  {
    id: "1231",
    caller,
    unread: true,
    messages: [
      {
        author: caller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content: [
          {
            id: "1",
            text:
              "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
          },
        ],
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content: [
          {
            id: "2",
            text:
              "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
          },
        ],
      },
    ],
  },
  {
    id: "1233",
    caller: unknownContact,
    unread: false,
    messages: [
      {
        author: unknownContact,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content: [
          {
            id: "123",
            text:
              "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
          },
        ],
      },
      {
        author: unknownContact,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content: [
          {
            id: "321",
            text:
              "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
          },
        ],
      },
    ],
  },
  {
    id: "1234",
    caller,
    unread: false,
    messages: [
      {
        author: caller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content: [
          {
            id: "3212",
            text:
              "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
          },
        ],
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content: [
          {
            id: "321233",
            text:
              "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
          },
        ],
      },
    ],
  },
]

export const mockedDetails = {
  caller,
  messages: [
    {
      author: caller,
      id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
      date: "2019-10-18T11:27:15.256Z",
      content: [
        {
          id: "32123",
          text:
            "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
        },
      ],
      interlocutor: true,
    },
    {
      author: caller,
      id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
      date: "2019-10-18T11:45:35.112Z",
      content: [
        {
          id: "32123",
          text:
            "Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
        },
      ],
      interlocutor: true,
    },
  ],
}

export const unknownCallerMockedDetails = {
  caller: unknownContact,
  messages: [
    {
      author: unknownContact,
      id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
      date: "2019-10-18T11:27:15.256Z",
      content: [
        {
          id: "32123",
          text:
            "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
        },
      ],
      interlocutor: true,
    },
    {
      author: unknownContact,
      id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
      date: "2019-10-18T11:45:35.112Z",
      content: [
        {
          id: "3212333",
          text:
            "Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
        },
      ],
      interlocutor: true,
    },
  ],
}

const randomCaller = createCaller()

export const randomMockedList = [
  {
    id: "1231",
    caller: randomCaller,
    unread: true,
    messages: [
      {
        author: randomCaller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content: [{ id: "123", text: "Idziemy na grzyby?" }],
      },
      {
        author: createCaller(),
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content: [
          {
            id: "321",
            text:
              "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
          },
        ],
      },
    ],
  },
  {
    id: "1233",
    caller,
    unread: false,
    messages: [
      {
        author: caller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content: [
          {
            id: "321",
            text:
              "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
          },
        ],
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content: [
          {
            id: "322221",
            text:
              "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
          },
        ],
      },
    ],
  },
  {
    id: "1234",
    caller,
    unread: false,
    messages: [
      {
        author: caller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content: [
          {
            id: "55321",
            text:
              "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
          },
        ],
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content: [
          {
            id: "32223321",
            text:
              "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
          },
        ],
      },
    ],
  },
]
