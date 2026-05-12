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
const serialPortDeviceListCommand =
  "ls -l /dev/ttyACM* /dev/ttyUSB* 2>/dev/null || true"
const serialDeviceOwnedByDialout =
  "crw-rw---- 1 root dialout 166, 0 May 12 10:00 /dev/ttyACM0"
const serialDeviceOwnedByUucp =
  "crw-rw---- 1 root uucp 166, 0 May 12 10:00 /dev/ttyACM0"

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
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user dialout")
        }
        if (command === serialPortDeviceListCommand) {
          return Promise.resolve(serialDeviceOwnedByDialout)
        }
        if (command === "getent group dialout") {
          return Promise.resolve("dialout:x:20:user")
        }
        return Promise.reject(new Error(`Unexpected command: ${command}`))
      })

      const result = await service.hasSerialPortAccess()

      expect(execPromise).toHaveBeenCalledWith("groups")
      expect(execPromise).toHaveBeenCalledWith(serialPortDeviceListCommand)
      expect(execPromise).toHaveBeenCalledWith("getent group dialout")
      expect(result).toEqual({ ok: true, data: true })
    })

    it("S3 returns success true on Linux when user belongs to serial device owner group uucp", async () => {
      setPlatform("linux")
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user uucp")
        }
        if (command === serialPortDeviceListCommand) {
          return Promise.resolve(serialDeviceOwnedByUucp)
        }
        if (command === "getent group uucp") {
          return Promise.resolve("uucp:x:987:user")
        }
        return Promise.reject(new Error(`Unexpected command: ${command}`))
      })

      const result = await service.hasSerialPortAccess()

      expect(execPromise).toHaveBeenCalledWith("groups")
      expect(execPromise).toHaveBeenCalledWith(serialPortDeviceListCommand)
      expect(execPromise).toHaveBeenCalledWith("getent group uucp")
      expect(result).toEqual({ ok: true, data: true })
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
    it("S5 returns success and grants the detected serial device owner group", async () => {
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user")
        }
        if (command === serialPortDeviceListCommand) {
          return Promise.resolve(serialDeviceOwnedByDialout)
        }
        if (command === "getent group dialout") {
          return Promise.resolve("dialout:x:20:")
        }
        return Promise.reject(new Error(`Unexpected command: ${command}`))
      })
      ;(execCommandWithSudo as jest.Mock).mockResolvedValue(undefined)

      const result = await service.grantAccessToSerialPort()

      expect(execCommandWithSudo).toHaveBeenCalledWith(
        "usermod -aG dialout $USER",
        {
          name: "User Serial Port Access",
          title: "Mudita Center: assign serial port access",
        }
      )
      expect(result).toEqual({ ok: true, data: {} })
    })

    it("S6 returns failed result when grant command fails", async () => {
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user")
        }
        if (command === serialPortDeviceListCommand) {
          return Promise.resolve(serialDeviceOwnedByDialout)
        }
        if (command === "getent group dialout") {
          return Promise.resolve("dialout:x:20:")
        }
        return Promise.reject(new Error(`Unexpected command: ${command}`))
      })
      ;(execCommandWithSudo as jest.Mock).mockRejectedValue(
        new Error("sudo failed")
      )

      const result = await service.grantAccessToSerialPort()

      expect(execCommandWithSudo).toHaveBeenCalledWith(
        "usermod -aG dialout $USER",
        {
          name: "User Serial Port Access",
          title: "Mudita Center: assign serial port access",
        }
      )
      expect(result.ok).toBe(false)
    })

    it("returns success without sudo when user already belongs to the serial device owner group", async () => {
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user dialout")
        }
        if (command === serialPortDeviceListCommand) {
          return Promise.resolve(serialDeviceOwnedByDialout)
        }
        if (command === "getent group dialout") {
          return Promise.resolve("dialout:x:20:user")
        }
        return Promise.reject(new Error(`Unexpected command: ${command}`))
      })

      const result = await service.grantAccessToSerialPort()

      expect(execCommandWithSudo).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: true, data: {} })
    })
  })

  describe("target Linux USB permission behavior for R1/R2", () => {
    it("T1 returns success true when user belongs to the serial device owner group uucp", async () => {
      setPlatform("linux")
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user uucp")
        }
        if (command === serialPortDeviceListCommand) {
          return Promise.resolve(serialDeviceOwnedByUucp)
        }
        if (command === "getent group uucp") {
          return Promise.resolve("uucp:x:987:user")
        }
        return Promise.reject(new Error(`Unexpected command: ${command}`))
      })

      const result = await service.hasSerialPortAccess()

      expect(result).toEqual({ ok: true, data: true })
    })

    it("T2 grants only uucp when dialout does not exist and uucp owns the device node", async () => {
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user")
        }
        if (command === serialPortDeviceListCommand) {
          return Promise.resolve(serialDeviceOwnedByUucp)
        }
        if (command === "getent group uucp") {
          return Promise.resolve("uucp:x:987:")
        }
        return Promise.reject(new Error(`Unexpected command: ${command}`))
      })
      ;(execCommandWithSudo as jest.Mock).mockResolvedValue(undefined)

      const result = await service.grantAccessToSerialPort()

      expect(execCommandWithSudo).toHaveBeenCalledWith(
        "usermod -aG uucp $USER",
        {
          name: "User Serial Port Access",
          title: "Mudita Center: assign serial port access",
        }
      )
      expect(result).toEqual({ ok: true, data: {} })
    })

    it("T3 returns a clear failed result without running an invalid grant command when no relevant group exists", async () => {
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user")
        }
        if (command === serialPortDeviceListCommand) {
          return Promise.resolve(
            "crw-rw---- 1 root missinggroup 166, 0 May 12 10:00 /dev/ttyACM0"
          )
        }
        if (command === "getent group missinggroup") {
          return Promise.reject(new Error("group not found"))
        }
        return Promise.reject(new Error(`Unexpected command: ${command}`))
      })

      const result = await service.grantAccessToSerialPort()

      expect(execCommandWithSudo).not.toHaveBeenCalled()
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error.name).toBe("SerialPortGroupsNotFound")
      }
    })

    it.todo(
      "T4 handles multiple serial devices by choosing a Mudita-related node or returning an ambiguous state"
    )
  })
})
