/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { exec } from "child_process"

export const execPromise = (
  command: string,
  shell?: "powershell.exe"
): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    exec(command, { shell }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        reject(error)
      }
      if (stderr && !stdout) {
        console.error(`Stderr: ${stderr}`)
        resolve()
      }
      resolve(stdout)
    })
  })
}
