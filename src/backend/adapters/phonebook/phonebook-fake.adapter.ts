import PhonebookAdapter from "Backend/adapters/phonebook/phonebook-adapter.class"
import {
  Contact,
  ContactID,
  NewContact,
} from "App/contacts/store/contacts.type"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import Faker from "faker"
import { contactsSeedInput } from "App/seeds/contacts"

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
      data: contactsSeedInput,
    }
  }

  public async addContact(
    contact: NewContact
  ): Promise<DeviceResponse<Contact>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        ...contact,
        primaryPhoneNumber: contact.primaryPhoneNumber ?? "",
        id: Faker.random.uuid(),
      },
    }
  }

  public async editContact(contact: Contact): Promise<DeviceResponse<Contact>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: contact,
    }
  }

  public async deleteContacts(
    contactIds: ContactID[]
  ): Promise<DeviceResponse<ContactID[]>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: contactIds,
    }
  }
}

const createFakePhonebookAdapter = (): PhonebookAdapter => new PhonebookFake()

export default createFakePhonebookAdapter
