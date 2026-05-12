/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execCommandWithSudo, execPromise } from "app-utils/main"
import { UsbAccessService } from "./usb-access.service"

jest.mock("app-utils/main", () => ({
  execCommandWithSudo: jest.fn(),
  execPromise: jest.fn(),
}))

const originalPlatform = process.platform

const setPlatform = (platform: NodeJS.Platform): void => {
  Object.defineProperty(process, "platform", {
    configurable: true,
    value: platform,
  })
}

describe("UsbAccessService", () => {
  let service: UsbAccessService

  beforeEach(() => {
    service = new UsbAccessService()
    jest.resetAllMocks()
    setPlatform(originalPlatform)
  })

  afterAll(() => {
    setPlatform(originalPlatform)
  })

  describe("hasSerialPortAccess", () => {
    it("S1 returns success true on non-Linux", async () => {
      setPlatform("darwin")

      const result = await service.hasSerialPortAccess()

      expect(result).toEqual({ ok: true, data: true })
      expect(execPromise).not.toHaveBeenCalled()
    })

    it("S2 returns success true on Linux when user belongs to dialout", async () => {
      setPlatform("linux")
      ;(execPromise as jest.Mock).mockResolvedValue("user dialout")

      const result = await service.hasSerialPortAccess()

      expect(execPromise).toHaveBeenCalledWith("groups")
      expect(result).toEqual({ ok: true, data: true })
    })

    it("S3 documents current bug: Linux user only in uucp returns success false", async () => {
      setPlatform("linux")
      ;(execPromise as jest.Mock).mockResolvedValue("user uucp")

      const result = await service.hasSerialPortAccess()

      expect(execPromise).toHaveBeenCalledWith("groups")
      expect(result).toEqual({ ok: true, data: false })
    })

    it("S4 returns failed result when groups command fails", async () => {
      setPlatform("linux")
      ;(execPromise as jest.Mock).mockRejectedValue(new Error("groups failed"))

      const result = await service.hasSerialPortAccess()

      expect(execPromise).toHaveBeenCalledWith("groups")
      expect(result.ok).toBe(false)
    })
  })

  describe("grantAccessToSerialPort", () => {
    it("S5 returns success and runs the current grant command", async () => {
      ;(execCommandWithSudo as jest.Mock).mockResolvedValue(undefined)

      const result = await service.grantAccessToSerialPort()

      expect(execCommandWithSudo).toHaveBeenCalledWith(
        "usermod -aG dialout $USER & usermod -aG uucp $USER",
        {
          name: "User Serial Port Access",
          title: "Mudita Center: assign serial port access",
        }
      )
      expect(result).toEqual({ ok: true, data: {} })
    })

    it("S6 returns failed result when grant command fails", async () => {
      ;(execCommandWithSudo as jest.Mock).mockRejectedValue(
        new Error("sudo failed")
      )

      const result = await service.grantAccessToSerialPort()

      expect(execCommandWithSudo).toHaveBeenCalledWith(
        "usermod -aG dialout $USER & usermod -aG uucp $USER",
        {
          name: "User Serial Port Access",
          title: "Mudita Center: assign serial port access",
        }
      )
      expect(result.ok).toBe(false)
    })
  })

  describe("target Linux USB permission behavior for R1/R2", () => {
    it.todo(
      "T1 returns success true when user belongs to the serial device owner group uucp"
    )
    it.todo(
      "T2 grants only uucp when dialout does not exist and uucp owns the device node"
    )
    it.todo(
      "T3 returns a clear failed result without running an invalid grant command when no relevant group exists"
    )
    it.todo(
      "T4 handles multiple serial devices by choosing a Mudita-related node or returning an ambiguous state"
    )
  })
})
