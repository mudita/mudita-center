import Faker from "faker"
import { random, times } from "lodash"

const createHelpQuestionAndAnswer = () => ({
  id: Faker.random.uuid(),
  question: Faker.lorem.sentences(1),
  answer: Faker.lorem.paragraph(Faker.random.number({ min: 2, max: 10 })),
})

export const helpQuestionsAndAnswers = times(
  random(5, 10),
  createHelpQuestionAndAnswer
)
