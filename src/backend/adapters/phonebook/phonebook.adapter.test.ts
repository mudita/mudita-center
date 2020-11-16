import { Endpoint, Method, RequestConfig } from "pure/dist/phone-port.types"
import createPhonebook from "Backend/adapters/phonebook/phonebook.adapter"
import PureNodeService from "Backend/pure-node-service"
import { Contact, NewContact } from "Renderer/models/phone/phone.typings"
import { Contact as PureContact } from "pure/dist/endpoints/contact.types"

const pureContactId = 19

const newContact: NewContact = {
  firstName: "Alek",
  lastName: "Boligłowa",
  primaryPhoneNumber: "500400300",
  secondaryPhoneNumber: "",
  email: "",
  note: "",
  firstAddressLine: "6 Czeczota St.",
  secondAddressLine: "02600 Warsaw",
  favourite: true,
  blocked: false,
  ice: false,
}

const contact: Contact = {
  ...newContact,
  id: String(pureContactId)
} as Contact

const mockPureData: PureContact[] = [
  {
    address: "6 Czeczota St.\n02600 Warsaw",
    altName: "Boligłowa",
    blocked: false,
    favourite: true,
    id: pureContactId,
    numbers: ["500400300"],
    priName: "Alek",
  },
]

jest.mock("Backend/pure-node-service", () => {
  return jest.fn().mockImplementation(() => {
    return {
      request: (config: RequestConfig) => {
        const { endpoint, method, body } = config

        if (
          endpoint === Endpoint.Contacts &&
          method === Method.Get &&
          body.count === true
        ) {
          return { data: { count: 1 }, status: "ok" }
        } else if (
          endpoint === Endpoint.Contacts &&
          method === Method.Get &&
          typeof body.count === "number"
        ) {
          return {
            data: mockPureData,
            status: "ok",
          }
        } else if (endpoint === Endpoint.Contacts && method === Method.Put) {
          return {
            data: mockPureData,
            status: "ok",
          }
        } else {
          return {
            status: "error",
          }
        }
      },
    }
  })
})

// @ts-ignore
const phonebook = createPhonebook(new PureNodeService())

test("return mapped contacts from pure to Contact model", async () => {
  const { data = [] } = await phonebook.getContacts()

  expect(data[0]).toMatchObject(contact)
})

test("return mapped new contact after success adding contact", async () => {
  const { data } = await phonebook.addContact(newContact)
  // TODO: remove mock id after fix https://appnroll.atlassian.net/browse/EGD-4400
  expect({ ...data, id: String(pureContactId) } as Contact).toMatchObject(contact)
})
