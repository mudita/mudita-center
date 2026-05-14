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
    it("returns success when platform is not Linux", async () => {
      setPlatform("darwin")

      const result = await service.hasSerialPortAccess()

      expect(result).toEqual({ ok: true, data: true })
      expect(execPromise).not.toHaveBeenCalled()
    })

    it("returns success when Linux user belongs to dialout group", async () => {
      setPlatform("linux")
      ;(execPromise as jest.Mock).mockResolvedValue("user dialout")

      const result = await service.hasSerialPortAccess()

      expect(execPromise).toHaveBeenCalledWith("groups")
      expect(result).toEqual({ ok: true, data: true })
    })

    it("returns success when Linux user belongs to uucp group", async () => {
      setPlatform("linux")
      ;(execPromise as jest.Mock).mockResolvedValue("user uucp")

      const result = await service.hasSerialPortAccess()

      expect(execPromise).toHaveBeenCalledWith("groups")
      expect(result).toEqual({ ok: true, data: true })
    })

    it("returns failed result when groups command fails", async () => {
      setPlatform("linux")
      ;(execPromise as jest.Mock).mockRejectedValue(new Error("groups failed"))

      const result = await service.hasSerialPortAccess()

      expect(execPromise).toHaveBeenCalledWith("groups")
      expect(result.ok).toBe(false)
    })
  })

  describe("grantAccessToSerialPort", () => {
    it("grants existing serial port group when user is missing it", async () => {
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user")
        }
        if (command === "getent group dialout") {
          return Promise.resolve("dialout:x:20:")
        }
        if (command === "getent group uucp") {
          return Promise.reject(new Error("group not found"))
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

    it("returns failed result when grant command fails", async () => {
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user")
        }
        if (command === "getent group dialout") {
          return Promise.resolve("dialout:x:20:")
        }
        if (command === "getent group uucp") {
          return Promise.reject(new Error("group not found"))
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

    it("returns prompt unavailable error when authorization prompt cannot be opened", async () => {
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user")
        }
        if (command === "getent group dialout") {
          return Promise.resolve("dialout:x:20:")
        }
        if (command === "getent group uucp") {
          return Promise.reject(new Error("group not found"))
        }
        return Promise.reject(new Error(`Unexpected command: ${command}`))
      })
      ;(execCommandWithSudo as jest.Mock).mockRejectedValue(
        "Error: pkexec authentication agent unavailable"
      )

      const result = await service.grantAccessToSerialPort()

      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error.name).toBe("AuthorizationPromptUnavailable")
      }
    })

    it("returns success without sudo when user already belongs to the serial device owner group", async () => {
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user dialout")
        }
        if (command === "getent group dialout") {
          return Promise.resolve("dialout:x:20:user")
        }
        if (command === "getent group uucp") {
          return Promise.reject(new Error("group not found"))
        }
        return Promise.reject(new Error(`Unexpected command: ${command}`))
      })

      const result = await service.grantAccessToSerialPort()

      expect(execCommandWithSudo).not.toHaveBeenCalled()
      expect(result).toEqual({ ok: true, data: {} })
    })
  })

  describe("serial port group allowlist", () => {
    it("returns success when user belongs to uucp group", async () => {
      setPlatform("linux")
      ;(execPromise as jest.Mock).mockResolvedValue("user uucp")

      const result = await service.hasSerialPortAccess()

      expect(result).toEqual({ ok: true, data: true })
    })

    it("grants only uucp when dialout group does not exist", async () => {
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user")
        }
        if (command === "getent group dialout") {
          return Promise.reject(new Error("group not found"))
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

    it("does not run grant command when no serial port groups exist", async () => {
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve("user")
        }
        if (command === "getent group dialout") {
          return Promise.reject(new Error("group not found"))
        }
        if (command === "getent group uucp") {
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
  })
})
