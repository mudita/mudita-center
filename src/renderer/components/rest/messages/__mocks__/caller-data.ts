import Faker from "faker"

const caller = {
  id: Faker.random.uuid(),
  firstName: Faker.name.firstName(),
  lastName: Faker.name.lastName(),
  phoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
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
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
        ],
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content: [
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
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
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
        ],
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content: [
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
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
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
        ],
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content: [
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
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
        "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      ],
      interlocutor: true,
    },
    {
      author: caller,
      id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
      date: "2019-10-18T11:45:35.112Z",
      content: [
        "Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      ],
      interlocutor: true,
    },
  ],
}
