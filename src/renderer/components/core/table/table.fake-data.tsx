import Faker from "faker"
import { groupBy } from "lodash"

export const rowsMessages = Array.from({
  length: Math.round(15 + Math.random() * 25),
}).map(() => {
  return {
    id: Faker.random.uuid(),
    caller: {
      id: Faker.random.uuid(),
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      phoneNumber: Faker.phone.phoneNumber(),
    },
    unread: Faker.random.boolean(),
    messages: [
      {
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  }
})

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
