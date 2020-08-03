import Faker from "faker"

export const createNewNote = (
  id: string = Faker.random.uuid(),
  content: string = ""
) => ({
  id,
  content,
  date: new Date(Date.now()),
})
