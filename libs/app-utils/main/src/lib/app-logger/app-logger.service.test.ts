/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import path from "path"
import { AppFailedResult } from "app-utils/models"
import { AppFileSystemService } from "../app-file-system/app-file-system.service"
import { AppLoggerService } from "./app-logger.service"

jest.mock("fs-extra")

type FileMap = Record<string, Buffer>

let appLoggerService = new AppLoggerService(
  new AppFileSystemService({
    resolveSafePath: jest.fn().mockImplementation(() => "/fake/dest.log"),
  } as any)
)

const createFakeFileMap = (): FileMap => ({
  "a.log": Buffer.from("123456789"),
  "b.log": Buffer.from("BBBBBB"),
  "c.log": Buffer.from("CCCCCCCCCC"),
})

const setupFsMocks = (fileMap: FileMap, logsDir: string) => {
  appLoggerService = new AppLoggerService(
    new AppFileSystemService({
      resolveSafePath: jest
        .fn()
        .mockImplementation(({ scope }) =>
          scope ? logsDir : "/fake/dest.log"
        ),
    } as any)
  )
  ;(fs.readdir as jest.Mock).mockResolvedValue(Object.keys(fileMap))
  ;(fs.stat as jest.Mock).mockImplementation(async (filePath: string) => {
    const name = path.basename(filePath)
    const index = Object.keys(fileMap).indexOf(name)
    const size = fileMap[name]?.length ?? 0
    return { birthtimeMs: index, size }
  })

  const handles: Record<string, unknown> = {}
  Object.entries(fileMap).forEach(([name, buf]) => {
    handles[name] = {
      read: jest.fn(async (chunk: Buffer, _offset: number, length: number) => {
        const start = buf.length - length
        const segment = buf.subarray(start)
        segment.copy(chunk, 0)
        return { bytesRead: segment.length, buffer: chunk }
      }),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      close: jest.fn(async () => {}),
    }
  })
  ;(fs.promises.open as jest.Mock).mockImplementation(
    async (filePath: string) => {
      const name = path.basename(filePath)
      return handles[name]
    }
  )
}

describe("AppLoggerService.buildTrimmedLogsBuffer", () => {
  const logsDirectory = "/fake/logs"
  let fileMap: FileMap

  beforeEach(() => {
    jest.resetAllMocks()
    fileMap = createFakeFileMap()
    setupFsMocks(fileMap, logsDirectory)
  })

  it("should return an empty buffer when no log files are found", async () => {
    ;(fs.readdir as jest.Mock).mockResolvedValue([])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await (appLoggerService as any).buildTrimmedLogsBuffer(
      logsDirectory,
      [],
      100
    )
    expect(buffer).toEqual(Buffer.alloc(0))
  })

  it("should read full content when total size is under the maximum", async () => {
    const logs = [
      { name: "a.log", birthtimeMs: 0, size: fileMap["a.log"].length },
      { name: "b.log", birthtimeMs: 1, size: fileMap["b.log"].length },
    ]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await (appLoggerService as any).buildTrimmedLogsBuffer(
      logsDirectory,
      logs,
      100
    )
    const expected = Buffer.concat([
      Buffer.from(`\n========== a.log ==========\n`),
      fileMap["a.log"],
      Buffer.from(`\n========== b.log ==========\n`),
      fileMap["b.log"],
    ])
    expect(buffer).toEqual(expected)
  })

  it("should trim the oldest log first when maxSize cuts through earliest files", async () => {
    const logs = [
      { name: "a.log", birthtimeMs: 0, size: fileMap["a.log"].length },
      { name: "b.log", birthtimeMs: 1, size: fileMap["b.log"].length },
      { name: "c.log", birthtimeMs: 2, size: fileMap["c.log"].length },
    ]
    const half = Math.floor(fileMap["a.log"].length / 2)
    const expected = Buffer.concat([
      Buffer.from(`\n========== a.log ==========\n`),
      fileMap["a.log"].subarray(fileMap["a.log"].length - half),
      Buffer.from(`\n========== b.log ==========\n`),
      fileMap["b.log"],
      Buffer.from(`\n========== c.log ==========\n`),
      fileMap["c.log"],
    ])
    const maxSize = expected.length

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await (appLoggerService as any).buildTrimmedLogsBuffer(
      logsDirectory,
      logs,
      maxSize
    )

    expect(buffer).toEqual(expected)
  })

  it("should stop processing when no space remains for dividers", async () => {
    const logs = [
      { name: "a.log", birthtimeMs: 0, size: fileMap["a.log"].length },
    ]
    const dividerLen = Buffer.byteLength(`\n========== a.log ==========\n`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await (appLoggerService as any).buildTrimmedLogsBuffer(
      logsDirectory,
      logs,
      dividerLen - 1
    )
    expect(buffer).toEqual(Buffer.alloc(0))
  })
})

describe("AppLoggerService.aggregateLogsToFile", () => {
  const logsDirectory = "/fake/logs"
  const destinationPath = "/fake/dest.log"

  beforeEach(() => {
    jest.resetAllMocks()
    appLoggerService = new AppLoggerService(
      new AppFileSystemService({
        resolveSafePath: jest
          .fn()
          .mockImplementation(({ scope }) =>
            scope ? logsDirectory : destinationPath
          ),
      } as any)
    )
    ;(fs.readdir as jest.Mock).mockResolvedValue(["a.log"])
    ;(fs.stat as jest.Mock).mockResolvedValue({ birthtimeMs: 0, size: 1 })
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn(AppLoggerService.prototype as any, "buildTrimmedLogsBuffer")
      .mockResolvedValue(Buffer.from("X"))
    ;(fs.writeFile as jest.Mock).mockResolvedValue(undefined)
  })

  it("should write the aggregated logs to file on success", async () => {
    const result = await appLoggerService.aggregateLogsToFile({
      maxSizeInBytes: 10,
      scopeRelativePath: "scope.log",
    })
    expect(fs.writeFile).toHaveBeenCalledWith(
      destinationPath,
      Buffer.from("X"),
      "utf-8"
    )
    expect(result.ok).toBe(true)
  })

  it("should return a failed result if an error occurs during aggregation", async () => {
    const err = new Error("fail")
    ;(fs.readdir as jest.Mock).mockRejectedValue(err)
    const result = await appLoggerService.aggregateLogsToFile({
      maxSizeInBytes: 10,
      scopeRelativePath: "scope.log",
    })
    expect(result.ok).toBe(false)
    expect((result as AppFailedResult).error.message).toBe(err.message)
  })
})
