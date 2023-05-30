/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "App/device/constants"
import {
  GetContactResponseBody,
  GetContactsResponseBody,
  CreateContactResponseBody,
  CreateContactErrorResponseBody,
} from "App/device/types/mudita-os"
import { DeviceManager } from "App/device-manager/services"
import { Contact, ContactID } from "App/contacts/reducers"
import { ContactRepository } from "App/contacts/repositories"
import { ContactPresenter } from "App/contacts/presenters"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

export class ContactService {
  constructor(
    private contactRepository: ContactRepository,
    private deviceManager: DeviceManager
  ) {}

  public async getContact(id: string): Promise<RequestResponse<Contact>> {
    const response =
      await this.deviceManager.device.request<GetContactResponseBody>({
        endpoint: Endpoint.Contacts,
        method: Method.Get,
        body: {
          id: Number(id),
        },
      })

    if (response.ok && response.data) {
      return {
        status: RequestResponseStatus.Ok,
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
    const response =
      await this.deviceManager.device.request<GetContactsResponseBody>({
        endpoint: Endpoint.Contacts,
        method: Method.Get,
      })

    if (response.ok && response.data) {
      return {
        status: RequestResponseStatus.Ok,
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/unbound-method
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
    //todo
    //workaround - https://appnroll.atlassian.net/browse/CP-1931
    if (
      newContact.primaryPhoneNumber === undefined ||
      newContact.primaryPhoneNumber === ""
    ) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Create contact: Empty primary phone number",
        },
      }
    }
    //workaround

    const response =
      await this.deviceManager.device.request<CreateContactResponseBody>({
        endpoint: Endpoint.Contacts,
        method: Method.Post,
        body: ContactPresenter.mapToPureContact(newContact),
      })

    if (response.ok && response.data) {
      const contact = {
        ...newContact,
        id: String(response.data.id),
        primaryPhoneNumber: newContact.primaryPhoneNumber ?? "",
      }

      this.contactRepository.create(contact, true)

      return {
        status: RequestResponseStatus.Ok,
        data: contact,
      }
      // error type cannot be typed correctly, response method needs enhancement
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (response.error?.payload?.status === "phone-number-duplicated") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const errorPayloadData = (response.error?.payload?.data ?? {
        duplicateNumbers: [],
      }) as CreateContactErrorResponseBody

      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "phone-number-duplicated",
          data: {
            primaryPhoneNumberIsDuplicated:
              errorPayloadData.duplicateNumbers.includes(
                newContact.primaryPhoneNumber
              ),
            secondaryPhoneNumberIsDuplicated:
              errorPayloadData.duplicateNumbers.includes(
                newContact.secondaryPhoneNumber ?? ""
              ),
          },
        },
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
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

    const { ok, data } = await this.deviceManager.device.request({
      endpoint: Endpoint.Contacts,
      method: Method.Put,
      body: ContactPresenter.mapToPureContact(contact),
    })

    if (ok) {
      this.contactRepository.update(contact, true)

      return { status: RequestResponseStatus.Ok, data: contact }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Edit contact: Something went wrong", data },
      }
    }
  }

  public async deleteContacts(
    contactIds: ContactID[]
  ): Promise<RequestResponse<ContactID[]>> {
    const results = contactIds.map(async (id) => {
      const { ok } = await this.deviceManager.device.request({
        endpoint: Endpoint.Contacts,
        method: Method.Delete,
        body: { id: Number(id) },
      })
      return {
        status: ok ? RequestResponseStatus.Ok : RequestResponseStatus.Error,
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
