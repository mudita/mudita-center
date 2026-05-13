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

enum SerialPortGroup {
  dialout = "dialout",
  uucp = "uucp",
}

const SERIAL_PORT_GROUPS = Object.values(SerialPortGroup)
const AUTHORIZATION_PROMPT_UNAVAILABLE_ERROR =
  "AuthorizationPromptUnavailable"
const AUTHORIZATION_PROMPT_UNAVAILABLE_PATTERNS = [
  /authentication agent/i,
  /pkexec/i,
  /polkit/i,
  /sudo-prompt/i,
]

export class UsbAccessService {
  async hasSerialPortAccess(): Promise<AppResult<boolean>> {
    if (!this.isLinux()) {
      return AppResultFactory.success(true)
    }

    try {
      const serialPortAccess = await this.isUserInAnyGroup(SERIAL_PORT_GROUPS)
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
      if (this.isAuthorizationPromptUnavailableError(error)) {
        return AppResultFactory.failed(
          new AppError(
            this.getErrorMessage(error),
            AUTHORIZATION_PROMPT_UNAVAILABLE_ERROR
          )
        )
      }

      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  private isLinux(): boolean {
    return process.platform === "linux"
  }

  private async isUserInAnyGroup(groups: SerialPortGroup[]): Promise<boolean> {
    const userGroups = await this.getUserGroups()
    return groups.some((group) => userGroups.includes(group))
  }

  private async getUserGroups(): Promise<string[]> {
    const stdout = (await execPromise("groups")) ?? ""
    return this.parseWords(stdout)
  }

  private async getExistingSerialPortGroups(
    groups: SerialPortGroup[]
  ): Promise<SerialPortGroup[]> {
    const existingGroups = await Promise.all(
      groups.map(async (group) => {
        const exists = await this.groupExists(group)
        return exists ? group : undefined
      })
    )

    return existingGroups.filter((group): group is SerialPortGroup =>
      Boolean(group)
    )
  }

  private async groupExists(group: SerialPortGroup): Promise<boolean> {
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

  private isAuthorizationPromptUnavailableError(error: unknown): boolean {
    const message = this.getErrorMessage(error)
    return AUTHORIZATION_PROMPT_UNAVAILABLE_PATTERNS.some((pattern) =>
      pattern.test(message)
    )
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message
    }

    return String(error)
  }
}
