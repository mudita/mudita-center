import { Caller } from "Renderer/models/calls/calls.interface"
import Faker from "faker"

export const createFakeCaller = (): Caller => ({
  id: Faker.random.uuid(),
  firstName: Faker.name.firstName(),
  lastName: Faker.name.lastName(),
  phoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
  secondaryPhoneNumber: Faker.phone.phoneNumber("+## ### ### ###"),
})
