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

    if (status === DeviceResponseStatus.Ok && data?.count !== undefined) {
      return this.getContactsByCount({ count: data.count })
    } else {
      return { status, error: { message: "Something went wrong" } }
    }
  }

  public async addContact(
    contact: NewContact
  ): Promise<DeviceResponse<Contact>> {
    const { status } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Put,
      body: mapToPureContact(contact),
    })

    if (status === DeviceResponseStatus.Ok) {
      return {
        status,
        data: {
          // TODO: return contact from API response after EGD fix, task https://appnroll.atlassian.net/browse/PDA-572
          id: Faker.random.uuid(),
          ...contact,
          primaryPhoneNumber: contact.primaryPhoneNumber ?? "",
        },
      }
    } else {
      return { status, error: { message: "Something went wrong" } }
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
    // TODO: map missing fields in separate issue https://appnroll.atlassian.net/browse/PDA-571 (after EGD implementation)
    // speedDial: undefined,
    ice: false,
    note: "",
    email: "",
  }
}

const mapToPureContact = (contact: NewContact): PureContact => {
  const {
    blocked = false,
    favourite = false,
    firstName = "",
    lastName = "",
    primaryPhoneNumber,
    secondaryPhoneNumber,
    firstAddressLine,
    secondAddressLine,
  } = contact
  const numbers = []
  if (primaryPhoneNumber) numbers.push(primaryPhoneNumber)
  if (secondaryPhoneNumber) numbers.push(secondaryPhoneNumber)

  return {
    blocked,
    favourite,
    // TODO: remove this conditional after EGD fix, task https://appnroll.atlassian.net/browse/PDA-572
    numbers: numbers.length === 0 ? ["999999999"] : numbers,
    id: Math.round(Math.random() * 1000),
    priName: firstName,
    altName: lastName,
    address: `${firstAddressLine}\n${secondAddressLine}`,
  }
}
