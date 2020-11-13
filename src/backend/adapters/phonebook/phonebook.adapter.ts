import PhonebookAdapter from "Backend/adapters/phonebook/phonebook-adapter.class"
import { Contact as PureContact } from "pure/dist/endpoints/contact.types"
import {
  Contact,
  ContactID,
  NewContact,
} from "Renderer/models/phone/phone.typings"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import Faker from "faker"
import PureNodeService from "Backend/pure-node-service"
import { Endpoint, Method } from "pure/dist/phone-port.types"

class Phonebook extends PhonebookAdapter {
  constructor(private pureNodeService: PureNodeService) {
    super()
  }

  public async getContacts(): Promise<DeviceResponse<Contact[]>> {
    const { status, data = [] } = await this.pureNodeService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Get,
      body: { count: 5 },
    })

    if (status === DeviceResponseStatus.Ok) {
      const mapToContact = (data: PureContact[]): Contact[] => {
        return data.map((pureContact) => {
          const {
            address,
            altName,
            blocked,
            favourite,
            id,
            numbers,
            priName,
          } = pureContact

          return {
            id: String(id),
            firstName: altName,
            lastName: priName,
            primaryPhoneNumber: numbers[0],
            secondaryPhoneNumber: numbers[1],
            favourite: favourite,
            blocked: blocked,
            ice: false,
            note: "",
            email: "",
            firstAddressLine: address,
            secondAddressLine: "",
          }
        })
      }

      return {
        status,
        data: mapToContact(data),
      }
    } else {
      return { status, data: [] }
    }
  }

  public addContact(contact: NewContact): DeviceResponse<any> {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        ...contact,
        id: Faker.random.uuid(),
      },
    }
  }

  public editContact(contact: Contact): DeviceResponse<Contact> {
    return {
      status: DeviceResponseStatus.Ok,
      data: contact,
    }
  }

  public deleteContacts(contactsIds: ContactID[]): DeviceResponse<ContactID[]> {
    return {
      status: DeviceResponseStatus.Ok,
      data: contactsIds,
    }
  }
}

const createPhonebook = (
  pureNodeService: PureNodeService,
): Phonebook => new Phonebook(pureNodeService)

export default createPhonebook
