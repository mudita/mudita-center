import Faker from "faker"
import { Caller } from "Renderer/models/calls/calls.interface"

const createCaller = (): Caller => ({
  id: Faker.random.uuid(),
  firstName: Faker.name.firstName(),
  lastName: Faker.name.lastName(),
  phoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
})

const caller = createCaller()
const unknownCaller: Caller = {
  id: "11",
  firstName: "",
  lastName: "",
  phoneNumber: "+123 456 123",
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
        date: new Date("2019-10-18T11:27:15.256Z"),
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
  {
    id: "1233",
    caller: unknownCaller,
    unread: false,
    messages: [
      {
        author: unknownCaller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: new Date("2019-10-18T11:27:15.256Z"),
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        author: unknownCaller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
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
        date: new Date("2019-10-18T11:27:15.256Z"),
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
]

export const mockedDetails = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  caller,
  messages: [
    {
      author: caller,
      id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
      date: new Date("2019-10-18T11:27:15.256Z"),
      content:
        "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      interlocutor: true,
    },
    {
      author: caller,
      id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
      date: new Date("2019-10-18T11:45:35.112Z"),
      content:
        "Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis.",

      interlocutor: true,
    },
  ],
}

export const unknownCallerMockedDetails = {
  id: "1231",
  caller: unknownCaller,
  messages: [
    {
      author: unknownCaller,
      id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
      date: new Date("2019-10-18T11:27:15.256Z"),
      content:
        "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      interlocutor: true,
    },
    {
      author: unknownCaller,
      id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
      date: new Date("2019-10-18T11:45:35.112Z"),
      content:
        "Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
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
        date: new Date("2019-10-18T11:27:15.256Z"),
        content: "Idziemy na grzyby?",
      },
      {
        author: createCaller(),
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
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
        date: new Date("2019-10-18T11:27:15.256Z"),
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
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
        date: new Date("2019-10-18T11:27:15.256Z"),
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
]
