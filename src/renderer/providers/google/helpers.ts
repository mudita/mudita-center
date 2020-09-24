import { GooglePerson } from "Renderer/providers/google/typings"
import { Contact } from "Renderer/models/phone/phone.typings"
import { contactFactory as helperFactory } from "Renderer/models/phone/phone.helpers"

export const queryBuilder = (input: string[]): string => input.join(",")

export const contactFactory = (input: GooglePerson): Contact | null => {
  const base: Record<string, string> = {
    id: input.resourceName,
    note: "",
  }

  if (input.names?.length > 0) {
    base.firstName = input.names[0].givenName || ""
    base.lastName = input.names[0].familyName || ""
  } else {
    throw new Error("Unable to save model, missing name")
  }

  if (input.emailAddresses?.length > 0) {
    base.email = input.emailAddresses[0].value
  }

  if (input.phoneNumbers?.length > 0) {
    input.phoneNumbers.forEach((item, i) => {
      if (i === 0) {
        base.primaryPhoneNumber = item.value
      }

      if (i === 1) {
        base.secondaryPhoneNumber = item.value
      }

      if (i > 1) {
        base.note += `${item.value}\n`
      }
    })
  }

  return helperFactory(base)
}
