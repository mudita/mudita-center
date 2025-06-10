/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { setActiveDevice } from "./helpers/protocol-validator"
import {
  APIConfigService,
  APIEntitiesService,
  ServiceBridge,
} from "device/feature"
import {
  ApiConfig,
  EntitiesDeleteResponse,
  EntitiesFileData,
  EntityData,
} from "device/models"
import { ResponseStatus } from "Core/device"
import {
  contactFullData1,
  contactWithGermanyPhoneNumberOnly,
} from "../../../generic-view/feature/src/lib/seed-data/contacts-seed-data"
import { TestContact } from "./helpers/entities-data"

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

describe("Entities configuration, metadata and data", () => {
  let deviceProtocol: DeviceProtocol
  let entityTypes: string[]

  async function fetchSupportedEntities() {
    const apiConfigService = new APIConfigService(deviceProtocol)
    const result = await apiConfigService.getAPIConfig()
    const apiConfig = result.data as ApiConfig
    entityTypes = apiConfig.entityTypes ?? []
    expect(entityTypes.length).toBeGreaterThan(0)
  }

  beforeAll(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    await fetchSupportedEntities()
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  it("should return successful response for entity configuration", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      const service = new APIEntitiesService(
        deviceProtocol,
        new ServiceBridge()
      )
      const result = await service.getEntitiesConfiguration({
        entitiesType: entityType,
      })

      expect(result).toBeDefined()
      expect(result.ok).toBeTruthy()
    }
  })

  it("should return successful response for entity metadata", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      const service = new APIEntitiesService(
        deviceProtocol,
        new ServiceBridge()
      )
      const result = await service.getEntitiesMetadata({
        entitiesType: entityType,
      })

      expect(result).toBeDefined()
      expect(result.ok).toBeTruthy()
    }
  }, 10_000)

  it("should return successful response for entity data", async () => {
    expect(entityTypes).toBeDefined()
    expect(entityTypes.length).toBeGreaterThan(0)

    for (const entityType of entityTypes) {
      let progress = 0
      let status = 0

      const service = new APIEntitiesService(
        deviceProtocol,
        new ServiceBridge()
      )
      const createEntitiesResult = await service.getEntitiesData({
        entitiesType: entityType,
        responseType: "file",
        action: "create",
      })

      expect(createEntitiesResult).toBeDefined()
      expect(createEntitiesResult.ok).toBeTruthy()

      while (status != ResponseStatus.Ok) {
        const getEntitiesResult = await service.getEntitiesData({
          entitiesType: entityType,
          responseType: "file",
          action: "get",
        })
        expect(getEntitiesResult).toBeDefined()
        expect(getEntitiesResult.ok).toBeTruthy()
        if (getEntitiesResult.ok) {
          const data = getEntitiesResult.data as EntitiesFileData & {
            status: ResponseStatus
          }
          progress = data.progress!
          status = data.status
        }
      }
      expect(progress).toBe(100)
      expect(status).toBe(ResponseStatus.Ok)
    }
  }, 30_000)

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

  it("should add contact with full data", async () => {
    const service = new APIEntitiesService(deviceProtocol, new ServiceBridge())

    const id = await createContact(service, contactFullData1)

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
    expect(clearContact(entityData.data)).toEqual(
      clearContact(contactFullData1)
    )
  })

  it("should add contact with phone number only", async () => {
    const service = new APIEntitiesService(deviceProtocol, new ServiceBridge())

    const id = await createContact(service, contactWithGermanyPhoneNumberOnly)

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
    expect(clearContact(entityData.data)).toEqual(
      clearContact(contactWithGermanyPhoneNumberOnly)
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

  function clearContact(entityData: EntityData): TestContact {
    const contact = entityData as unknown as TestContact
    return {
      address: contact.address,
      company: contact.company,
      department: contact.department,
      emailAddresses: contact.emailAddresses?.map(
        (email: { emailAddress: string; emailType: string }) => ({
          emailAddress: email.emailAddress,
          emailType: email.emailType,
        })
      ),
      entityType: contact.entityType,
      firstName: contact.firstName,
      lastName: contact.lastName,
      middleName: contact.middleName,
      namePrefix: contact.namePrefix,
      nameSuffix: contact.nameSuffix,
      notes: contact.notes,
      phoneNumbers: contact.phoneNumbers?.map(
        (phone: { phoneNumber: string; phoneType: string }) => ({
          phoneNumber: phone.phoneNumber,
          phoneType: phone.phoneType,
        })
      ),
      website: contact.website,
      workTitle: contact.workTitle,
    }
  }
})
