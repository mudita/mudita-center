/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppError,
  AppFailedResult,
  AppResultFactory,
  TransferProgress,
} from "app-utils/models"
import {
  FailedTransferErrorName,
  FailedTransferItem,
  TransferFilesActionType,
  TransferFilesParams,
  TransferMode,
} from "devices/common/models"
import { ApiDevice } from "devices/api-device/models"
import { mtpDownloadFiles } from "../mtp-download-files/mtp-download-files"
import { mtpUploadFiles } from "../mtp-upload-files/mtp-upload-files"
import { serialDownloadFiles } from "../serial-download-files/serial-download-files"
import { serialUploadFiles } from "../serial-upload-files/serial-upload-files"
import * as executeTransferModule from "./execute-transfer"
import { transferFiles } from "./transfer-files"
import { ApiDeviceMTPTransferErrorName } from "./transfer-files.types"

jest.mock("app-utils/renderer", () => ({
  AppFileSystem: {
    get: jest.fn().mockResolvedValue(undefined),
    set: jest.fn().mockResolvedValue(undefined),
  },
}))

jest.mock("../mtp-download-files/mtp-download-files")
jest.mock("../mtp-upload-files/mtp-upload-files")
jest.mock("../serial-download-files/serial-download-files")
jest.mock("../serial-upload-files/serial-upload-files")

const makeParams = (
  overrides: Partial<TransferFilesParams<ApiDevice>> = {}
): TransferFilesParams<ApiDevice> => ({
  device: {} as ApiDevice,
  action: TransferFilesActionType.Upload,
  files: [
    {
      id: "/a.txt",
      source: { type: "path", path: "/a.txt" },
      target: { type: "path", path: "/dev/a.txt" },
    },
    {
      id: "/b.txt",
      source: { type: "path", path: "/b.txt" },
      target: { type: "path", path: "/dev/b.txt" },
    },
  ],
  transferMode: TransferMode.Mtp,
  autoSwitchMTPMax: 0,
  abortController: new AbortController(),
  onProgress: undefined,
  onModeChange: undefined,
  ...overrides,
})

