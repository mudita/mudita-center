/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "../../../../libs/e2e-mock/client/src"
import { generateUniqueNumber } from "./utils/generate-unique-number-id.helper"
import { generateBase64Info } from "./utils/generate-base-64-info.helper"
import { prepareMockForFileTransfer } from "./prepare-mock-for-file-transfer.helper"

export function mockBackupResponses(path: string, shouldFail = false) {
  const data = "1234567890"

  //   mockBackupResponses("path-1", true) // use in test to force backup error
  //

  // mockBackupResponses("path-1") // default -> success backup

  if (shouldFail) {
    // Simulate backup failure due to full storage
    E2EMockClient.mockResponsesOnce([
      {
        path,
        endpoint: "POST_BACKUP",
        method: "POST",
        status: 507,
        body: {
          error: "DEVICE_STORAGE_FULL",
        },
      },
    ])
    return
  }

  // Default successful backup mocks
  E2EMockClient.mockResponses([
    {
      path,
      body: { backupId: 12345, progress: 10 },
      match: {
        expected: {
          backupId: "__ANY__",
          features: "__ANY__",
        },
      },
      endpoint: "PRE_BACKUP",
      method: "POST",
      status: 202,
    },
    {
      path,
      body: {
        backupId: 12345,
        features: {
          CONTACT_LIST: "path/to/backup/CONTACT_LIST",
          CALL_LOG: "path/to/backup/CALL_LOG",
          MESSAGES: "path/to/backup/MESSAGES",
          NOTES: "path/to/backup/NOTES",
          CALENDAR_EVENTS: "path/to/backup/CALENDAR_EVENTS",
          OS_VERSION_AND_SETTINGS: "path/to/backup/OS_VERSION_AND_SETTINGS",
          APP_SETTINGS: "path/to/backup/APP_SETTINGS",
        },
        progress: 100,
      },
      match: {
        expected: {
          backupId: 12345,
        },
      },
      endpoint: "PRE_BACKUP",
      method: "GET",
      status: 200,
    },
  ])

  E2EMockClient.mockResponses(
    prepareMockForFileTransfer(path, data, "path/to/backup/CONTACT_LIST")
  )
  E2EMockClient.mockResponses(
    prepareMockForFileTransfer(path, data, "path/to/backup/CALL_LOG")
  )
  E2EMockClient.mockResponses(
    prepareMockForFileTransfer(path, data, "path/to/backup/MESSAGES")
  )
  E2EMockClient.mockResponses(
    prepareMockForFileTransfer(path, data, "path/to/backup/NOTES")
  )
  E2EMockClient.mockResponses(
    prepareMockForFileTransfer(path, data, "path/to/backup/CALENDAR_EVENTS")
  )
  E2EMockClient.mockResponses(
    prepareMockForFileTransfer(
      path,
      data,
      "path/to/backup/OS_VERSION_AND_SETTINGS"
    )
  )
  E2EMockClient.mockResponses(
    prepareMockForFileTransfer(path, data, "path/to/backup/APP_SETTINGS")
  )
}
