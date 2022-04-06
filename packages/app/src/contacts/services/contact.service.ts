/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "@mudita/pure"
import DeviceService from "Backend/device-service"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { Contact, ContactID } from "App/contacts/reducers"
import { ContactRepository } from "App/contacts/repositories"
import { ContactPresenter } from "App/contacts/presenters"

export class ContactService {
  constructor(
    private contactRepository: ContactRepository,
    private deviceService: DeviceService
  ) {}

  public async getContact(id: string): Promise<DeviceResponse<Contact>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Get,
      body: {
        id: Number(id),
      },
    })

    if (status === DeviceResponseStatus.Ok && data !== undefined) {
      return {
        status,
        data: ContactPresenter.serialize(data),
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Get contact: Something went wrong" },
      }
    }
  }

  public async getContacts(): Promise<DeviceResponse<Contact[]>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data?.entries !== undefined) {
      return {
        status,
        data: data.entries.map(ContactPresenter.serialize),
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Get contacts: Something went wrong" },
      }
    }
  }

  public async createContact(
    newContact: Contact
  ): Promise<DeviceResponse<Contact>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Post,
      body: ContactPresenter.deserialize(newContact),
    })

    if (status === DeviceResponseStatus.Ok && data !== undefined) {
      const contact = {
        ...newContact,
        id: String(data.id),
        primaryPhoneNumber: newContact.primaryPhoneNumber ?? "",
      }

      this.contactRepository.create(contact, true)

      return {
        status,
        data: contact,
      }
    } else {
      return {
        status,
        error: { message: "Create contact: Something went wrong", data },
      }
    }
  }

  public async editContact(contact: Contact): Promise<DeviceResponse<Contact>> {
    // it's workaround to handle badly response from API when edited contact isn't exist
    const isContactValidResponse = await this.isContactValid(contact)

    if (isContactValidResponse.status === DeviceResponseStatus.Error) {
      return isContactValidResponse
    }

    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Put,
      body: ContactPresenter.deserialize(contact),
    })

    if (status === DeviceResponseStatus.Ok) {
      this.contactRepository.update(contact, true)

      return { status, data: contact }
    } else {
      return {
        status,
        error: { message: "Edit contact: Something went wrong", data },
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

    const errorIds = (await Promise.all(results))
      .filter(({ status }) => status === DeviceResponseStatus.Error)
      .map(({ id }) => id)
    const successIds = (await Promise.all(results))
      .filter(({ status }) => status === DeviceResponseStatus.Ok)
      .map(({ id }) => id)

    if (errorIds.length > 0) {
      successIds.forEach((id) => this.contactRepository.delete(id, true))

      return {
        status: DeviceResponseStatus.Error,
        error: {
          message: "Delete contact: Something went wrong",
          data: errorIds,
        },
      }
    } else {
      contactIds.forEach((id) => this.contactRepository.delete(id, true))

      return {
        status: DeviceResponseStatus.Ok,
      }
    }
  }

  private async isContactValid(
    contact: Contact
  ): Promise<DeviceResponse<Contact>> {
    const getContactResponse = await this.getContact(contact.id)

    if (
      getContactResponse.status === DeviceResponseStatus.Error ||
      getContactResponse.data === undefined ||
      getContactResponse.data?.id === "0"
    ) {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message: "Edit contact: the try to edit a contact that isn't exist",
        },
      }
    } else {
      return {
        status: DeviceResponseStatus.Ok,
      }
    }
  }
}
