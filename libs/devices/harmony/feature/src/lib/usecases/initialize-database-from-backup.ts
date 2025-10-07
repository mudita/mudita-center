/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { AppFileSystem } from "app-utils/renderer"
import { AppSql } from "app-sql/renderer"
import { Harmony } from "devices/harmony/models"
import { AppFileSystemGuardOptions } from "app-utils/models"
import { runHarmonyBackup } from "../api/run-harmony-backup"
import { getHarmonyInfo } from "../api/get-harmony-info"
import { downloadFileFromHarmony } from "./download-file-from-harmony"
import { waitUntilHarmonyBackupFinished } from "./wait-until-harmony-backup-finished"

const backupLocationDir = ["backup-sync", "harmony"]

export const getHarmonyBackupLocation = (
  fileName?: string
): AppFileSystemGuardOptions => {
  return {
    scopeRelativePath: fileName
      ? [...backupLocationDir, fileName]
      : backupLocationDir,
    scope: "userData",
  }
}

export interface Params {
  device: Harmony
  /** Exact database file name inside the backup archive, e.g., "quotes.db". */
  dbName: string
  /** Optional AppSql instance ID; if omitted, it will be derived from the file name. */
  dbInstanceName: string
}

export const initializeDatabaseFromBackup = async ({
  device,
  dbName,
  dbInstanceName,
}: Params): Promise<void> => {
  const harmonyInfoResponse = await getHarmonyInfo(device)

  if (!harmonyInfoResponse.ok) {
    throw new Error(`Failed to get device info: ${harmonyInfoResponse.status}`)
  }

  if (!harmonyInfoResponse.body.syncFilePath) {
    throw new Error("Device does not support syncFilePath")
  }

  const backupResponse = await runHarmonyBackup({ device })

  if (!backupResponse.ok) {
    throw new Error(`Failed to run backup: ${backupResponse.status}`)
  }

  const backupFinishedResponse = await waitUntilHarmonyBackupFinished(
    device,
    harmonyInfoResponse.body.syncFilePath
  )

  if (!backupFinishedResponse.ok) {
    throw new Error(
      `Failed to get backup status: ${backupFinishedResponse.status}`
    )
  }

  const fileLocation = getHarmonyBackupLocation(
    `${harmonyInfoResponse.body.serialNumber}.tar`
  )

  await downloadFileFromHarmony({
    device,
    fileLocation,
    targetPath: harmonyInfoResponse.body.syncFilePath,
  })

  const extractResponse = await AppFileSystem.extract({
    ...fileLocation,
    scopeDestinationPath: backupLocationDir,
  })

  if (!extractResponse.ok) {
    throw new Error(`Failed to extract backup: ${extractResponse.error}`)
  }

  const dbFileLocation = extractResponse.data.find(
    (extractedDbName) => path.basename(extractedDbName) === dbName
  )

  if (!dbFileLocation) {
    throw new Error(`Database file ${dbName} not found in backup.`)
  }

  const appSqlInitialize = await AppSql.initialize({
    ...getHarmonyBackupLocation(dbName),
    name: dbInstanceName,
  })

  if (!appSqlInitialize.ok) {
    throw new Error(`Failed to initialize database: ${appSqlInitialize.error}`)
  }

  await AppFileSystem.rm({
    scopeRelativePath: backupLocationDir,
    options: { recursive: true },
  })
}
