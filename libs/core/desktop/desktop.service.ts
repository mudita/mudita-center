/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { exec } from "child_process"
import sudoPrompt from "@vscode/sudo-prompt"
import logger from "Core/__deprecated__/main/utils/logger"

export class DesktopService {
  private serialPortGroup: string | undefined = undefined

  public async isLinux(): Promise<boolean> {
    return process.platform === "linux"
  }

  public async isSudoMode(): Promise<boolean> {
    if (await this.isLinux()) {
      const processUid = process.getuid ? process.getuid() : undefined
      const isSudoMode = processUid === 0

      return isSudoMode
    }
    return false
  }

  public async isUserInSerialPortGroup(): Promise<boolean> {
    const userGroups = await this.getUserGroups()
    const serialPortGroup = await this.getGroupsAssignedToSerialPort()

    const isDialout = serialPortGroup.includes("dialout")
    const isUUCP = serialPortGroup.includes("uucp")

    logger.info(
      `isUserInSerialPortGroup userGroups ${userGroups} serialPortGroup ${serialPortGroup}`
    )
    logger.info(
      `isUserInSerialPortGroup isDialout ${isDialout} isUUCP ${isUUCP}`
    )

    let group = ""
    if (isDialout) {
      group = "dialout"
    } else if (isUUCP) {
      group = "uucp"
    }

    this.serialPortGroup = group
    const isInGroup = group !== "" ? userGroups.includes(group) : false

    logger.info(
      `isUserInSerialPortGroup this.serialPortGroup ${this.serialPortGroup} isInGroup ${isInGroup}`
    )

    return isInGroup
  }

  private async getGroupsAssignedToSerialPort(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec("ls -l /dev/ttyACM0", (error, stdout, stderr) => {
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
      logger.info(
        `addUserToSerialPortGroup this.serialPortGroup ${this.serialPortGroup}`
      )
      if (this.serialPortGroup) {
        const command = `usermod -aG ${this.serialPortGroup} $USER`
        logger.info(`addUserToSerialPortGroup command ${command}`)
        sudoPrompt.exec(command, (error, stdout, stderr) => {
          logger.info(`addUserToSerialPortGroup resolved error ${error}`)
          logger.info(`addUserToSerialPortGroup resolved stdout ${stdout}`)
          logger.info(`addUserToSerialPortGroup resolved stderr ${stderr}`)
          if (stdout) {
            //logger.info(`addUserToSerialPortGroup resolved stdout ${stdout}`)
            resolve()
          }
        })
      }
      logger.info(`addUserToSerialPortGroup reject`)
      reject()
    })
  }
}
