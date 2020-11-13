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

  public getContacts(): DeviceResponse<Contact[]> {
    return {
      status: DeviceResponseStatus.Ok,
      data: [],
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

const createFakePhonebookAdapter = (): PhonebookAdapter => new PhonebookFake()

export default createFakePhonebookAdapter
