import Faker from "faker"

export const createNewNote = (
  id: string = Faker.random.uuid(),
  content = ""
) => ({
  id,
  content,
  date: new Date(Date.now()),
})
