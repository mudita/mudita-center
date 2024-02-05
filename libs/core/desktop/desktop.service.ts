/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { exec } from "child_process"
import sudoPrompt from "@vscode/sudo-prompt"
import logger from "Core/__deprecated__/main/utils/logger"

enum SerialPortGroup {
  dialout = "dialout",
  uucp = "uucp",
}

const hardwareSerialPort = "/dev/ttyACM0"

export class DesktopService {
  public async isLinux(): Promise<boolean> {
    return process.platform === "linux"
  }

  private async getSerialPortGroup(): Promise<string> {
    const serialPortGroup = await this.getGroupsAssignedToSerialPort()
    logger.info(`getSerialPortGroup serialPortGroup ${serialPortGroup}`)

    const isDialout = serialPortGroup.includes(SerialPortGroup.dialout)
    logger.info(`getSerialPortGroup isDialout ${String(isDialout)}`)
    const isUUCP = serialPortGroup.includes(SerialPortGroup.uucp)
    logger.info(`getSerialPortGroup isUUCP ${String(isUUCP)}`)
    let group = ""
    if (isDialout) {
      group = SerialPortGroup.dialout
    } else if (isUUCP) {
      group = SerialPortGroup.uucp
    }

    logger.info(`getSerialPortGroup return group ${group}`)
    return group
  }

  public async isUserInSerialPortGroup(): Promise<boolean> {
    const userGroups = await this.getUserGroups()
    logger.info(`isUserInSerialPortGroup userGroups ${userGroups}`)

    const serialPortGroup = await this.getSerialPortGroup()

    const isInGroup =
      serialPortGroup !== "" ? userGroups.includes(serialPortGroup) : false

    return isInGroup
  }

  public async getGroupsAssignedToSerialPort(): Promise<string> {
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

  public async getUserGroups(): Promise<string> {
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
    const serialPortGroup = await this.getSerialPortGroup()
    return new Promise((resolve, reject) => {
      if (serialPortGroup !== "") {
        const command = `usermod -aG ${serialPortGroup} $USER`

        //set simpler process.title, otherwise there is en error from sudoPrompt.exec - 'process.title cannot be used as a valid name.'
        process.title = "dummy"

        sudoPrompt.exec(command, (error) => {
          if (error === null) {
            resolve()
          } else {
            reject("Could not add user")
          }
        })
      }
    })
  }
}
