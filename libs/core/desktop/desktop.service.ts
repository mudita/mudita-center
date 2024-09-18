/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execCommand, execCommandWithSudo } from "shared/utils"

enum SerialPortGroup {
  dialout = "dialout",
  uucp = "uucp",
}

export class DesktopService {
  public async isLinux(): Promise<boolean> {
    return process.platform === "linux"
  }

  public async hasUserSerialPortAccess(): Promise<boolean> {
    const userGroups = await this.getUserGroups()
    return userGroups.includes(SerialPortGroup.dialout)
  }

  public async addUserToSerialPortGroup(): Promise<void> {
    const command = `usermod -aG ${SerialPortGroup.dialout} $USER & usermod -aG ${SerialPortGroup.uucp} $USER`
    // Set simpler process.title, otherwise, there is an error from sudoPrompt.exec - 'process.title cannot be used as a valid name.'
    process.title = "Mudita Center: assign serial port access"

    try {
      await execCommandWithSudo(command, { name: "User Serial Port Access" });
    } catch (error) {
      console.error("Could not add user to serial port group");
    }
  }

  private async getUserGroups(): Promise<string[]> {
    try {
      const result = await execCommand("groups");

      if (typeof result === 'string') {
        return result.trim().split(/\s+/);
      } else {
        throw new Error("No output from command");
      }
    } catch (error: unknown) {
      console.error(error);
      return [];
    }
  }
}
