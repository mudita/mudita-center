import Faker from "faker"
import { groupBy, times, random } from "lodash"

const createCall = () => ({
  id: Faker.random.uuid(),
  caller: {
    firstName: Math.random() < 0.6 ? Faker.name.firstName() : "",
    lastName: Math.random() < 0.6 ? Faker.name.lastName() : "",
    phoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
  },
  date: Math.random() < 0.6 ? Faker.date.past() : Faker.date.recent(),
})

export const calls = times(random(5, 15), createCall)

const createText = () => ({
  id: Faker.random.uuid(),
  text: Faker.lorem.paragraphs(random(1, 3)),
})

export const notes = times(random(15, 25), createText)

const createCaller = (inContacts: boolean) => {
  return inContacts
    ? {
        id: Faker.random.uuid(),
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        phoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
        inContacts,
      }
    : {
        id: Faker.random.uuid(),
        firstName: "",
        lastName: "",
        phoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
        inContacts,
      }
}
const createMessage = () => ({
  id: Faker.random.uuid(),
  text: Faker.lorem.sentence(10, 2),
})
const createListOfMessages = () => times(random(1, 3), createMessage)
const createTopic = () => {
  const inContacts = Faker.random.boolean()
  const caller = createCaller(inContacts)
  return {
    id: Faker.random.uuid(),
    caller,
    unread: Faker.random.boolean(),
    messages: [
      {
        author: caller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd572",
        date: "2019-10-18T11:27:15.256Z",
        content: createListOfMessages(),
        interlocutor: true,
      },
      {
        author: caller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content: createListOfMessages(),
        interlocutor: true,
      },
      {
        author: {
          firstName: "John",
          lastName: "Doe",
          inContacts: true,
        },
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content: createListOfMessages(),
        interlocutor: false,
      },
    ],
  }
}

export const rowsMessages = times(random(5, 15), createTopic)

export const basicRows = Array.from({
  length: Math.round(15 + Math.random() * 25),
}).map(() => {
  const firstName = Faker.name.firstName()
  return {
    firstName,
    lastName: Faker.name.lastName(),
    phoneNumber: Faker.phone.phoneNumber(),
    address: {
      zip: Faker.address.zipCode(),
      city: Faker.address.city(),
      country: Faker.address.country(),
    },
  }
})

export const nestedRows = [
  {
    fileType: "Messages",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    fileType: "Contacts",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    fileType: "Files",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
    _children: [
      {
        fileType: "Music files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
      },
      {
        fileType: "Recorded files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
      },
      {
        fileType: "Storage files",
        lastBackup: Faker.date.past(),
        size: `${Faker.random.number(64)}.${Faker.random.number(
          9
        )}${Faker.random.number(9)} MB`,
      },
    ],
  },
  {
    fileType: "Notes",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
  {
    fileType: "Meditation timer data",
    lastBackup: Faker.date.past(),
    size: `${Faker.random.number(64)}.${Faker.random.number(
      9
    )}${Faker.random.number(9)} MB`,
  },
]

export const sortedBasicRows = [...basicRows].sort((a, b) => {
  return a.firstName > b.firstName ? 1 : -1
})

export const labeledRows = groupBy(sortedBasicRows, row =>
  row.firstName.charAt(0)
)
