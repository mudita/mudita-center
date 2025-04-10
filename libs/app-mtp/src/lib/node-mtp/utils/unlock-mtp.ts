/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "node:path"
const { spawn } = require("child_process")
import * as readline from "readline"
import { Device, Interface } from "usb"
const usb = require("usb")

const scriptPath = path.join(
  __dirname,
  "../../../../../../scripts/mtp-killer.sh"
)

const PREFIX_LOG = `[app-mtp/node-mtp-killer]`

export async function unlocklMtp(): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(scriptPath)

    const stdOut = readline.createInterface({
      input: child.stdout,
      crlfDelay: Infinity,
    })
    const stdErr = readline.createInterface({
      input: child.stderr,
      crlfDelay: Infinity,
    })

    stdOut.on("line", (line: string) => {
      console.log(`${PREFIX_LOG} ${line}`)
    })

    stdErr.on("line", (line: string) => {
      console.log(`${PREFIX_LOG} ${line}`)
    })

    child.on("close", (code: number) => {
      if (code !== 0) {
        console.log(`${PREFIX_LOG} Process exited with code ${code}`)
        reject(new Error(`Process exited with code ${code}`))
      } else {
        console.log(`${PREFIX_LOG} Process exited successfully`)
        resolve()
      }
    })
  })
}

export async function resetUsbDevice(): Promise<void> {
  return new Promise((resolve, reject) => {
    const devices = usb.getDeviceList()
    devices.forEach((device: Device, i: number) => {
      if (device.deviceDescriptor.idVendor == 13072) {
        try {
          if (device.interfaces) {
            device.interfaces.forEach((iface: Interface) => {
              if (iface.isKernelDriverActive?.()) {
                try {
                  iface.detachKernelDriver()
                } catch (e) {
                  console.log(
                    `${PREFIX_LOG} Detaching drivers error: ${JSON.stringify(
                      e
                    )}`
                  )
                }
              }

              try {
                iface.release(true, (err: unknown) => {
                  if (err && err instanceof Error) {
                    console.warn(
                      `${PREFIX_LOG} Interface release error: ${err.message}`
                    )
                  }
                })
              } catch (e) {
                console.warn(
                  `${PREFIX_LOG} Interface release error: ${JSON.stringify(e)}`
                )
              }
            })
          }

          device.close()
          console.log(
            `${PREFIX_LOG} Device closed #${i} (${device.deviceDescriptor.idVendor.toString(
              16
            )}:${device.deviceDescriptor.idProduct.toString(16)})`
          )
          resolve()
        } catch (e: unknown) {
          if (e instanceof Error) {
            console.error(
              `${PREFIX_LOG} Closing device failed #${i}:`,
              e.message
            )
          } else {
            console.error(`${PREFIX_LOG} Unknown error:`, e)
          }
          reject()
        }
      }
    })
  })
}