describe("transferFiles - core contract", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test("returns success when executor resolves with ok: true and no failed items (happy path)", async () => {
    const mockMtpUpload = mtpUploadFiles as jest.MockedFunction<
      typeof mtpUploadFiles
    >
    mockMtpUpload.mockResolvedValue(AppResultFactory.success({}))

    const params = makeParams({
      transferMode: TransferMode.Mtp,
      action: TransferFilesActionType.Upload,
    })

    const result = await transferFiles(params)

    expect(result.ok).toBe(true)
    expect(result.data).toEqual({})
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
  })

  test("returns partial success when executor resolves with ok: true and includes failed items (TransferUnknown case)", async () => {
    const failed: FailedTransferItem[] = [
      { id: "/a.txt", errorName: FailedTransferErrorName.Unknown },
    ]

    ;(mtpUploadFiles as jest.Mock).mockImplementation(async () =>
      AppResultFactory.success({ failed })
    )

    const params = makeParams({
      transferMode: TransferMode.Mtp,
      action: TransferFilesActionType.Upload,
    })

    const result = await transferFiles(params)

    expect(result.ok).toBe(true)
    expect(result.data).toEqual({ failed })
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
  })

  test("returns failed AppResult when all files failed (TransferUnknown for all files)", async () => {
    const failed: FailedTransferItem[] = [
      { id: "/a.txt", errorName: FailedTransferErrorName.Unknown },
      { id: "/b.txt", errorName: FailedTransferErrorName.Unknown },
    ]

    ;(mtpUploadFiles as jest.Mock).mockImplementation(async () =>
      AppResultFactory.success({ failed })
    )

    const params = makeParams({
      transferMode: TransferMode.Mtp,
      action: TransferFilesActionType.Upload,
    })

    const result = (await transferFiles(params)) as AppFailedResult<
      FailedTransferErrorName,
      { failed: typeof failed }
    >

    expect(result.ok).toBe(false)
    expect(result.error?.name).toBe(FailedTransferErrorName.Unknown)
    expect(result.data).toEqual({ failed })
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
  })

  test("returns partial success when executor resolves with TransferCancelled for a subset of files", async () => {
    const failed: FailedTransferItem[] = [
      { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
    ]

    ;(mtpUploadFiles as jest.Mock).mockImplementation(async () =>
      AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        {
          failed,
        }
      )
    )

    const params = makeParams({
      transferMode: TransferMode.Mtp,
      action: TransferFilesActionType.Upload,
    })
    const result = (await transferFiles(params)) as AppFailedResult<
      FailedTransferErrorName,
      { failed: typeof failed }
    >

    expect(result.ok).toBe(true)
    expect(result.data).toEqual({ failed })
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
  })

  test("returns failed AppResult when all files failed (TransferCancelled for all files)", async () => {
    const failed: FailedTransferItem[] = [
      { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
      { id: "/b.txt", errorName: FailedTransferErrorName.Aborted },
    ]

    ;(mtpUploadFiles as jest.Mock).mockImplementation(async () =>
      AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        {
          failed,
        }
      )
    )

    const params = makeParams({
      transferMode: TransferMode.Mtp,
      action: TransferFilesActionType.Upload,
    })
    const result = (await transferFiles(params)) as AppFailedResult<
      FailedTransferErrorName,
      { failed: typeof failed }
    >

    expect(result.ok).toBe(false)
    expect(result.error?.name).toBe(FailedTransferErrorName.Aborted)
    expect(result.data).toEqual({ failed })
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
  })

  test("returns failed AppResult when no executor strategy exists for the given mode and action", async () => {
    const params = makeParams({
      transferMode: TransferMode.Mtp,
      action: "NonExistingAction" as unknown as TransferFilesActionType,
    })

    const result = (await transferFiles(params)) as AppFailedResult<
      FailedTransferErrorName,
      { failed: FailedTransferItem[] }
    >

    expect(result.ok).toBe(false)
    expect(result.error?.name).toBe(FailedTransferErrorName.Unknown)
    expect(result.data?.failed).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          errorName: FailedTransferErrorName.Unknown,
        }),
      ])
    )

    expect(mtpUploadFiles).not.toHaveBeenCalled()
    expect(mtpDownloadFiles).not.toHaveBeenCalled()
    expect(serialUploadFiles).not.toHaveBeenCalled()
    expect(serialDownloadFiles).not.toHaveBeenCalled()
  })
})

