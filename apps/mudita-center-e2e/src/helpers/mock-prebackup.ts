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
  const messagesTransferId = generateUniqueNumber()
  const notesTransferId = generateUniqueNumber()
  const calendarEventsTransferId = generateUniqueNumber()
  const osVersionAndSettingsTransferId = generateUniqueNumber()
  const appSettingsTransferId = generateUniqueNumber()

  E2EMockClient.mockResponses([
    {
      path,
      body: { backupId: 12345, progress: 10 },
      match: {
        expected: {
          backupId: 12345,
          features: [
            "CONTACT_LIST",
            "CALL_LOG",
            "MESSAGES",
            "NOTES",
            "CALENDAR_EVENTS",
            "OS_VERSION_AND_SETTINGS",
            "APP_SETTINGS",
          ],
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
    // CONTACTS
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
          filePath: "path/to/backup/CONTACT_LIST",
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
    // CALL LOG
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
          filePath: "path/to/backup/CALL_LOG",
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
    // MESSAGES
    {
      path,
      body: {
        transferId: messagesTransferId,
        chunkSize: sizeInBytes,
        fileSize: sizeInBytes,
        crc32: crc32Hex,
      },
      match: {
        expected: {
          filePath: "path/to/backup/MESSAGES",
        },
      },
      endpoint: "PRE_FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        transferId: messagesTransferId,
        chunkNumber: 1,
        data: base64,
      },
      match: {
        expected: {
          transferId: messagesTransferId,
          chunkNumber: 1,
        },
      },
      endpoint: "FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    // NOTES
    {
      path,
      body: {
        transferId: notesTransferId,
        chunkSize: sizeInBytes,
        fileSize: sizeInBytes,
        crc32: crc32Hex,
      },
      match: {
        expected: {
          filePath: "path/to/backup/NOTES",
        },
      },
      endpoint: "PRE_FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        transferId: notesTransferId,
        chunkNumber: 1,
        data: base64,
      },
      match: {
        expected: {
          transferId: notesTransferId,
          chunkNumber: 1,
        },
      },
      endpoint: "FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    // CALENDAR_EVENTS
    {
      path,
      body: {
        transferId: calendarEventsTransferId,
        chunkSize: sizeInBytes,
        fileSize: sizeInBytes,
        crc32: crc32Hex,
      },
      match: {
        expected: {
          filePath: "path/to/backup/CALENDAR_EVENTS",
        },
      },
      endpoint: "PRE_FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        transferId: calendarEventsTransferId,
        chunkNumber: 1,
        data: base64,
      },
      match: {
        expected: {
          transferId: calendarEventsTransferId,
          chunkNumber: 1,
        },
      },
      endpoint: "FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    // OS_VERSION_AND_SETTINGS
    {
      path,
      body: {
        transferId: osVersionAndSettingsTransferId,
        chunkSize: sizeInBytes,
        fileSize: sizeInBytes,
        crc32: crc32Hex,
      },
      match: {
        expected: {
          filePath: "path/to/backup/OS_VERSION_AND_SETTINGS",
        },
      },
      endpoint: "PRE_FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        transferId: osVersionAndSettingsTransferId,
        chunkNumber: 1,
        data: base64,
      },
      match: {
        expected: {
          transferId: osVersionAndSettingsTransferId,
          chunkNumber: 1,
        },
      },
      endpoint: "FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    // APP_SETTINGS
    {
      path,
      body: {
        transferId: appSettingsTransferId,
        chunkSize: sizeInBytes,
        fileSize: sizeInBytes,
        crc32: crc32Hex,
      },
      match: {
        expected: {
          filePath:
            "/data/user/0/com.mudita.muditacenter/files/backups/APP_SETTINGS",
        },
      },
      endpoint: "PRE_FILE_TRANSFER",
      method: "GET",
      status: 200,
    },
    {
      path,
      body: {
        transferId: appSettingsTransferId,
        chunkNumber: 1,
        data: base64,
      },
      match: {
        expected: {
          transferId: appSettingsTransferId,
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
