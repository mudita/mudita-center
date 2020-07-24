import Faker from "faker"
import { random, times } from "lodash"

const createNote = () => ({
  id: Faker.random.uuid(),
  content: Faker.lorem.paragraph(Faker.random.number({ min: 2, max: 10 })),
  date: Faker.random.boolean() ? Faker.date.past() : Faker.date.recent(),
})

export const notesList = times(random(3, 5), createNote)