describe("transferFiles - mode handling (auto-switch always enabled)", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test("defaults to MTP when transferMode is not provided", async () => {
    ;(mtpUploadFiles as jest.Mock).mockResolvedValue(
      AppResultFactory.success({})
    )

    const params = makeParams({
      action: TransferFilesActionType.Upload,
      transferMode: undefined as unknown as TransferMode,
    })

    const res = await transferFiles(params)

    expect(res.ok).toBe(true)
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
    expect(serialUploadFiles).not.toHaveBeenCalled()
  })

  test("uses provided transferMode=Serial when specified", async () => {
    ;(serialUploadFiles as jest.Mock).mockResolvedValue(
      AppResultFactory.success({})
    )

    const params = makeParams({
      action: TransferFilesActionType.Upload,
      transferMode: TransferMode.Serial,
    })

    const res = await transferFiles(params)

    expect(res.ok).toBe(true)
    expect(serialUploadFiles).toHaveBeenCalledTimes(1)
    expect(mtpUploadFiles).not.toHaveBeenCalled()
  })

  test("MTP start: on MtpInitializeAccessError → switches to Serial and succeeds (calls onModeChange once)", async () => {
    ;(mtpUploadFiles as jest.Mock).mockResolvedValue(
      AppResultFactory.failed(
        new AppError(
          "",
          ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
        ),
        {
          failed: [
            {
              id: "/a.txt",
              errorName: ApiDeviceMTPTransferErrorName.MtpInitializeAccessError,
            },
            {
              id: "/b.txt",
              errorName: ApiDeviceMTPTransferErrorName.MtpInitializeAccessError,
            },
          ],
        }
      )
    )
    ;(serialUploadFiles as jest.Mock).mockResolvedValue(
      AppResultFactory.success({})
    )

    const onModeChange = jest.fn()

    const watcherFactory = ({ onReconnect }: { onReconnect: () => void }) => ({
      start: () => onReconnect(),
      stop: jest.fn(),
    })

    const params = makeParams({
      transferMode: TransferMode.Mtp,
      action: TransferFilesActionType.Upload,
      onModeChange,
    })

    const result = await transferFiles(params, watcherFactory)

    expect(result.ok).toBe(true)
    expect(result.data).toEqual({})
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
    expect(serialUploadFiles).toHaveBeenCalledTimes(1)

    expect(onModeChange).toHaveBeenCalledTimes(1)
    expect(onModeChange).toHaveBeenCalledWith(TransferMode.Serial)
  })

  test("MTP start: after MtpInitializeAccessError retries only items that failed with that error (narrowed subset)", async () => {
    ;(mtpUploadFiles as jest.Mock)
      .mockResolvedValueOnce(
        AppResultFactory.failed(
          new AppError(
            "",
            ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
          ),
          {
            failed: [
              {
                id: "/a.txt",
                errorName:
                  ApiDeviceMTPTransferErrorName.MtpInitializeAccessError,
              },
              { id: "/b.txt", errorName: FailedTransferErrorName.Unknown },
            ],
          }
        )
      )
      .mockResolvedValueOnce(AppResultFactory.success({}))
    ;(serialUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.success({})
    )

    const onModeChange = jest.fn()

    const watcherFactory = ({ onReconnect }: { onReconnect: () => void }) => ({
      start: () => onReconnect(),
      stop: jest.fn(),
    })

    const params = makeParams({
      transferMode: TransferMode.Mtp,
      action: TransferFilesActionType.Upload,
      onModeChange,
    })

    const result = await transferFiles(params, watcherFactory)

    expect(result.ok).toBe(true)
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
    expect(serialUploadFiles).toHaveBeenCalledTimes(1)

    const serialCallArgs = (serialUploadFiles as jest.Mock).mock.calls[0][0]
    expect(serialCallArgs.files).toEqual([
      {
        id: "/a.txt",
        source: { path: "/a.txt", type: "path" },
        target: { path: "/dev/a.txt", type: "path" },
      },
    ])

    expect(onModeChange).toHaveBeenCalledTimes(1)
    expect(onModeChange).toHaveBeenCalledWith(TransferMode.Serial)
  })

  test("MTP start: aggregates failures from initial MtpInitializeAccessError attempt and subsequent retry failure", async () => {
    ;(mtpUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError(
          "",
          ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
        ),
        {
          failed: [
            {
              id: "/a.txt",
              errorName:
              ApiDeviceMTPTransferErrorName.MtpInitializeAccessError,
            },
            {
              id: "/b.txt",
              errorName: FailedTransferErrorName.Unknown,
            },
          ],
        }
      )
    )

    ;(serialUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Unknown),
        {
          failed: [
            {
              id: "/a.txt",
              errorName: FailedTransferErrorName.Unknown,
            },
          ],
        }
      )
    )

    const onModeChange = jest.fn()

    const watcherFactory = () => ({
      start: jest.fn(),
      stop: jest.fn(),
    })

    const result = (await transferFiles(
      makeParams({
        transferMode: TransferMode.Mtp,
        action: TransferFilesActionType.Upload,
        onModeChange,
      }),
      watcherFactory
    )) as AppFailedResult<
      FailedTransferErrorName,
      { failed: FailedTransferItem[] }
    >

    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
    expect(serialUploadFiles).toHaveBeenCalledTimes(1)

    expect(onModeChange).toHaveBeenCalledTimes(1)
    expect(onModeChange).toHaveBeenCalledWith(TransferMode.Serial)

    expect(result.ok).toBe(false)
    expect(result.error?.name).toBe(FailedTransferErrorName.Unknown)

    expect(result.data?.failed).toEqual([
      { id: "/b.txt", errorName: FailedTransferErrorName.Unknown },
      { id: "/a.txt", errorName: FailedTransferErrorName.Unknown },
    ])
  })

  test("Serial start: on Aborted → switches to MTP and succeeds", async () => {
    ;(serialUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        {
          failed: [
            { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
            { id: "/b.txt", errorName: FailedTransferErrorName.Aborted },
          ],
        }
      )
    )
    ;(mtpUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.success({})
    )

    const onModeChange = jest.fn()

    const watcherFactory = ({ onReconnect }: { onReconnect: () => void }) => ({
      start: () => onReconnect(),
      stop: jest.fn(),
    })

    const params = makeParams({
      transferMode: TransferMode.Serial,
      action: TransferFilesActionType.Upload,
      autoSwitchMTPMax: 1,
      onModeChange,
    })

    const result = await transferFiles(params, watcherFactory)

    expect(result.ok).toBe(true)
    expect(result.data).toEqual({})
    expect(serialUploadFiles).toHaveBeenCalledTimes(1)
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
    expect(onModeChange).toHaveBeenCalledTimes(1)
    expect(onModeChange).toHaveBeenCalledWith(TransferMode.Mtp)
  })

  test("auto-switch limit: flips are counted and capped by autoSwitchMTPMax (Serial→MTP→Serial→MTP)", async () => {
    ;(serialUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        {
          failed: [
            { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
            { id: "/b.txt", errorName: FailedTransferErrorName.Aborted },
          ],
        }
      )
    )
    ;(mtpUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError(
          "",
          ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
        ),
        {
          failed: [
            {
              id: "/a.txt",
              errorName: ApiDeviceMTPTransferErrorName.MtpInitializeAccessError,
            },
          ],
        }
      )
    )
    ;(serialUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        {
          failed: [
            { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
          ],
        }
      )
    )
    ;(mtpUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.success({})
    )

    const onModeChange = jest.fn()

    const params = makeParams({
      transferMode: TransferMode.Serial,
      action: TransferFilesActionType.Upload,
      autoSwitchMTPMax: 2,
      onModeChange,
    })

    const watcherFactory = ({ onReconnect }: { onReconnect: () => void }) => ({
      start: () => onReconnect(),
      stop: jest.fn(),
    })

    const result = await transferFiles(params, watcherFactory)

    expect(result.ok).toBe(true)
    expect(result.data).toEqual({})

    expect(serialUploadFiles).toHaveBeenCalledTimes(2)
    expect(mtpUploadFiles).toHaveBeenCalledTimes(2)

    expect(onModeChange).toHaveBeenCalledTimes(3)
    expect(onModeChange).toHaveBeenNthCalledWith(1, TransferMode.Mtp)
    expect(onModeChange).toHaveBeenNthCalledWith(2, TransferMode.Serial)
    expect(onModeChange).toHaveBeenNthCalledWith(3, TransferMode.Mtp)
  })

  test("auto-switch limit reached: stays in current mode after cap and succeeds", async () => {
    ;(serialUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        {
          failed: [
            { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
            { id: "/b.txt", errorName: FailedTransferErrorName.Aborted },
          ],
        }
      )
    )
    ;(mtpUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError(
          "",
          ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
        ),
        {
          failed: [
            {
              id: "/a.txt",
              errorName: ApiDeviceMTPTransferErrorName.MtpInitializeAccessError,
            },
          ],
        }
      )
    )
    ;(serialUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        {
          failed: [
            { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
          ],
        }
      )
    )
    ;(serialUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.success({})
    )

    const onModeChange = jest.fn()

    const params = makeParams({
      transferMode: TransferMode.Serial,
      action: TransferFilesActionType.Upload,
      autoSwitchMTPMax: 1,
      onModeChange,
    })

    const watcherFactory = ({ onReconnect }: { onReconnect: () => void }) => ({
      start: () => onReconnect(),
      stop: jest.fn(),
    })

    const result = await transferFiles(params, watcherFactory)

    expect(result.ok).toBe(true)
    expect(result.data).toEqual({})
    expect(serialUploadFiles).toHaveBeenCalledTimes(3)
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
    expect(onModeChange).toHaveBeenCalledTimes(2)
    expect(onModeChange).toHaveBeenNthCalledWith(1, TransferMode.Mtp)
    expect(onModeChange).toHaveBeenNthCalledWith(2, TransferMode.Serial)
  })

  test("initial MTP start is not counted as a flip (limit unaffected on first run)", async () => {
    ;(mtpUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError(
          "",
          ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
        ),
        {
          failed: [
            {
              id: "/a.txt",
              errorName: ApiDeviceMTPTransferErrorName.MtpInitializeAccessError,
            },
          ],
        }
      )
    )
    ;(serialUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        {
          failed: [
            { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
          ],
        }
      )
    )
    ;(mtpUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.success({})
    )

    const onModeChange = jest.fn()

    const params = makeParams({
      transferMode: TransferMode.Mtp,
      action: TransferFilesActionType.Upload,
      autoSwitchMTPMax: 1,
      onModeChange,
    })

    const watcherFactory = ({ onReconnect }: { onReconnect: () => void }) => ({
      start: () => onReconnect(),
      stop: jest.fn(),
    })

    const result = await transferFiles(params, watcherFactory)

    expect(result.ok).toBe(true)
    expect(result.data).toEqual({})

    expect(mtpUploadFiles).toHaveBeenCalledTimes(2)
    expect(serialUploadFiles).toHaveBeenCalledTimes(1)

    expect(onModeChange).toHaveBeenCalledTimes(2)
    expect(onModeChange).toHaveBeenNthCalledWith(1, TransferMode.Serial)
    expect(onModeChange).toHaveBeenNthCalledWith(2, TransferMode.Mtp)
  })

  test("Serial start: retries only items that failed with Aborted when switching to MTP (narrowed subset)", async () => {
    ;(serialUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        {
          failed: [
            { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
            { id: "/b.txt", errorName: FailedTransferErrorName.Unknown },
          ],
        }
      )
    )
    ;(mtpUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.success({})
    )

    const params = makeParams({
      transferMode: TransferMode.Serial,
      action: TransferFilesActionType.Upload,
      autoSwitchMTPMax: 1,
    })

    const watcherFactory = ({ onReconnect }: { onReconnect: () => void }) => ({
      start: () => onReconnect(),
      stop: jest.fn(),
    })

    const result = await transferFiles(params, watcherFactory)
    expect(result.ok).toBe(true)

    const mtpArgs = (mtpUploadFiles as jest.Mock).mock.calls[0][0]
    expect(mtpArgs.files).toEqual([
      {
        id: "/a.txt",
        source: { path: "/a.txt", type: "path" },
        target: { path: "/dev/a.txt", type: "path" },
      },
    ])
  })

  test("initialize error without switchable failures → returns Unknown and skips retry", async () => {
    ;(mtpUploadFiles as jest.Mock).mockResolvedValueOnce(
      AppResultFactory.failed(
        new AppError(
          "",
          ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
        ),
        {
          failed: [
            { id: "/a.txt", errorName: FailedTransferErrorName.Unknown },
          ],
        }
      )
    )

    const onModeChange = jest.fn()
    const params = makeParams({
      transferMode: TransferMode.Mtp,
      action: TransferFilesActionType.Upload,
      autoSwitchMTPMax: 1,
      onModeChange,
    })

    const result = (await transferFiles(params)) as AppFailedResult<
      ApiDeviceMTPTransferErrorName,
      { failed: FailedTransferItem[] }
    >

    expect(result.ok).toBe(true)
    expect(result.data?.failed).toEqual([
      {
        id: "/a.txt",
        errorName: FailedTransferErrorName.Unknown,
      },
    ])

    expect(serialUploadFiles).not.toHaveBeenCalled()

    expect(onModeChange).not.toHaveBeenCalled()

    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
  })
})

