/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FailedTransferErrorName,
  FailedTransferItem,
  TransferFilesActionType,
} from "devices/common/models"
import {
  getTransferFailedModalContent,
  ManageFilesTransferFailedModalMessages,
} from "./manage-files-transfer-failed.copy"

jest.mock("app-localize/utils", () => ({
  formatMessage: (msg: { id: string }, vars?: Record<string, unknown>) =>
    vars ? `${msg.id} ${JSON.stringify(vars)}` : msg.id,
}))

jest.mock("app-theme/ui", () => ({
  formatBytes: (n: number) => `${n} MB`,
}))

const createFailedFile = (
  id: string,
  errorName: FailedTransferErrorName,
  values?: Record<string, string | number>
): FailedTransferItem => ({
  id,
  errorName,
  values,
})

const createMessages = (): ManageFilesTransferFailedModalMessages =>
  ({
    uploadFailedAllModalTitle: { id: "title.all" },
    uploadFailedSomeModalTitle: { id: "title.some" },
    uploadFailedAllModalDescription: { id: "description.all" },
    uploadFailedSomeModalDescription: { id: "description.some" },

    uploadFailedAllUnknownError: { id: "all.reason.unknown" },
    uploadFailedAllDuplicatesError: { id: "all.reason.duplicates" },
    uploadFailedAllNotEnoughMemoryError: { id: "all.reason.notEnoughMemory" },
    uploadFailedAllFileTooLargeError: { id: "all.reason.fileTooLarge" },

    uploadFailedErrorLabelUploadUnknown: { id: "label.uploadUnknown" },
    uploadFailedErrorLabelExportUnknown: { id: "label.exportUnknown" },
    uploadFailedErrorLabelDuplicate: { id: "label.duplicate" },
    uploadFailedErrorLabelCancelled: { id: "label.cancelled" },
    uploadFailedErrorLabelTooBig: { id: "label.tooBig" },
    uploadFailedErrorLabelFileTooLarge: { id: "label.fileTooLarge" },

    uploadFailedModalCloseButtonText: { id: "button.close" },
  }) as unknown as ManageFilesTransferFailedModalMessages

describe("getTransferFailedModalContent", () => {
  test("SOME: Duplicate → base description", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [createFailedFile("a", FailedTransferErrorName.Duplicate)],
      total: 3,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(false)
    expect(result.onlySingleReason).toBe(false)
    expect(result.title).toBe("title.some")
    expect(result.description).toBe(
      `description.some ${JSON.stringify({ failedCount: 1, succeededCount: 2 })}`
    )
  })

  test("SOME: NotEnoughMemory → base description", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [
        createFailedFile("a", FailedTransferErrorName.NotEnoughMemory),
      ],
      total: 2,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(false)
    expect(result.onlySingleReason).toBe(false)
    expect(result.description).toBe(
      `description.some ${JSON.stringify({ failedCount: 1, succeededCount: 1 })}`
    )
  })

  test("SOME: FileTooLarge → base description", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [
        createFailedFile("x", FailedTransferErrorName.FileTooLarge),
      ],
      total: 2,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(false)
    expect(result.onlySingleReason).toBe(false)
    expect(result.description).toBe(
      `description.some ${JSON.stringify({ failedCount: 1, succeededCount: 1 })}`
    )
  })

  test("SOME: UploadUnknown → base description", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [createFailedFile("u", FailedTransferErrorName.Unknown)],
      total: 2,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(false)
    expect(result.onlySingleReason).toBe(false)
    expect(result.description).toBe(
      `description.some ${JSON.stringify({ failedCount: 1, succeededCount: 1 })}`
    )
  })

  test("SOME: Cancelled → base description", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [createFailedFile("c", FailedTransferErrorName.Aborted)],
      total: 2,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(false)
    expect(result.onlySingleReason).toBe(false)
    expect(result.description).toBe(
      `description.some ${JSON.stringify({ failedCount: 1, succeededCount: 1 })}`
    )
  })

  test("SOME: multiple different reasons → base description", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [
        createFailedFile("a", FailedTransferErrorName.Duplicate),
        createFailedFile("b", FailedTransferErrorName.FileTooLarge),
      ],
      total: 4,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(false)
    expect(result.onlySingleReason).toBe(false)
    expect(result.description).toBe(
      `description.some ${JSON.stringify({ failedCount: 2, succeededCount: 2 })}`
    )
  })

  test("ALL: Duplicate only → specific message", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [
        createFailedFile("a", FailedTransferErrorName.Duplicate),
        createFailedFile("b", FailedTransferErrorName.Duplicate),
      ],
      total: 2,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(true)
    expect(result.onlySingleReason).toBe(true)
    expect(result.description).toBe(
      `all.reason.duplicates ${JSON.stringify({ filesCount: 2 })}`
    )
  })

  test("ALL: NotEnoughMemory with numeric memory → specific message", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [
        createFailedFile("a", FailedTransferErrorName.NotEnoughMemory, {
          memory: 256,
        }),
        createFailedFile("b", FailedTransferErrorName.NotEnoughMemory, {
          memory: 256,
        }),
      ],
      total: 2,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(true)
    expect(result.onlySingleReason).toBe(true)
    expect(result.description).toBe(
      `all.reason.notEnoughMemory ${JSON.stringify({ filesCount: 2, memory: "256 MB" })}`
    )
  })

  test("ALL: FileTooLarge only → specific message", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [
        createFailedFile("x", FailedTransferErrorName.FileTooLarge),
      ],
      total: 1,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(true)
    expect(result.onlySingleReason).toBe(true)
    expect(result.description).toBe(
      `all.reason.fileTooLarge ${JSON.stringify({ filesCount: 1 })}`
    )
  })

  test("ALL: UploadUnknown only → fallback unknown", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [createFailedFile("u", FailedTransferErrorName.Unknown)],
      total: 1,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(true)
    expect(result.onlySingleReason).toBe(true)
    expect(result.description).toBe("all.reason.unknown")
  })

  test("ALL: Cancelled only → fallback unknown", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [createFailedFile("c", FailedTransferErrorName.Aborted)],
      total: 1,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(true)
    expect(result.onlySingleReason).toBe(true)
    expect(result.description).toBe("all.reason.unknown")
  })

  test("ALL: multiple mixed reasons → fallback unknown", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [
        createFailedFile("a", FailedTransferErrorName.Duplicate),
        createFailedFile("b", FailedTransferErrorName.NotEnoughMemory),
        createFailedFile("c", FailedTransferErrorName.FileTooLarge),
      ],
      total: 3,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(true)
    expect(result.onlySingleReason).toBe(false)
    expect(result.description).toBe("all.reason.unknown")
  })

  test("SOME: zero failed → treated as SOME", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [],
      total: 3,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(false)
    expect(result.description).toBe(
      `description.some ${JSON.stringify({ failedCount: 0, succeededCount: 3 })}`
    )
  })

  test("total === 0 → treated as SOME (avoid division by zero)", () => {
    const messages = createMessages()
    const result = getTransferFailedModalContent({
      failedFiles: [],
      total: 0,
      messages,
      actionType: TransferFilesActionType.Upload,
    })

    expect(result.isAllFailed).toBe(false)
    expect(result.description).toBe(
      `description.some ${JSON.stringify({ failedCount: 0, succeededCount: 0 })}`
    )
  })
})
