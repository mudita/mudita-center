/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { setActiveDevice } from "./helpers/protocol-validator"
import { APIEntitiesService, ServiceBridge } from "device/feature"
import { EntitiesDeleteResponse, EntityData } from "device/models"

import {
  contactsSeedData,
  contactFullData1,
  contactWithFirstNameOnly,
  contactFullData2,
} from "../../../generic-view/feature/src/lib/seed-data/contacts-seed-data"
import { clearContact } from "./helpers/clear-contact-data"
import { exec } from "child_process"
import util from "util"
export const execPromise = util.promisify(exec)

jest.mock("shared/utils", () => {
  return {
    callRenderer: () => {},
    delay: () => {
      return new Promise((resolve) => setTimeout(resolve, 500))
    },
  }
})
jest.mock("Core/device-manager/services/usb-devices/usb-devices.helper", () => {
  return { getUsbDevices: () => {} }
})
jest.mock("electron-better-ipc", () => {
  return {
    ipcMain: {
      emit: () => {},
    },
  }
})

describe("Contact entities", () => {
  let deviceProtocol: DeviceProtocol

  beforeAll(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  beforeEach(async () => {
    await clearContactsDatabase()
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  it("should remove contact entity with valid entityId", async () => {
    const service = new APIEntitiesService(deviceProtocol, new ServiceBridge())

    const id = await createContact(service, contactFullData1)

    expect(id).toBeDefined()

    if (id === undefined) {
      return
    }

    const removeEntitiesResult = await service.deleteEntitiesData({
      entitiesType: "contacts",
      ids: [id],
    })

    expect(removeEntitiesResult.ok).toBeTruthy()
  })

  it("should return success with failedIds while removing valid and invalid contacts entityIds in one request", async () => {
    const service = new APIEntitiesService(deviceProtocol, new ServiceBridge())

    const id = await createContact(service, contactFullData1)

    expect(id).toBeDefined()

    const removeEntitiesResult = await service.deleteEntitiesData({
      entitiesType: "contacts",
      ids: [id!, "0", "-1"],
    })

    expect(removeEntitiesResult.ok).toBeTruthy()

    const data = removeEntitiesResult.data as EntitiesDeleteResponse
    expect(data?.failedIds[0]).toBe("0")
    expect(data?.failedIds[1]).toBe("-1")
  })

  it("should return error with incorrect-response type for invalid contacts entityIds", async () => {
    const service = new APIEntitiesService(deviceProtocol, new ServiceBridge())
    const removeEntitiesResult = await service.deleteEntitiesData({
      entitiesType: "contacts",
      ids: ["0", "-1"],
    })

    expect(removeEntitiesResult.ok).toBeFalsy()
    expect(removeEntitiesResult.error?.type).toBe("incorrect-response")
  })

  it("should correctly add contacts with complete and varied fields", async () => {
    const service = new APIEntitiesService(deviceProtocol, new ServiceBridge())

    for (const contact of contactsSeedData) {
      const id = await createContact(service, contact)

      expect(id).toBeDefined()

      if (id === undefined) {
        return
      }

      const contactResponse = await service.getEntitiesData({
        entitiesType: "contacts",
        responseType: "json",
        entityId: id,
      })

      expect(contactResponse).toBeDefined()
      if (!contactResponse.ok == undefined) {
        return
      }
      const entityData = contactResponse.data as { data: EntityData }
      expect(clearContact(entityData.data)).toEqual(clearContact(contact))
    }
  }, 120000)

  it("should correctly update contacts with complete and varied fields", async () => {
    const service = new APIEntitiesService(deviceProtocol, new ServiceBridge())

    const id = await createContact(service, contactFullData2)
    expect(id).toBeDefined()

    for (const contact of contactsSeedData) {
      if (id === undefined) {
        return
      }

      const updateContactId = await editContact(service, id, contact)
      expect(updateContactId).toBe(id)

      if (updateContactId === undefined) {
        return
      }

      const updatedContactResponse = await service.getEntitiesData({
        entitiesType: "contacts",
        responseType: "json",
        entityId: id,
      })

      expect(updatedContactResponse).toBeDefined()
      if (!updatedContactResponse.ok == undefined) {
        return
      }
      const updatedEntityData = updatedContactResponse.data as {
        data: EntityData
      }
      expect(clearContact(updatedEntityData.data)).toEqual(
        clearContact(contact)
      )
    }
  }, 120000)

  it("should clear all contact fields except first name when only first name is provided", async () => {
    const service = new APIEntitiesService(deviceProtocol, new ServiceBridge())

    const id = await createContact(service, contactFullData2)

    expect(id).toBeDefined()

    if (id === undefined) {
      return
    }

    const updateContactId = await editContact(
      service,
      id,
      contactWithFirstNameOnly
    )
    expect(updateContactId).toBe(id)

    if (updateContactId === undefined) {
      return
    }

    const updatedContactResponse = await service.getEntitiesData({
      entitiesType: "contacts",
      responseType: "json",
      entityId: id,
    })

    expect(updatedContactResponse).toBeDefined()
    if (!updatedContactResponse.ok == undefined) {
      return
    }
    const updatedEntityData = updatedContactResponse.data as {
      data: EntityData
    }
    expect(clearContact(updatedEntityData.data)).toEqual(
      clearContact(contactWithFirstNameOnly)
    )
  })

  async function createContact(
    entitiesService: APIEntitiesService,
    data: EntityData
  ): Promise<string | undefined> {
    const createEntityResult = await entitiesService.createEntityData({
      entitiesType: "contacts",
      data: data,
    })

    if (createEntityResult.ok && createEntityResult.data) {
      const id = createEntityResult.data.data.contactId
      return id as string
    }
    return undefined
  }

  async function editContact(
    entitiesService: APIEntitiesService,
    entityId: string,
    data: EntityData
  ): Promise<string | undefined> {
    const updateEntityResult = await entitiesService.updateEntityData({
      entitiesType: "contacts",
      entityId,
      data,
    })
    if (updateEntityResult.ok && updateEntityResult.data) {
      const id = updateEntityResult.data.data.contactId
      return id as string
    }
    return undefined
  }

  const clearContactsDatabase = async (): Promise<void> => {
    try {
      const command = `adb shell pm clear com.android.providers.contacts`
      await execPromise(command)
    } catch (err) {
      console.log(err)
    }
  }
})
