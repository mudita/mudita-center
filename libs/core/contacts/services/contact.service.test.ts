/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { DeviceCommunicationError } from "core-device/models"
import { ContactService } from "Core/contacts/services/contact.service"
import { ContactRepository } from "Core/contacts/repositories"
import { DeviceProtocol } from "device-protocol/feature"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import { Contact as PureContact } from "Core/device/types/mudita-os"
import { Contact } from "Core/contacts/reducers"

const contactRepository = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as unknown as ContactRepository

const deviceProtocol = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceProtocol

const subject = new ContactService(contactRepository, deviceProtocol)

const pureContact: PureContact = {
  id: 19,
  address: "6 Czeczota St.\n02600 Warsaw",
  altName: "Boligłowa",
  favourite: true,
  numbers: ["500400300"],
  priName: "Alek",
  email: "",
}

const contact: Contact = {
  email: "",
  favourite: true,
  firstAddressLine: "6 Czeczota St.",
  firstName: "Alek",
  ice: false,
  id: "19",
  lastName: "Boligłowa",
  note: "",
  primaryPhoneNumber: "500400300",
  secondAddressLine: "02600 Warsaw",
  secondaryPhoneNumber: "",
}

const successResponse: ResultObject<unknown> = Result.success(pureContact)
const errorResponse: ResultObject<unknown> = Result.failed(
  new AppError(DeviceCommunicationError.RequestFailed, "Something went wrong")
)

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`ContactService`", () => {
  describe("`getContact` method", () => {
    test("map data and returns success when `device.request` returns success", async () => {
      deviceProtocol.device.request = jest
        .fn()
        .mockReturnValue(Result.success(pureContact))
      const response = await subject.getContact("1")
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocol.device.request).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
      expect(response.data).toEqual(contact)
    })

    test("returns error  when `device.request` returns error", async () => {
      deviceProtocol.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.getContact("1")
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocol.device.request).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("`getContacts` method", () => {
    test("map data and returns success when `device.request` returns success", async () => {
      deviceProtocol.device.request = jest
        .fn()
        .mockReturnValue(Result.success({ entries: [pureContact] }))
      const response = await subject.getContacts()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocol.device.request).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
      expect(response.data).toEqual([contact])
    })

    test("returns error when `device.request` returns error", async () => {
      deviceProtocol.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.getContacts()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocol.device.request).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("`createContact` method", () => {
    test("returns success and `repository.create` is called when `device.request` returns success", async () => {
      deviceProtocol.device.request = jest
        .fn()
        .mockReturnValue(Result.success({ id: pureContact.id }))
      const response = await subject.createContact(contact)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocol.device.request).toHaveBeenCalled()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(contactRepository.create).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
      expect(response.data).toEqual(contact)
    })

    test("returns error when `device.request` returns error`", async () => {
      deviceProtocol.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.createContact(contact)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocol.device.request).toHaveBeenCalled()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(contactRepository.create).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("`editContact` method", () => {
    test("returns success and `repository.update` is called when `device.request` and `isContactValid` returns success", async () => {
      deviceProtocol.device.request = jest
        .fn()
        .mockReturnValue(Result.success(pureContact))

      const response = await subject.editContact(contact)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(contactRepository.update).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error when `isContactValid` returns error", async () => {
      jest
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(subject as unknown as { isContactValid: any }, "isContactValid")
        .mockImplementation(() => ({
          status: RequestResponseStatus.Error,
        }))

      const response = await subject.editContact(contact)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(contactRepository.update).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })

    test("returns error when `device.request` returns error", async () => {
      jest
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(subject as unknown as { isContactValid: any }, "isContactValid")
        .mockImplementation(() => successResponse)
      deviceProtocol.device.request = jest.fn().mockReturnValue(errorResponse)

      const response = await subject.editContact(contact)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocol.device.request).toHaveBeenCalled()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(contactRepository.update).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
    })
  })

  describe("`deleteContacts` method", () => {
    test("returns success and `repository.delete` is called when `device.request` returns success", async () => {
      deviceProtocol.device.request = jest.fn().mockReturnValue(successResponse)
      const response = await subject.deleteContacts(["1"])

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocol.device.request).toHaveBeenCalled()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(contactRepository.delete).toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Ok)
    })

    test("returns error with ids when `device.request` returns error", async () => {
      deviceProtocol.device.request = jest.fn().mockReturnValue(errorResponse)
      const response = await subject.deleteContacts(["1"])

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(deviceProtocol.device.request).toHaveBeenCalled()
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(contactRepository.delete).not.toHaveBeenCalled()
      expect(response.status).toEqual(RequestResponseStatus.Error)
      expect(response.error?.data).toEqual(["1"])
    })
  })
})
