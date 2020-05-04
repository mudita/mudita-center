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
import { generateFakeData } from "Renderer/models/phone/phone.utils"

class PhonebookFake extends PhonebookAdapter {
  public getContacts(): DeviceResponse<Contact[]> {
    return {
      status: DeviceResponseStatus.Ok,
      data: generateFakeData(100),
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