describe("transferFiles - progress reporting", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test("clamps per-file loaded bytes to a non-decreasing value (no backwards ticks)", async () => {
    const userOnProgress = jest.fn()

    ;(mtpUploadFiles as jest.Mock).mockImplementationOnce(async (args) => {
      args.onProgress({
        total: 200,
        file: { id: "/a.txt", size: 100, loaded: 40 },
      })
      args.onProgress({
        file: { id: "/a.txt", size: 100, loaded: 20 },
      })
      args.onProgress({
        file: { id: "/a.txt", size: 100, loaded: 80 },
      })
      return AppResultFactory.success({})
    })

    const result = await transferFiles(
      makeParams({ onProgress: userOnProgress, transferMode: TransferMode.Mtp })
    )

    expect(result.ok).toBe(true)
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)

    const payloads: TransferProgress[] = userOnProgress.mock.calls.map(
      (c) => c[0]
    )

    const fileLoads = payloads.filter((p) => p.file).map((p) => p.file?.loaded)
    expect(fileLoads).toEqual([40, 40, 80])

    const globals = payloads.map((p) => p.loaded)
    for (let i = 1; i < globals.length; i++) {
      expect(globals[i]).toBeGreaterThanOrEqual(globals[i - 1])
    }

    const totals = new Set(payloads.map((p) => p.total))
    expect(totals).toEqual(new Set([200]))
  })

  test("global progress is non-decreasing; total accepted from the first tick", async () => {
    const userOnProgress = jest.fn()

    ;(mtpUploadFiles as jest.Mock).mockImplementationOnce(async (args: any) => {
      args.onProgress({
        total: 300,
        file: { id: "/a.txt", size: 100, loaded: 50 },
      })

      args.onProgress({
        file: { id: "/b.txt", size: 200, loaded: 30 },
      })

      args.onProgress({
        file: { id: "/a.txt", size: 100, loaded: 10 },
      })

      args.onProgress({
        file: { id: "/b.txt", size: 200, loaded: 200 },
      })
      args.onProgress({
        file: { id: "/a.txt", size: 100, loaded: 100 },
      })

      args.onProgress({
        total: 999,
      })
      return AppResultFactory.success({})
    })

    const result = await transferFiles(
      makeParams({ onProgress: userOnProgress, transferMode: TransferMode.Mtp })
    )

    expect(result.ok).toBe(true)
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)

    const payloads: TransferProgress[] = userOnProgress.mock.calls.map(
      (c) => c[0]
    )

    const globals = payloads
      .filter((p) => typeof p.loaded === "number")
      .map((p) => p.loaded)
    expect(globals).toEqual([50, 80, 80, 250, 300, 300])

    const totals = new Set(
      payloads.filter((p) => typeof p.total === "number").map((p) => p.total)
    )
    expect(totals).toEqual(new Set([300]))

    payloads.forEach((p) => {
      expect(p.progress).toBeGreaterThanOrEqual(0)
      expect(p.progress).toBeLessThanOrEqual(100)
    })
  })

  test("emits global-only progress when tick has no file payload", async () => {
    const userOnProgress = jest.fn()

    ;(mtpUploadFiles as jest.Mock).mockImplementationOnce(async (args: any) => {
      args.onProgress({ total: 500 })

      args.onProgress({ file: { id: "/a.txt", size: 200, loaded: 100 } })
      args.onProgress({ file: { id: "/a.txt", size: 200, loaded: 200 } })
      args.onProgress({ file: { id: "/b.txt", size: 300, loaded: 300 } })
      return AppResultFactory.success({})
    })

    const result = await transferFiles(
      makeParams({ onProgress: userOnProgress, transferMode: TransferMode.Mtp })
    )

    expect(result.ok).toBe(true)
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)

    const payloads: TransferProgress[] = userOnProgress.mock.calls.map(
      (c) => c[0]
    )

    expect(payloads[0].file).toBeUndefined()
    expect(payloads[0].loaded).toBe(0)
    expect(payloads[0].total).toBe(500)
    expect(payloads[0].progress).toBe(0)

    const globals = payloads
      .filter((p) => typeof p.loaded === "number")
      .map((p) => p.loaded)

    for (let i = 1; i < globals.length; i++) {
      expect(globals[i]).toBeGreaterThanOrEqual(globals[i - 1])
    }

    const totals = new Set(
      payloads.filter((p) => typeof p.total === "number").map((p) => p.total)
    )
    expect(totals).toEqual(new Set([500]))
  })

  test("preserves accumulated bytes across retries/switches (no global reset on retry)", async () => {
    const userOnProgress = jest.fn()

    ;(mtpUploadFiles as jest.Mock).mockImplementationOnce(async (args: any) => {
      args.onProgress({
        total: 200,
        file: { id: "/a.txt", size: 100, loaded: 60 },
      })
      args.onProgress({ file: { id: "/b.txt", size: 100, loaded: 50 } })
      return AppResultFactory.failed(
        new AppError(
          "",
          ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
        ),
        {
          failed: [
            {
              id: "/a.txt",
              errorName: ApiDeviceMTPTransferErrorName.MtpInitializeAccessError,
            },
          ],
        }
      )
    })
    ;(serialUploadFiles as jest.Mock).mockImplementationOnce(async (args) => {
      args.onProgress({ file: { id: "/a.txt", size: 100, loaded: 10 } })
      args.onProgress({ file: { id: "/a.txt", size: 100, loaded: 100 } })
      return AppResultFactory.success({})
    })

    const watcherFactory = ({ onReconnect }: { onReconnect: () => void }) => ({
      start: () => onReconnect(),
      stop: jest.fn(),
    })

    const result = await transferFiles(
      makeParams({
        onProgress: userOnProgress,
        transferMode: TransferMode.Mtp,
      }),
      watcherFactory
    )

    expect(result.ok).toBe(true)
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
    expect(serialUploadFiles).toHaveBeenCalledTimes(1)

    const payloads: TransferProgress[] = userOnProgress.mock.calls.map(
      (c) => c[0]
    )

    const globals = payloads
      .filter((p) => typeof p.loaded === "number")
      .map((p) => p.loaded)
    for (let i = 1; i < globals.length; i++) {
      expect(globals[i]).toBeGreaterThanOrEqual(globals[i - 1])
    }

    expect(globals.at(-1)!).toBeGreaterThanOrEqual(150)

    const aLoads = payloads
      .filter((p) => p.file?.id === "/a.txt")
      .map((p) => p.file!.loaded)
    expect(aLoads).toEqual([60, 60, 100])

    const serialArgs = (serialUploadFiles as jest.Mock).mock.calls[0][0]
    expect(serialArgs.files).toEqual([
      {
        id: "/a.txt",
        source: { path: "/a.txt", type: "path" },
        target: { path: "/dev/a.txt", type: "path" },
      },
    ])

    const totals = new Set(
      payloads.filter((p) => typeof p.total === "number").map((p) => p.total)
    )
    expect(totals).toEqual(new Set([200]))
  })

  test("completes process progress to 100% on partial success (TransferUnknown failures)", async () => {
    const userOnProgress = jest.fn()

    ;(mtpUploadFiles as jest.Mock).mockImplementationOnce(async (args: any) => {
      args.onProgress({
        total: 300,
        file: { id: "/a.txt", size: 100, loaded: 100 },
      })
      args.onProgress({ file: { id: "/b.txt", size: 200, loaded: 150 } })
      return AppResultFactory.success({
        failed: [{ id: "/b.txt", errorName: FailedTransferErrorName.Unknown }],
      })
    })

    const result = await transferFiles(
      makeParams({ onProgress: userOnProgress, transferMode: TransferMode.Mtp })
    )

    console.log(result)

    expect(result.ok).toBe(true)

    const payloads: TransferProgress[] = userOnProgress.mock.calls.map(
      (c) => c[0]
    )
    const last = payloads.at(-1)!

    expect(last.total).toBe(300)
    expect(last.loaded).toBe(300)
    expect(last.progress).toBe(100)
  })
})

