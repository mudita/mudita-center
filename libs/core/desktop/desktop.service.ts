/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { exec } from "child_process"
import sudoPrompt from "@vscode/sudo-prompt"

enum SerialPortGroup {
  dialout = "dialout",
  uucp = "uucp",
}

export class DesktopService {
  private potentialGroups = [SerialPortGroup.dialout, SerialPortGroup.uucp];

  public async isLinux(): Promise<boolean> {
    return process.platform === "linux"
  }

  public async hasUserSerialPortAccess(): Promise<boolean> {
    const userGroups = await this.getUserGroups();
    return this.potentialGroups.some(group => userGroups.includes(group));
  }

  public async addUserToSerialPortGroup(): Promise<void> {
    const userGroups = await this.getUserGroups();
    const groupName = this.potentialGroups.find(group => !userGroups.includes(group));

    if (groupName) {
      const command = `usermod -aG ${groupName} $USER`;
      // Set simpler process.title, otherwise, there is an error from sudoPrompt.exec - 'process.title cannot be used as a valid name.'
      process.title = "dummy";

      return new Promise<void>((resolve, reject) => {
        sudoPrompt.exec(command, { name: 'User Serial Port Access' }, (error) => {
          if (error === null) {
            resolve();
          } else {
            reject("Could not add user to serial port group");
          }
        });
      });
    }
  }

  private async getUserGroups(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      exec("groups", (error, stdout, stderr) => {
        if (error || stderr) {
          reject(`${error?.name} - ${error?.message} - ${stderr}`);
        } else {
          const groups = stdout.trim().split(/\s+/);
          resolve(groups);
        }
      });
    });
  }
}
