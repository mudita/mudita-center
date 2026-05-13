/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execCommandWithSudo, execPromise } from "app-utils/main"
import archUucpFixture from "./__fixtures__/arch-uucp.json"
import fedoraMixedFixture from "./__fixtures__/fedora-mixed.json"
import frameworkNoLsusbFixture from "./__fixtures__/framework-no-lsusb.json"
import nixosAppimagePkexecMissingFixture from "./__fixtures__/nixos-appimage-pkexec-missing.json"
import ubuntuDialoutFixture from "./__fixtures__/ubuntu-dialout.json"
import { UsbAccessService } from "./usb-access.service"

jest.mock("app-utils/main", () => ({
  execCommandWithSudo: jest.fn(),
  execPromise: jest.fn(),
}))

type UsbAccessFixture = {
  id: string
  platform: string
  groupsOutput: string
  getentGroupOutput?: string
  lsusbOutput?: string
  serialDevicesOutput: string
  execCommandWithSudoError?: string
  expectedClassification: string
  expectedServiceHasAccess: boolean | null
  expectedServiceGrantAccess?: string
  notes: string
}

const fixtures: UsbAccessFixture[] = [
  archUucpFixture,
  ubuntuDialoutFixture,
  fedoraMixedFixture,
  nixosAppimagePkexecMissingFixture,
]

const originalPlatform = process.platform

const setPlatform = (platform: NodeJS.Platform): void => {
  Object.defineProperty(process, "platform", {
    configurable: true,
    value: platform,
  })
}

describe("UsbAccessService environment fixtures", () => {
  let service: UsbAccessService

  beforeEach(() => {
    service = new UsbAccessService()
    jest.resetAllMocks()
    setPlatform(originalPlatform)
  })

  afterAll(() => {
    setPlatform(originalPlatform)
  })

  it.each(fixtures)(
    "$id maps fixture groups to hasSerialPortAccess result",
    async (fixture) => {
      setPlatform(fixture.platform as NodeJS.Platform)
      ;(execPromise as jest.Mock).mockResolvedValue(fixture.groupsOutput)

      const result = await service.hasSerialPortAccess()

      expect(execPromise).toHaveBeenCalledWith("groups")

      if (fixture.expectedServiceHasAccess === null) {
        expect(result).toEqual({ ok: true, data: false })
        return
      }

      expect(result).toEqual({
        ok: true,
        data: fixture.expectedServiceHasAccess,
      })
    }
  )

  it("documents current grant failure mapping for the NixOS/AppImage prompt fixture", async () => {
    ;(execPromise as jest.Mock).mockImplementation((command: string) => {
      if (command === "groups") {
        return Promise.resolve("nixosuser users")
      }
      if (command === "getent group dialout") {
        return Promise.resolve(nixosAppimagePkexecMissingFixture.getentGroupOutput)
      }
      if (command === "getent group uucp") {
        return Promise.reject(new Error("group not found"))
      }
      return Promise.reject(new Error(`Unexpected command: ${command}`))
    })
    ;(execCommandWithSudo as jest.Mock).mockRejectedValue(
      new Error(nixosAppimagePkexecMissingFixture.execCommandWithSudoError)
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
    if (!result.ok) {
      expect(result.error.name).toBe("AuthorizationPromptUnavailable")
    }
  })

  it.todo(
    `${frameworkNoLsusbFixture.id} classifies hardware-level missing devices outside the known serial group check`
  )
})
