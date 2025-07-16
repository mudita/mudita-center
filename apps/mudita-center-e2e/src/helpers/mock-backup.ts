/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "../../../../libs/e2e-mock/client/src"
import { prepareMockForFileTransfer } from "./prepare-mock-for-file-transfer.helper"
import * as fs from "fs"
import * as path from "path"
import * as os from "node:os"
import { existsSync, mkdirSync } from "fs"

export function mockBackupResponses(path: string, shouldFail = false) {
  const data = "1234567890"

  // mockBackupResponses("path-1", true) // use in test to force backup error
  // mockBackupResponses("path-1")       // default -> success backup

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
      delay: 6000,
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
// - Windows: `C:\Users\<username>\AppData\Roaming\@mudita\mudita-center-app`
// - Linux: `~/.config/@mudita/mudita-center-app`
// - macOS: `~/Library/Application Support/@mudita/mudita-center-app`
// pure / phone / backups
function getUserConfigDir() {
  const home = os.homedir()

  let userConfigDir = ""
  switch (process.platform) {
    case "win32":
      // On Windows, %APPDATA% typically points to C:\Users\<user>\AppData\Roaming
      userConfigDir =
        process.env.APPDATA || path.join(home, "AppData", "Roaming")
      break

    case "darwin":
      // On macOS, ~/Library/Application Support
      userConfigDir = path.join(home, "Library", "Application Support")
      break

    default:
      // Linux & other UNIXes: respect XDG_CONFIG_HOME, fallback to ~/.config
      userConfigDir = process.env.XDG_CONFIG_HOME || path.join(home, ".config")
      break
  }
  return path.join(
    userConfigDir,
    "@mudita",
    "mudita-center-app",
    "pure",
    "phone",
    "backups"
  )
}

const getBackupOutputPath = async (): Promise<string> => {
  const backupLocation = getUserConfigDir()
  console.log("backupLocation", backupLocation)
  return backupLocation
}

export const createMockBackup = async (serialNumber: string): Promise<void> => {
  const osBackupLocation = await getBackupOutputPath()
  const backupLocation = path.join(osBackupLocation, "3310-2006")
  if (!existsSync(backupLocation)) {
    mkdirSync(backupLocation, { recursive: true })
  }

  const timestamp = Date.now()
  const fileName = `${timestamp}_${serialNumber}.mcbackup`
  const filePath = path.join(backupLocation, fileName)

  const content = {
    header: {
      vendorId: "3310",
      productId: "2006",
      serialNumber: serialNumber,
      appVersion: "3.0.1",
    },
    data: {
      CONTACT_LIST: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
      CALL_LOG: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
      MESSAGES: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
      NOTES: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
      CALENDAR_EVENTS: "eyJkYXRhIjoiMTIzNDU2Nzg5MCJ9",
    },
  }

  // fs.mkdirSync(backupLocation, { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf8")
  console.log(`File stored at: ${filePath}`)
}

export const deleteMockBackups = async (
  serialNumber: string
): Promise<void> => {
  const osBackupLocation = await getBackupOutputPath()
  const backupLocation = path.join(osBackupLocation, "3310-2006")

  if (!fs.existsSync(backupLocation)) {
    return
  }

  const files = fs.readdirSync(backupLocation)

  const filesToDelete = files.filter((file) =>
    file.endsWith(`_${serialNumber}.mcbackup`)
  )

  for (const file of filesToDelete) {
    const filePath = path.join(backupLocation, file)
    fs.unlinkSync(filePath)
    console.log(`Deleted backup: ${filePath}`)
  }

  if (filesToDelete.length === 0) {
    console.log(`No backups found for serialNumber: ${serialNumber}`)
  }
}
