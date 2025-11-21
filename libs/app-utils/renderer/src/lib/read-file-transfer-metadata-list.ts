/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FailedTransferItem,
  TransferFileFromPathEntry,
} from "devices/common/models"
import { AppFileSystemGuardOptions } from "app-utils/models"
import { AppFileSystem } from "./app-file-system"

export enum ReadFileTransferMetadataErrorName {
  Aborted = "Aborted",
  FileReadError = "FileReadError",
  Crc32Error = "Crc32Error",
}

export interface FileTransferMetadata {
  fileSize: number // fs size
  crc32: string
}

export type TransferFileEntryWithMetadata = TransferFileFromPathEntry &
  FileTransferMetadata

export async function readFileTransferMetadataList(
  files: TransferFileFromPathEntry[],
  abortController: AbortController
): Promise<{
  files: TransferFileEntryWithMetadata[]
  failed: FailedTransferItem[]
}> {
  const fileEntryWithMetadata: TransferFileEntryWithMetadata[] = []
  const failed: FailedTransferItem[] = []

  for (const file of files) {
    try {
      if (abortController.signal.aborted) {
        failed.push({
          id: file.id,
          errorName: ReadFileTransferMetadataErrorName.Aborted,
        })
        continue
      }
      const meta = await readFileTransferMetadata(file.source.fileLocation)
      fileEntryWithMetadata.push({
        ...file,
        ...meta,
      })
    } catch (e: unknown) {
      const errorName =
        getEnumErrorName(ReadFileTransferMetadataErrorName, e) ??
        ReadFileTransferMetadataErrorName.FileReadError

      failed.push({
        id: file.id,
        errorName,
      })
    }
  }

  return { files: fileEntryWithMetadata, failed }
}

export async function readFileTransferMetadata(
  options: AppFileSystemGuardOptions
): Promise<FileTransferMetadata> {
  const crc32Response = await AppFileSystem.calculateFileCrc32(options)
  if (!crc32Response.ok) {
    throw ReadFileTransferMetadataErrorName.Crc32Error
  }

  const fileStats = await AppFileSystem.fileStats(options)
  if (!fileStats.ok) {
    throw ReadFileTransferMetadataErrorName.FileReadError
  }

  return {
    fileSize: fileStats.data.size,
    crc32: crc32Response.data,
  }
}

export function getEnumErrorName<T extends Record<string, string>>(
  enumType: T,
  value: unknown
): T[keyof T] | undefined {
  return Object.values(enumType).includes(value as T[keyof T])
    ? (value as T[keyof T])
    : undefined
}
