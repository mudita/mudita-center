/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import logger from "electron-log"
import { AppLogger } from "./app-logger"

jest.mock("electron-log", () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    verbose: jest.fn(),
    debug: jest.fn(),
    silly: jest.fn(),
    transports: {},
  },
}))

type Transports = Record<string, { level?: string | false } | undefined>

const transports = () => logger.transports as unknown as Transports

const setTransports = (next: Transports) => {
  const current = transports()
  for (const key of Object.keys(current)) {
    delete current[key]
  }
  Object.assign(current, next)
}

const written = (level: "debug" | "silly" | "error") =>
  (logger[level] as jest.Mock).mock.calls.map(
    (call) => call[0] as string
  )

beforeEach(() => {
  jest.clearAllMocks()
  delete process.env.SERIALPORT_LOG_LIMIT
  setTransports({ file: { level: "silly" }, console: { level: false } })
})

describe("AppLogger", () => {
  describe("message length", () => {
    it("trims a message past the default limit", () => {
      AppLogger.log("debug", "x".repeat(5000))

      const [message] = written("debug")
      expect(message.endsWith("...")).toBe(true)
      // The transport writes on the main thread, so no single line may be as
      // long as whatever the device happened to send.
      expect(message.length).toBeLessThan(5000)
    })

    it("leaves a message under the limit alone", () => {
      AppLogger.log("debug", "short")

      expect(written("debug")).toEqual(["%c[DEBUG] short"])
    })

    it("honours an explicit limit from the environment", () => {
      process.env.SERIALPORT_LOG_LIMIT = "5"

      AppLogger.log("debug", "0123456789")

      expect(written("debug")).toEqual(["%c[DEBUG] 01234..."])
    })

    it("keeps a message the caller asked not to trim", () => {
      AppLogger.log("debug", "x".repeat(5000), { doNotTrim: true })

      const [message] = written("debug")
      expect(message).not.toContain("...")
    })
  })

  describe("deferred messages", () => {
    it("builds a message that a transport will write", () => {
      AppLogger.log("debug", () => "built")

      expect(written("debug")).toEqual(["%c[DEBUG] built"])
    })

    it("does not build a message no transport will write", () => {
      setTransports({ file: { level: "debug" }, console: { level: false } })
      const build = jest.fn(() => "expensive")

      AppLogger.log("silly", build)

      // Serializing a request to describe a line that is then dropped is the
      // whole cost of the log with none of the benefit.
      expect(build).not.toHaveBeenCalled()
      expect(logger.silly).not.toHaveBeenCalled()
    })

    it("builds the message once a transport is turned up to that level", () => {
      setTransports({ file: { level: "silly" }, console: { level: false } })
      const build = jest.fn(() => "expensive")

      AppLogger.log("silly", build)

      expect(build).toHaveBeenCalledTimes(1)
    })

    it("does not build a dev-only message outside development", () => {
      const build = jest.fn(() => "expensive")

      AppLogger.log("debug", build, { devOnly: true })

      expect(build).not.toHaveBeenCalled()
    })
  })

  describe("level filtering", () => {
    it("writes when one transport accepts the level and another does not", () => {
      setTransports({ file: { level: "error" }, console: { level: "debug" } })

      AppLogger.log("debug", "kept")

      expect(written("debug")).toEqual(["%c[DEBUG] kept"])
    })

    it("drops a level no transport accepts", () => {
      setTransports({ file: { level: "warn" }, console: { level: false } })

      AppLogger.log("debug", "dropped")

      expect(logger.debug).not.toHaveBeenCalled()
    })

    it("still writes errors when every transport is turned down", () => {
      setTransports({ file: { level: "error" }, console: { level: false } })

      AppLogger.log("error", "kept")

      expect(written("error")).toEqual(["%c[ERROR] kept"])
    })

    it("treats a transport with no level of its own as accepting everything", () => {
      // electron-log's own comparison passes an unconfigured transport, and
      // guessing the other way would silently swallow lines.
      setTransports({ ipc: {} })

      AppLogger.log("silly", "kept")

      expect(logger.silly).toHaveBeenCalled()
    })

    it("writes when the transports are not known at all", () => {
      setTransports({})

      AppLogger.log("debug", "kept")

      expect(written("debug")).toEqual(["%c[DEBUG] kept"])
    })

    it("writes when there is no transport registry to read", () => {
      const registry = logger.transports
      // The renderer build and the tests below it hand over a logger with no
      // transports at all. Reading that as "nothing is listening" would make
      // the logger silent everywhere it is hardest to notice.
      ;(logger as { transports?: unknown }).transports = undefined

      try {
        AppLogger.log("debug", "kept")
      } finally {
        ;(logger as { transports?: unknown }).transports = registry
      }

      expect(written("debug")).toEqual(["%c[DEBUG] kept"])
    })
  })

  describe("formatting", () => {
    it("colours the line by level unless the caller picks one", () => {
      AppLogger.log("debug", "a")
      AppLogger.log("debug", "b", { color: "cyan" })

      expect((logger.debug as jest.Mock).mock.calls[0][1]).toBe(
        "color: magenta"
      )
      expect((logger.debug as jest.Mock).mock.calls[1][1]).toBe("color: cyan")
    })

    it("adds a trailing newline only when one is missing", () => {
      AppLogger.log("debug", "a", { addNewLine: true })
      AppLogger.log("debug", "b\n", { addNewLine: true })

      expect(written("debug")).toEqual(["%c[DEBUG] a\n", "%c[DEBUG] b\n"])
    })

    it("falls back to the default limit when the environment one is junk", () => {
      process.env.SERIALPORT_LOG_LIMIT = "not-a-number"

      AppLogger.log("debug", "x".repeat(5000))

      const [message] = written("debug")
      expect(message.endsWith("...")).toBe(true)
      expect(message.length).toBeGreaterThan(1000)
    })
  })
})
