import PhonebookAdapter from "Backend/adapters/phonebook/phonebook-adapter.class"
import {
  Contact,
  ContactID,
  NewContact,
} from "Renderer/models/phone/phone.typings"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import Faker from "faker"

export interface PhonebookFakeAdapterProps {
  contactsCount: number
}

class PhonebookFake extends PhonebookAdapter {
  constructor() {
    super()
  }

  public async getContacts(): Promise<DeviceResponse<Contact[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: [],
    }
  }

  public async addContact(contact: NewContact): Promise<DeviceResponse<Contact>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        ...contact,
        primaryPhoneNumber: contact.primaryPhoneNumber ?? "",
        id: Faker.random.uuid(),
      }
    }
  }

  public editContact(contact: Contact): DeviceResponse<Contact> {
    return {
      status: DeviceResponseStatus.Ok,
      data: contact,
    }
  }

  public deleteContacts(
    contactIds: ContactID[]
  ): Promise<DeviceResponse<ContactID[]>> {
    return Promise.resolve({
      status: DeviceResponseStatus.Ok,
      data: contactIds,
    })
  }
}

const createFakePhonebookAdapter = (): PhonebookAdapter => new PhonebookFake()

export default createFakePhonebookAdapter
