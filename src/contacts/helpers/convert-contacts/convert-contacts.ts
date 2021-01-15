import vCard from "vcf"
import { Contact } from "App/contacts/store/contacts.type"
import { createFullName } from "App/contacts/store/contacts.helpers"

const convertContact = (contact: Contact): string => {
  const {
    id,
    firstName,
    lastName,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    firstAddressLine,
    secondAddressLine,
    email,
    note,
  } = contact
  const card = new vCard()

  card.add("n", `${lastName || ""};${firstName || ""};;;`)
  card.add("fn", createFullName(contact))

  if (primaryPhoneNumber || secondaryPhoneNumber) {
    card.add("tel", `tel:${primaryPhoneNumber || secondaryPhoneNumber}`, {
      type: ["voice"],
      value: "uri",
    })
  }

  if (primaryPhoneNumber && secondaryPhoneNumber) {
    card.add("tel", `tel:${secondaryPhoneNumber}`, {
      type: ["voice"],
      value: "uri",
    })
  }

  if (firstAddressLine || secondAddressLine) {
    const [street, city, state, code, ...country] = (
      firstAddressLine +
      "," +
      secondAddressLine
    ).split(",")

    card.add(
      "adr",
      [
        "",
        "",
        street || "",
        city || "",
        state || "",
        code || "",
        country.join(" "),
      ].join(";"),
      {
        type: "home",
        label: `"${firstAddressLine} ${secondAddressLine}"`.trim(),
      }
    )
  }

  if (email) {
    card.add("email", email)
  }

  if (note) {
    card.add("note", note)
  }

  card.add("uid", id)

  return card.toString("4.0")
}

const convertContacts = (contacts: Contact[]): string => {
  const jCards: string[] = []

  contacts.forEach((contact) => {
    jCards.push(convertContact(contact))
  })

  return jCards.join("\n")
}

export default convertContacts
