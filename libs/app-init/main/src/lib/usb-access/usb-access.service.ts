/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execCommandWithSudo, execPromise } from "app-utils/main"
import { AppResult, AppResultFactory, mapToAppError } from "app-utils/models"

enum SerialPortGroup {
  dialout = "dialout",
  uucp = "uucp",
}

export class UsbAccessService {
  static async hasSerialPortAccess(): Promise<AppResult<boolean>> {
    if (!this.isLinux()) {
      return AppResultFactory.success(true)
    }

    try {
      const serialPortAccess = await this.isUserInGroup(SerialPortGroup.dialout)
      return AppResultFactory.success(serialPortAccess)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  static async grantAccessToSerialPort(): Promise<AppResult> {
    try {
      const command = `usermod -aG ${SerialPortGroup.dialout} $USER & usermod -aG ${SerialPortGroup.uucp} $USER`
      await execCommandWithSudo(command, {
        name: "User Serial Port Access",
        title: "Mudita Center: assign serial port access",
      })
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  private static isLinux(): boolean {
    return process.platform === "linux"
  }

  private static async isUserInGroup(group: string): Promise<boolean> {
    const userGroups = await this.getUserGroups()
    return userGroups.includes(group)
  }

  private static async getUserGroups(): Promise<string[]> {
    const stdout = (await execPromise("groups")) ?? ""
    return stdout.trim().split(/\s+/)
  }
}
