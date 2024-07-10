/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceCommunicationError, Endpoint, Method } from "core-device/models"
import {
  GetContactResponseBody,
  GetContactsResponseBody,
  CreateContactResponseBody,
  CreateContactErrorResponseBody,
} from "Core/device/types/mudita-os"
import { DeviceProtocol } from "device-protocol/feature"
import { Contact, ContactID } from "Core/contacts/reducers"
import { ContactRepository } from "Core/contacts/repositories"
import { ContactPresenter } from "Core/contacts/presenters"
import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"
import { ResultObject } from "Core/core/builder"

export class ContactService {
  constructor(
    private contactRepository: ContactRepository,
    private deviceProtocol: DeviceProtocol
  ) {}

  public async getContact(id: string): Promise<RequestResponse<Contact>> {
    const response =
      await this.deviceProtocol.device.request<GetContactResponseBody>({
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
      await this.deviceProtocol.device.request<GetContactsResponseBody>({
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

    const result =
      await this.deviceProtocol.device.request<CreateContactResponseBody>({
        endpoint: Endpoint.Contacts,
        method: Method.Post,
        body: ContactPresenter.mapToPureContact(newContact),
        options: {
          connectionTimeOut: 5000,
        },
      })

    if (this.isInternalServerError(result)) {
      return {
        status: RequestResponseStatus.InternalServerError,
      }
    }

    if (result.ok && result.data) {
      const contact = {
        ...newContact,
        id: String(result.data.id),
        primaryPhoneNumber: newContact.primaryPhoneNumber ?? "",
      }

      this.contactRepository.create(contact, true)

      return {
        status: RequestResponseStatus.Ok,
        data: contact,
      }
      // error type cannot be typed correctly, response method needs enhancement
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (result.error?.payload?.status === "phone-number-duplicated") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const errorPayloadData = (result.error?.payload?.data ?? {
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

    const result = await this.deviceProtocol.device.request({
      endpoint: Endpoint.Contacts,
      method: Method.Put,
      body: ContactPresenter.mapToPureContact(contact),
      options: {
        connectionTimeOut: 5000,
      },
    })

    if (this.isInternalServerError(result)) {
      return {
        status: RequestResponseStatus.InternalServerError,
      }
    }

    const { ok, data, error } = result

    if (ok) {
      this.contactRepository.update(contact, true)

      return { status: RequestResponseStatus.Ok, data: contact }
      // error type cannot be typed correctly, response method needs enhancement
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (error?.payload?.status === "phone-number-duplicated") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const errorPayloadData = (error?.payload?.data ?? {
        duplicateNumbers: [],
      }) as CreateContactErrorResponseBody

      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "phone-number-duplicated",
          data: {
            primaryPhoneNumberIsDuplicated:
              errorPayloadData.duplicateNumbers.includes(
                contact.primaryPhoneNumber ?? ""
              ),
            secondaryPhoneNumberIsDuplicated:
              errorPayloadData.duplicateNumbers.includes(
                contact.secondaryPhoneNumber ?? ""
              ),
          },
        },
      }
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
    const errorIds = []
    const successIds = []

    for (const id of contactIds) {
      const result = await this.deviceProtocol.device.request({
        endpoint: Endpoint.Contacts,
        method: Method.Delete,
        body: { id: Number(id) },
        options: {
          connectionTimeOut: 5000,
        },
      })

      if (this.isInternalServerError(result)) {
        return {
          status: RequestResponseStatus.InternalServerError,
        }
      }

      const { ok } = result

      if (ok) {
        successIds.push(id)
      } else {
        errorIds.push(id)
      }
    }

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

  private isInternalServerError(
    result: ResultObject<unknown, DeviceCommunicationError>
  ): boolean {
    const { error } = result
    if (error?.type === DeviceCommunicationError.DeviceInitializationFailed) {
      return true
    }

    if (error?.type === DeviceCommunicationError.DeviceLocked) {
      return true
    }

    return false
  }
}
