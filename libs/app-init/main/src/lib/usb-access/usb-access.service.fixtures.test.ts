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
  frameworkNoLsusbFixture,
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
    "$id maps fixture environment to hasSerialPortAccess result",
    async (fixture) => {
      setPlatform(fixture.platform as NodeJS.Platform)
      mockExecPromiseFromFixture(fixture)

      const result = await service.hasSerialPortAccess()

      expect(execPromise).toHaveBeenCalledWith("groups")
      expect(execPromise).toHaveBeenCalledWith(
        "ls -l /dev/ttyACM* /dev/ttyUSB* 2>/dev/null || true"
      )

      if (fixture.expectedServiceHasAccess === null) {
        expect(result.ok).toBe(false)
        return
      }

      expect(result).toEqual({
        ok: true,
        data: fixture.expectedServiceHasAccess,
      })
    }
  )

  it("documents current grant failure mapping for the NixOS/AppImage prompt fixture", async () => {
    mockExecPromiseFromFixture({
      ...nixosAppimagePkexecMissingFixture,
      groupsOutput: "nixosuser users",
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
  })
})

const mockExecPromiseFromFixture = (fixture: UsbAccessFixture): void => {
  ;(execPromise as jest.Mock).mockImplementation((command: string) => {
    if (command === "groups") {
      return Promise.resolve(fixture.groupsOutput)
    }

    if (command === "ls -l /dev/ttyACM* /dev/ttyUSB* 2>/dev/null || true") {
      return Promise.resolve(fixture.serialDevicesOutput)
    }

    if (command.startsWith("getent group ")) {
      const group = command.replace("getent group ", "")
      const groupLine = fixture.getentGroupOutput
        ?.split("\n")
        .find((line) => line.startsWith(`${group}:`))

      if (groupLine) {
        return Promise.resolve(groupLine)
      }

      return Promise.reject(new Error(`Group not found: ${group}`))
    }

    return Promise.reject(new Error(`Unexpected command: ${command}`))
  })
}