describe("transferFiles - abort behavior", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test("when AbortController is already aborted before start → delegates cancellation to the executor and returns TransferCancelled", async () => {
    const failed: FailedTransferItem[] = [
      { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
      { id: "/b.txt", errorName: FailedTransferErrorName.Aborted },
    ]

    ;(mtpUploadFiles as jest.Mock).mockImplementation(() => {
      return AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        { failed }
      )
    })

    const controller = new AbortController()
    controller.abort()

    const params = makeParams({
      abortController: controller,
      transferMode: TransferMode.Mtp,
      action: TransferFilesActionType.Upload,
    })

    const result = (await transferFiles(params)) as AppFailedResult<
      FailedTransferErrorName,
      { failed: typeof failed }
    >

    expect(mtpUploadFiles).toHaveBeenCalled()

    expect(result.ok).toBe(false)
    expect(result.error?.name as FailedTransferErrorName).toBe(
      FailedTransferErrorName.Aborted
    )
  })

  test("when executor returns TransferCancelled during execution → orchestrator stops without retry or mode change", async () => {
    const failed: FailedTransferItem[] = [
      { id: "/b.txt", errorName: FailedTransferErrorName.Aborted },
    ]

    ;(mtpUploadFiles as jest.Mock).mockImplementationOnce(async (args) => {
      args.onProgress({
        total: 300,
        file: { id: "/a.txt", size: 100, loaded: 40 },
      })
      args.onProgress({
        file: { id: "/a.txt", size: 100, loaded: 100 },
      })
      args.onProgress({
        file: { id: "/b.txt", size: 200, loaded: 60 },
      })

      return AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        {
          failed,
        }
      )
    })

    const onModeChange = jest.fn()

    const result = (await transferFiles(
      makeParams({
        transferMode: TransferMode.Mtp,
        action: TransferFilesActionType.Upload,
        onModeChange,
      })
    )) as AppFailedResult<FailedTransferErrorName, { failed: typeof failed }>

    console.log(result)

    expect(result.ok).toBe(true)

    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)
    expect(serialUploadFiles).not.toHaveBeenCalled()

    expect(onModeChange).not.toHaveBeenCalled()
  })

  test("propagates external abort to new internal AbortController after auto-switch", async () => {
    const controller = new AbortController()

      // 1. First attempt: Serial mode switched to MTP
    ;(serialUploadFiles as jest.Mock).mockImplementationOnce(async () => {
      const failed: FailedTransferItem[] = [
        { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
        { id: "/b.txt", errorName: FailedTransferErrorName.Aborted },
      ]

      return AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        { failed }
      )
    })

    // 2. second attempt: MTP mode receives aborted signal
    ;(mtpUploadFiles as jest.Mock).mockImplementationOnce(async (args: any) => {
      expect(args.abortController?.signal.aborted).toBe(true)

      const failed: FailedTransferItem[] = [
        { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
        { id: "/b.txt", errorName: FailedTransferErrorName.Aborted },
      ]

      return AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Aborted),
        { failed }
      )
    })

    // User aborts the operation during the transfer
    controller.abort()

    const onModeChange = jest.fn()

    const watcherFactory = ({ onReconnect }: { onReconnect: () => void }) => ({
      start: () => onReconnect(),
      stop: jest.fn(),
    })

    const result = (await transferFiles(
      makeParams({
        transferMode: TransferMode.Serial,
        action: TransferFilesActionType.Upload,
        autoSwitchMTPMax: 1,
        abortController: controller,
        onModeChange,
      }),
      watcherFactory
    )) as AppFailedResult<
      FailedTransferErrorName,
      { failed: FailedTransferItem[] }
    >

    expect(serialUploadFiles).toHaveBeenCalledTimes(1)
    expect(mtpUploadFiles).toHaveBeenCalledTimes(1)

    expect(onModeChange).toHaveBeenCalledTimes(1)
    expect(onModeChange).toHaveBeenCalledWith(TransferMode.Mtp)

    expect(result.ok).toBe(false)
    expect(result.error?.name).toBe(FailedTransferErrorName.Aborted)
    expect(result.data?.failed).toEqual([
      { id: "/a.txt", errorName: FailedTransferErrorName.Aborted },
      { id: "/b.txt", errorName: FailedTransferErrorName.Aborted },
    ])
  })
})

