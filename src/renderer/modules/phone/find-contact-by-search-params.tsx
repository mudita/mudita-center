import { Contact } from "Renderer/models/phone/phone.typings"

const findContactBySearchParams = (
  searchParams: URLSearchParams,
  contacts: Contact[]
): Contact | undefined => {
  return contacts.find(({ id }) => {
    const paramsCallerId = searchParams.get("callerId") || ""
    return id === paramsCallerId
  })
}

export default findContactBySearchParams
