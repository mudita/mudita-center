import PhonebookAdapter from "Backend/adapters/phonebook/phonebook.class"
import {
  Contact,
  ContactUid,
  NewContact,
} from "Renderer/models/phone/phone.interface"
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

  public addContact(contact: NewContact): DeviceResponse<Contact> {
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

  public deleteContacts(
    contactsIds: ContactUid[]
  ): DeviceResponse<ContactUid[]> {
    return {
      status: DeviceResponseStatus.Ok,
      data: contactsIds,
    }
  }
}

const createFakePhonebookAdapter = (): PhonebookAdapter => new PhonebookFake()

export default createFakePhonebookAdapter
