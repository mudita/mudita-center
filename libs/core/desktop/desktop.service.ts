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

const hardwareSerialPort = "/dev/ttyACM0"

export class DesktopService {
  private serialPortGroup: string | undefined = undefined

  public async isLinux(): Promise<boolean> {
    return process.platform === "linux"
  }

  public async isSudoMode(): Promise<boolean> {
    const isLinux = await this.isLinux()
    if (isLinux) {
      const processUid = process.getuid ? process.getuid() : undefined
      const isSudoMode = processUid === 0

      return isSudoMode
    }
    return false
  }

  public async isUserInSerialPortGroup(): Promise<boolean> {
    const userGroups = await this.getUserGroups()
    const serialPortGroup = await this.getGroupsAssignedToSerialPort()

    const isDialout = serialPortGroup.includes(SerialPortGroup.dialout)
    const isUUCP = serialPortGroup.includes(SerialPortGroup.uucp)

    let group = ""
    if (isDialout) {
      group = SerialPortGroup.dialout
    } else if (isUUCP) {
      group = SerialPortGroup.uucp
    }

    this.serialPortGroup = group
    const isInGroup = group !== "" ? userGroups.includes(group) : false

    return isInGroup
  }

  private async getGroupsAssignedToSerialPort(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(`ls -l ${hardwareSerialPort}`, (error, stdout, stderr) => {
        if (error) {
          reject(`${error.name} - ${error.message}`)
        } else if (stderr) {
          reject(stderr)
        } else {
          resolve(stdout)
        }
      })
    })
  }

  private async getUserGroups(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec("groups", (error, stdout, stderr) => {
        if (error) {
          reject(`${error.name} - ${error.message}`)
        } else if (stderr) {
          reject(stderr)
        } else {
          resolve(stdout)
        }
      })
    })
  }

  public async addUserToSerialPortGroup(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.serialPortGroup) {
        const command = `usermod -aG ${this.serialPortGroup} $USER`

        //set simpler process.title, otherwise there is en error from sudoPrompt.exec - 'process.title cannot be used as a valid name.'
        process.title = "dummy"

        sudoPrompt.exec(command, (error) => {
          if (error === null) {
            resolve()
          } else {
            reject()
          }
        })
      }
    })
  }
}
