import vCard from "vcf"
import { NewContact } from "App/contacts/store/contacts.typings"

interface vCardContact {
  [key: string]: vCard.Property | vCard.Property[]
}

export const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => resolve(event.target?.result as string)
    reader.onerror = (event) => reject(event.target?.error)
    reader.readAsText(file)
  })
}

const parseContact = (contact: vCardContact): NewContact => {
  const [
    lastName = "",
    firstName = "",
  ] = (contact.n?.valueOf() as string).split(";")
  const fullName = contact.fv?.valueOf() as string

  let primaryPhoneNumber = ""
  let secondaryPhoneNumber = ""
  let firstAddressLine = ""
  let secondAddressLine = ""
  let note = ""

  if (contact.tel) {
    if (Array.isArray(contact.tel)) {
      primaryPhoneNumber = contact.tel[0].valueOf() as string
      secondaryPhoneNumber = contact.tel[1].valueOf() as string
    } else {
      primaryPhoneNumber = contact.tel.valueOf() as string
    }
  }

  if (contact.adr) {
    let address: string

    if (Array.isArray(contact.adr)) {
      address = contact.adr[0].valueOf() as string
    } else {
      address = contact.adr.valueOf() as string
    }

    address.split(";").forEach((chunk) => {
      const trimmedChunk = chunk.trim()
      const { length } = trimmedChunk

      if (length) {
        if (firstAddressLine.length + length <= 30) {
          firstAddressLine += `${trimmedChunk}, `
        } else if (secondAddressLine.length + length <= 30) {
          secondAddressLine += `${trimmedChunk}, `
        }
      }
    })

    firstAddressLine = firstAddressLine.trim().slice(0, -1)
    secondAddressLine = secondAddressLine.trim().slice(0, -1)
  }

  if (contact.note) {
    note = (contact.note.valueOf() as string).substr(0, 30)
  }

  return {
    firstName: !firstName && !lastName ? fullName : firstName,
    lastName,
    email: contact.email?.valueOf() as string,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    firstAddressLine,
    secondAddressLine,
    note,
  }
}

const parseVcf = async (files: File[]): Promise<NewContact[]> => {
  const parsedContacts: NewContact[] = []

  for (const file of files) {
    const contacts = vCard.parse(await readFile(file))
    contacts.forEach(({ data }) => parsedContacts.push(parseContact(data)))
  }

  return parsedContacts
}

export default parseVcf
