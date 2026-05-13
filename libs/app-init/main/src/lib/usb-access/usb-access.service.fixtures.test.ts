/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execCommandWithSudo, execPromise } from "app-utils/main"
import archUucpFixture from "./__fixtures__/arch-uucp.json"
import archUucpGrantFixture from "./__fixtures__/arch-uucp-grant.json"
import fedoraDialoutFixture from "./__fixtures__/fedora-dialout.json"
import fedoraMixedFixture from "./__fixtures__/fedora-mixed.json"
import nixosAppimagePkexecMissingFixture from "./__fixtures__/nixos-appimage-pkexec-missing.json"
import noAllowlistGroupsFixture from "./__fixtures__/no-allowlist-groups.json"
import ubuntuDialoutFixture from "./__fixtures__/ubuntu-dialout.json"
import ubuntuDebianGrantFixture from "./__fixtures__/ubuntu-debian-grant.json"
import { UsbAccessService } from "./usb-access.service"

jest.mock("app-utils/main", () => ({
  execCommandWithSudo: jest.fn(),
  execPromise: jest.fn(),
}))

type UsbAccessFixture = {
  id: string
  platform: string
  groupsOutput: string
  getentGroupOutputs?: Partial<Record<"dialout" | "uucp", string>>
  execCommandWithSudoError?: string
  expected: {
    hasAccess: boolean
    grant?: {
      ok: boolean
      command?: string
      error?: string
    }
  }
}

const fixtures: UsbAccessFixture[] = [
  archUucpFixture,
  archUucpGrantFixture,
  fedoraDialoutFixture,
  nixosAppimagePkexecMissingFixture,
  noAllowlistGroupsFixture,
  ubuntuDebianGrantFixture,
  ubuntuDialoutFixture,
  fedoraMixedFixture,
]

const grantFixtures = fixtures.filter((fixture) => fixture.expected.grant)

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

      expect(result).toEqual({
        ok: true,
        data: fixture.expected.hasAccess,
      })
    }
  )

  it.each(grantFixtures)(
    "$id maps fixture grant scenario to expected service result",
    async (fixture) => {
      setPlatform(fixture.platform as NodeJS.Platform)
      ;(execPromise as jest.Mock).mockImplementation((command: string) => {
        if (command === "groups") {
          return Promise.resolve(fixture.groupsOutput)
        }

        if (command === "getent group dialout") {
          const dialout = fixture.getentGroupOutputs?.dialout
          return dialout
            ? Promise.resolve(dialout)
            : Promise.reject(new Error("group not found"))
        }

        if (command === "getent group uucp") {
          const uucp = fixture.getentGroupOutputs?.uucp
          return uucp
            ? Promise.resolve(uucp)
            : Promise.reject(new Error("group not found"))
        }

        return Promise.reject(new Error(`Unexpected command: ${command}`))
      })

      if (fixture.execCommandWithSudoError) {
        ;(execCommandWithSudo as jest.Mock).mockRejectedValue(
          new Error(fixture.execCommandWithSudoError)
        )
      } else {
        ;(execCommandWithSudo as jest.Mock).mockResolvedValue(undefined)
      }

      const result = await service.grantAccessToSerialPort()
      const expectedGrant = fixture.expected.grant

      if (expectedGrant?.command) {
        expect(execCommandWithSudo).toHaveBeenCalledWith(
          expectedGrant.command,
          {
            name: "User Serial Port Access",
            title: "Mudita Center: assign serial port access",
          }
        )
      } else {
        expect(execCommandWithSudo).not.toHaveBeenCalled()
      }

      if (expectedGrant?.ok) {
        expect(result).toEqual({ ok: true, data: {} })
        return
      }

      expect(result.ok).toBe(false)
      if (!result.ok && expectedGrant?.error) {
        expect(result.error.name).toBe(expectedGrant.error)
      }
    }
  )
})
