/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  buildDeleteEntitiesRequest,
  buildEntitiesFileDataRequest,
  buildPatchEntityDataRequest,
  buildPostEntityDataRequest,
  DeleteEntitiesResponseValidator207,
  EntityData,
  GetEntitiesDataResponseValidator,
  PatchEntityDataResponseValidator,
  PostEntityDataResponseValidator,
} from "devices/api-device/models"
import {
  contactFullData1,
  contactFullData2,
  contactsSeedData,
  contactWithFirstNameOnly,
} from "./test-files/contacts-seed-data"
import { withBodyStatus } from "./helpers/with-body-status"
import { clearContact } from "./helpers/clear-contact-data"
import { clearDeviceData } from "./helpers/clear-device-data"
import {
  ApiDeviceContext,
  initApiDeviceContext,
} from "./helpers/api-device-context"

let apiDeviceContext: ApiDeviceContext

describe("Contact entities", () => {
  beforeEach(async () => {
    apiDeviceContext = await initApiDeviceContext()
    await clearDeviceData(apiDeviceContext)
  }, 10_000)

  afterEach(async () => {
    await apiDeviceContext.reset()
  }, 10_000)

  it("should remove contact entity with valid entityId", async () => {
    const { service, deviceId } = apiDeviceContext
    const id = await createContact(contactFullData1)

    expect(id).toBeDefined()

    if (id === undefined) {
      return
    }

    const removeEntitiesResult = await service.request(
      deviceId,
      buildDeleteEntitiesRequest({
        entityType: "contacts",
        ids: [id],
      })
    )

    expect(removeEntitiesResult.status).toBe(200)
  })

  it("should return success with failedIds while removing valid and invalid contacts entityIds in one request", async () => {
    const { service, deviceId } = apiDeviceContext
    const id = await createContact(contactFullData1)

    expect(id).toBeDefined()

    if (id === undefined) {
      return
    }

    const removeEntitiesResult = await service.request(
      deviceId,
      buildDeleteEntitiesRequest({
        entityType: "contacts",
        ids: [id, "0", "-1"],
      })
    )

    expect(removeEntitiesResult.status).toBe(207)
    const enriched = withBodyStatus(removeEntitiesResult)
    const data = DeleteEntitiesResponseValidator207.parse(enriched.body)
    expect(data.failedIds[0]).toBe("0")
    expect(data.failedIds[1]).toBe("-1")
  })

  it("should return error with incorrect-response type for invalid contacts entityIds", async () => {
    const { service, deviceId } = apiDeviceContext
    const removeEntitiesResult = await service.request(
      deviceId,
      buildDeleteEntitiesRequest({
        entityType: "contacts",
        ids: ["0", "-1"],
      })
    )
    expect(removeEntitiesResult.status).toBe(404)
  })

  it("should correctly add contacts with complete and varied fields", async () => {
    const { service, deviceId } = apiDeviceContext
    for (const contact of contactsSeedData) {
      const id = await createContact(contact)

      expect(id).toBeDefined()

      if (id === undefined) {
        return
      }
      const contactResponse = await service.request(
        deviceId,
        buildEntitiesFileDataRequest({
          entityType: "contacts",
          responseType: "json",
          entityId: id,
        })
      )

      expect(contactResponse.status).toBe(200)
      const enriched = withBodyStatus(contactResponse)
      const entityData = GetEntitiesDataResponseValidator.parse(enriched.body)
      expect(clearContact(entityData.data)).toEqual(clearContact(contact))
    }
  }, 120000)

  it("should correctly update contacts with complete and varied fields", async () => {
    const { service, deviceId } = apiDeviceContext
    const id = await createContact(contactFullData2)
    expect(id).toBeDefined()

    for (const contact of contactsSeedData) {
      if (id === undefined) {
        return
      }

      const updateContactId = await editContact(id, contact)
      expect(updateContactId).toBe(id)

      if (updateContactId === undefined) {
        return
      }

      const updatedContactResponse = await service.request(
        deviceId,
        buildEntitiesFileDataRequest({
          entityType: "contacts",
          responseType: "json",
          entityId: id,
        })
      )

      expect(updatedContactResponse).toBeDefined()
      expect(updatedContactResponse.status).toBe(200)
      const enriched = withBodyStatus(updatedContactResponse)
      const updatedEntityData = GetEntitiesDataResponseValidator.parse(
        enriched.body
      )
      expect(clearContact(updatedEntityData.data)).toEqual(
        clearContact(contact)
      )
    }
  }, 120000)

  it("should clear all contact fields except first name when only first name is provided", async () => {
    const { service, deviceId } = apiDeviceContext
    const id = await createContact(contactFullData2)

    expect(id).toBeDefined()

    if (id === undefined) {
      return
    }

    const updateContactId = await editContact(id, contactWithFirstNameOnly)
    expect(updateContactId).toBe(id)

    if (updateContactId === undefined) {
      return
    }

    const updatedContactResponse = await service.request(
      deviceId,
      buildEntitiesFileDataRequest({
        entityType: "contacts",
        responseType: "json",
        entityId: id,
      })
    )

    expect(updatedContactResponse.status).toBe(200)
    const enriched = withBodyStatus(updatedContactResponse)
    const updatedEntityData = GetEntitiesDataResponseValidator.parse(
      enriched.body
    )
    expect(clearContact(updatedEntityData.data)).toEqual(
      clearContact(contactWithFirstNameOnly)
    )
  })

  async function createContact(data: EntityData): Promise<string | undefined> {
    const { service, deviceId } = apiDeviceContext
    const createEntityResult = await service.request(
      deviceId,
      buildPostEntityDataRequest({
        entityType: "contacts",
        data: data,
      })
    )
    if (createEntityResult.status === 200) {
      const enriched = withBodyStatus(createEntityResult)
      const entityData = PostEntityDataResponseValidator.parse(enriched.body)
      const id = entityData.data.contactId
      return id as string
    }
    return undefined
  }

  async function editContact(
    entityId: string,
    data: EntityData
  ): Promise<string | undefined> {
    const { service, deviceId } = apiDeviceContext
    const updateEntityResult = await service.request(
      deviceId,
      buildPatchEntityDataRequest({
        entityType: "contacts",
        entityId,
        data,
      })
    )
    if (updateEntityResult.status === 200) {
      const enriched = withBodyStatus(updateEntityResult)
      const entityData = PatchEntityDataResponseValidator.parse(enriched.body)
      const id = entityData.data.contactId
      return id as string
    }
    return undefined
  }
})
