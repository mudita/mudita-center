/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { exec } from "child_process"

export const execCommand = (command: string): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command failed with error: ${error.message}`);
        reject(error)
      }
      if (stderr && !stdout) {
        console.error(`Command stderr output: ${stderr}`);
        resolve()
      }
      resolve(stdout)
    })
  })
}
