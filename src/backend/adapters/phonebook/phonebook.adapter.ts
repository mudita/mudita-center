import { Endpoint, Method } from "pure"
import Faker from "faker"
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
import DeviceService from "Backend/device-service"

interface ContactCount {
  count: number
}

class Phonebook extends PhonebookAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getContacts(): Promise<DeviceResponse<Contact[]>> {
    const { status, data } = await this.getContactCount()

    if (status === DeviceResponseStatus.Ok && Boolean(data)) {
      // TODO: replace this mock count to value from data after fix https://appnroll.atlassian.net/browse/EGD-4368
      return this.getContactsByCount({ count: 5 })
    } else {
      return { status, error: { message: "something goes wrong" } }
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

  private async getContactsByCount({
    count,
  }: ContactCount): Promise<DeviceResponse<Contact[]>> {
    const { status, data = [] } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Get,
      body: { count },
    })

    if (status === DeviceResponseStatus.Ok) {

      return {
        status,
        data: data.map(mapToContact),
      }
    } else {
      return { status, data: [] }
    }
  }

  private getContactCount(): Promise<DeviceResponse<ContactCount>> {
    return this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Get,
      body: { count: true },
    })
  }
}

const createPhonebook = (deviceService: DeviceService): Phonebook =>
  new Phonebook(deviceService)

export default createPhonebook

const mapToContact = (pureContact: PureContact): Contact => {
    const {
      id,
      blocked,
      favourite,
      address = "",
      altName,
      priName,
      numbers: [primaryPhoneNumber = "", secondaryPhoneNumber = ""],
    } = pureContact

    const firstAddressLine = address.substr(0, address.indexOf("\n"))
    const secondAddressLine = address.substr(address.indexOf("\n") + 1)

    return {
      blocked,
      favourite,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      firstAddressLine,
      secondAddressLine,
      id: String(id),
      firstName: priName,
      lastName: altName,
      ice: false,
      note: "",
      email: "",
    }
}
