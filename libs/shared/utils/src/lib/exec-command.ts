/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { exec } from "child_process"

export const execPromise = (command: string, logs = false): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    logs && console.log("execPromise !")
    logs && console.log(command)
    const process = exec(command, (error, stdout, stderr) => {
      logs &&console.log("execPromise ! 2")
      if (error) {
        console.error(`Error: ${error.message}`)
        reject(error)
      }
      if (stderr && !stdout) {
        console.error(`Stderr: ${stderr}`)
        resolve()
      }
      logs && console.log("execPromise ! 3")
      resolve(stdout)
    })

    logs && console.log("execPromise ! 4")

    process.stdout?.on('data', (data) => {
      logs && console.log(`Output: ${data}`);
    });

    logs && console.log("execPromise ! 5")

    process.stderr?.on('data', (data) => {
      logs && console.error(`Error: ${data}`);
    });
  })
}
