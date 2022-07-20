/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "@mudita/pure"
import DeviceService from "App/__deprecated__/backend/device-service"
import { Contact, ContactID } from "App/contacts/reducers"
import { ContactRepository } from "App/contacts/repositories"
import { ContactPresenter } from "App/contacts/presenters"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { isResponseSuccessWithData } from "App/core/helpers"

export class ContactService {
  constructor(
    private contactRepository: ContactRepository,
    private deviceService: DeviceService
  ) {}

  public async getContact(id: string): Promise<RequestResponse<Contact>> {
    const response = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Get,
      body: {
        id: Number(id),
      },
    })

    if (isResponseSuccessWithData(response)) {
      return {
        status: response.status,
        data: ContactPresenter.mapToContact(response.data),
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get contact: Something went wrong" },
      }
    }
  }

  public async getContacts(): Promise<RequestResponse<Contact[]>> {
    const response = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Get,
    })

    if (isResponseSuccessWithData(response)) {
      return {
        status: response.status,
        data: response.data.entries.map(ContactPresenter.mapToContact),
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get contacts: Something went wrong" },
      }
    }
  }

  public async createContact(
    newContact: Contact
  ): Promise<RequestResponse<Contact>> {
    const response = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Post,
      body: ContactPresenter.mapToPureContact(newContact),
    })

    if (isResponseSuccessWithData(response)) {
      const contact = {
        ...newContact,
        id: String(response.data.id),
        primaryPhoneNumber: newContact.primaryPhoneNumber ?? "",
      }

      this.contactRepository.create(contact, true)

      return {
        status: response.status,
        data: contact,
      }
    } else {
      return {
        status: response.status,
        error: { message: "Create contact: Something went wrong" },
      }
    }
  }

  public async editContact(
    contact: Contact
  ): Promise<RequestResponse<Contact>> {
    // it's workaround to handle badly response from API when edited contact isn't exist
    const isContactValidResponse = await this.isContactValid(contact)

    if (isContactValidResponse.status === RequestResponseStatus.Error) {
      return isContactValidResponse
    }

    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Put,
      body: ContactPresenter.mapToPureContact(contact),
    })

    if (status === RequestResponseStatus.Ok) {
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
  ): Promise<RequestResponse<ContactID[]>> {
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
      .filter(({ status }) => status === RequestResponseStatus.Error)
      .map(({ id }) => id)
    const successIds = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Ok)
      .map(({ id }) => id)

    if (errorIds.length > 0) {
      successIds.forEach((id) => this.contactRepository.delete(id, true))

      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Delete contact: Something went wrong",
          data: errorIds,
        },
      }
    } else {
      contactIds.forEach((id) => this.contactRepository.delete(id, true))

      return {
        status: RequestResponseStatus.Ok,
      }
    }
  }

  private async isContactValid(
    contact: Contact
  ): Promise<RequestResponse<Contact>> {
    const getContactResponse = await this.getContact(contact.id)

    if (
      getContactResponse.status === RequestResponseStatus.Error ||
      getContactResponse.data === undefined ||
      getContactResponse.data?.id === "0"
    ) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Edit contact: the try to edit a contact that isn't exist",
        },
      }
    } else {
      return {
        status: RequestResponseStatus.Ok,
      }
    }
  }
}
