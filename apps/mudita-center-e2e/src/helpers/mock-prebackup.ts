/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "../../../../libs/e2e-mock/client/src"
import { generateUniqueNumber } from "./utils/generate-unique-number-id.helper"
import { generateBase64Info } from "./utils/generate-base-64-info.helper"

// Helper function to mock PRE_BACKUP responses
export function mockPreBackupResponses(path: string) {
  // Mock initial PRE_BACKUP response with status 202 (processing)
  const data = "1234567890"
  const { base64, sizeInBytes, crc32Hex } = generateBase64Info({ data })
  const contactsTransferId = generateUniqueNumber()
  const callLogTransferId = generateUniqueNumber()

  E2EMockClient.mockResponses([
    {
      path,
      body: { backupId: 12345, progress: 0 },
      match: {
        expected: {
          backupId: 12345,
          features: ["CONTACTS_V1", "CALL_LOGS_V1"],
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
          CONTACTS_V1: "path/to/backup/calls.json",
          CALL_LOGS_V1: "path/to/backup/call_logs.json",
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
    {
      path,
      body: {
        transferId: contactsTransferId,
        chunkSize: sizeInBytes,
        fileSize: sizeInBytes,
        crc32: crc32Hex,
      },
      match: {
        expected: {
          filePath: "path/to/backup/calls.json",
        },
      },
      endpoint: "PRE_FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        transferId: contactsTransferId,
        chunkNumber: 1,
        data: base64,
      },
      match: {
        expected: {
          transferId: contactsTransferId,
          chunkNumber: 1,
        },
      },
      endpoint: "FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        transferId: callLogTransferId,
        chunkSize: sizeInBytes,
        fileSize: sizeInBytes,
        crc32: crc32Hex,
      },
      match: {
        expected: {
          filePath: "path/to/backup/call_logs.json",
        },
      },
      endpoint: "PRE_FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        transferId: callLogTransferId,
        chunkNumber: 1,
        data: base64,
      },
      match: {
        expected: {
          transferId: callLogTransferId,
          chunkNumber: 1,
        },
      },
      endpoint: "FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
  ])

  // After 10 seconds, update the response to status 200 (completed)
  //   setTimeout(() => {
  //     E2EMockClient.mockResponse({
  //       path,
  //       endpoint: "PRE_BACKUP",
  //       method: "POST",
  //       status: 200,
  //       body: {
  //         backupId,
  //         features: {
  //           CONTACTS_V1: "path/to/backup/calls.json",
  //           CALL_LOGS_V1: "path/to/backup/call_logs.json",
  //         },
  //       },
  //     })
  //   }, 10000)
}
