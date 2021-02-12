import Faker from "faker"

export const makeNewNote = (
  id: string = Faker.random.uuid(),
  content = ""
) => ({
  id,
  content,
  date: new Date(Date.now()),
})
