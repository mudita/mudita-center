/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "@mudita/pure"
import PhonebookAdapter from "Backend/adapters/phonebook/phonebook-adapter.class"
import { Contact, ContactID } from "App/contacts/store/contacts.type"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import {
  mapToContact,
  mapToPureContact,
} from "Backend/adapters/phonebook/phonebook-mappers"

export class Phonebook extends PhonebookAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getContacts(): Promise<DeviceResponse<Contact[]>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data?.entries !== undefined) {
      return {
        status,
        data: data.entries.map(mapToContact),
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Get contacts: Something went wrong" },
      }
    }
  }

  public async addContact(contact: Contact): Promise<DeviceResponse<Contact>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Post,
      body: mapToPureContact(contact),
    })

    if (status === DeviceResponseStatus.Ok && data !== undefined) {
      return {
        status,
        data: {
          ...contact,
          id: String(data.id),
          primaryPhoneNumber: contact.primaryPhoneNumber ?? "",
        },
      }
    } else {
      return { status, error: { message: "Add contact: Something went wrong" } }
    }
  }

  public async editContact(contact: Contact): Promise<DeviceResponse<Contact>> {
    const { status } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Put,
      body: mapToPureContact(contact),
    })

    if (status === DeviceResponseStatus.Ok) {
      return { status, data: contact }
    } else {
      return {
        status,
        error: { message: "Edit contact: Something went wrong" },
      }
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
          message: "Delete contact: Something went wrong",
          data: errorResponses.map(({ id }) => id),
        },
      }
    } else {
      return {
        status: DeviceResponseStatus.Ok,
      }
    }
  }
}

const createPhonebook = (deviceService: DeviceService): Phonebook =>
  new Phonebook(deviceService)

export default createPhonebook
