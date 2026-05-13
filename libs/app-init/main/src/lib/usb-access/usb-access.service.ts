/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execCommandWithSudo, execPromise } from "app-utils/main"
import {
  AppError,
  AppResult,
  AppResultFactory,
  mapToAppError,
} from "app-utils/models"

const SERIAL_PORT_GROUPS = ["dialout", "uucp"]

export class UsbAccessService {
  async hasSerialPortAccess(): Promise<AppResult<boolean>> {
    if (!this.isLinux()) {
      return AppResultFactory.success(true)
    }

    try {
      const userGroups = await this.getUserGroups()
      const serialPortAccess = SERIAL_PORT_GROUPS.some((group) =>
        userGroups.includes(group)
      )
      return AppResultFactory.success(serialPortAccess)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async grantAccessToSerialPort(): Promise<AppResult> {
    try {
      const userGroups = await this.getUserGroups()
      const serialPortGroups = await this.getExistingSerialPortGroups(
        SERIAL_PORT_GROUPS
      )

      if (serialPortGroups.length === 0) {
        return this.serialPortGroupsNotFoundResult()
      }

      const groupsToGrant = serialPortGroups.filter(
        (group) => !userGroups.includes(group)
      )

      if (groupsToGrant.length === 0) {
        return AppResultFactory.success()
      }

      const command = `usermod -aG ${groupsToGrant.join(",")} $USER`
      await execCommandWithSudo(command, {
        name: "User Serial Port Access",
        title: "Mudita Center: assign serial port access",
      })
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  private isLinux(): boolean {
    return process.platform === "linux"
  }

  private async getUserGroups(): Promise<string[]> {
    const stdout = (await execPromise("groups")) ?? ""
    return this.parseWords(stdout)
  }

  private async getExistingSerialPortGroups(groups: string[]): Promise<string[]> {
    const existingGroups = await Promise.all(
      groups.map(async (group) => {
        const exists = await this.groupExists(group)
        return exists ? group : undefined
      })
    )

    return existingGroups.filter((group): group is string => Boolean(group))
  }

  private async groupExists(group: string): Promise<boolean> {
    try {
      await execPromise(`getent group ${group}`)
      return true
    } catch {
      return false
    }
  }

  private parseWords(stdout: string): string[] {
    const words = stdout.trim()

    if (!words) {
      return []
    }

    return words.split(/\s+/)
  }

  private serialPortGroupsNotFoundResult<Data = unknown>(): AppResult<Data> {
    return AppResultFactory.failed(
      new AppError(
        "No relevant serial port groups found",
        "SerialPortGroupsNotFound"
      )
    )
  }
}
