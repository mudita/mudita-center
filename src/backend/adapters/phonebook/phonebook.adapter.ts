import { Endpoint, Method } from "pure"
import PhonebookAdapter from "Backend/adapters/phonebook/phonebook-adapter.class"
import {
  Contact as PureContact,
  NewContact as PureNewContact,
} from "pure/dist/endpoints/contact.types"
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
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Put,
      body: mapToPureNewContact(contact),
    })

    if (status === DeviceResponseStatus.Ok && data !== undefined) {
      return {
        status,
        data: {
          id: String(data.id),
          ...contact,
          primaryPhoneNumber: contact.primaryPhoneNumber ?? "",
        },
      }
    } else {
      return { status, error: { message: "Something went wrong" } }
    }
  }

  public async editContact(contact: Contact): Promise<DeviceResponse<Contact>> {
    const { status } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Post,
      body: mapToPureContact(contact),
    })

    if (status === DeviceResponseStatus.Ok) {
      return { status, data: contact }
    } else {
      return { status, error: { message: "Something went wrong" } }
    }
  }

  public async deleteContacts(
    contactIds: ContactID[]
  ): Promise<DeviceResponse<ContactID[]>> {
    const results = contactIds.map(async (id) => {
      const { status } = await this.deviceService.request({
        endpoint: Endpoint.Contacts,
        method: Method.Delete,
        body: { id: Number(id) },
      })
      return {
        status,
        id,
      }
    })
    const errorResponses = (await Promise.all(results)).filter(
      ({ status }) => status === DeviceResponseStatus.Error
    )
    if (errorResponses.length > 0) {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message: "Something went wrong",
          data: errorResponses.map(({ id }) => id),
        },
      }
    } else {
      return {
        status: DeviceResponseStatus.Ok,
      }
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

const mapToPureNewContact = (contact: NewContact): PureNewContact => {
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
    numbers: numbers,
    priName: firstName,
    altName: lastName,
    address: [firstAddressLine, secondAddressLine].join("\n").trim(),
  }
}

const mapToPureContact = (contact: Contact): PureContact => {
  return { ...mapToPureNewContact(contact), id: Number(contact.id) }
}
