import Faker from "faker"

export const exampleData = Array.from(
  Array(Faker.random.number({ min: 10, max: 20 }))
).map(_ => ({
  id: Faker.random.uuid(),
  content: Faker.lorem.paragraph(Faker.random.number({ min: 2, max: 10 })),
  date: Faker.random.boolean() ? Faker.date.past() : Faker.date.recent(),
}))