describe("transferFiles - error propagation", () => {
  test("marks all pending files as Unknown and preserves previously failed items when executeTransfer throws", async () => {
    const executeTransferSpy = jest
      .spyOn(executeTransferModule, "executeTransfer")
      .mockResolvedValueOnce(
        AppResultFactory.failed(
          new AppError(
            "",
            ApiDeviceMTPTransferErrorName.MtpInitializeAccessError
          ),
          {
            failed: [
              {
                id: "/a.txt",
                errorName:
                  ApiDeviceMTPTransferErrorName.MtpInitializeAccessError,
              },
              {
                id: "/b.txt",
                errorName: FailedTransferErrorName.Unknown,
              },
            ],
          }
        )
      )
      .mockImplementationOnce(async () => {
        throw new Error("executeTransfer boom")
      })

    const watcherFactory = () => ({
      start: jest.fn(),
      stop: jest.fn(),
    })

    const result = (await transferFiles(
      makeParams({
        transferMode: TransferMode.Mtp,
        action: TransferFilesActionType.Upload,
      }),
      watcherFactory
    )) as AppFailedResult<
      FailedTransferErrorName,
      { failed: FailedTransferItem[] }
    >

    expect(executeTransferSpy).toHaveBeenCalledTimes(2)

    expect(result.ok).toBe(false)
    expect(result.error?.name).toBe(FailedTransferErrorName.Unknown)

    expect(result.data?.failed).toEqual([
      { id: "/b.txt", errorName: FailedTransferErrorName.Unknown },
      { id: "/a.txt", errorName: FailedTransferErrorName.Unknown },
    ])

    executeTransferSpy.mockRestore()
  })
})
