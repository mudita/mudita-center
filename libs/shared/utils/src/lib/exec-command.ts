/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { exec } from "child_process"

export const execPromise = (command: string): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    console.log("execPromise !")
    const process = exec(command, (error, stdout, stderr) => {
      console.log("execPromise ! 2")
      if (error) {
        console.error(`Error: ${error.message}`)
        reject(error)
      }
      if (stderr && !stdout) {
        console.error(`Stderr: ${stderr}`)
        resolve()
      }
      console.log("execPromise ! 3")
      resolve(stdout)
    })

    process.stdout?.on('data', (data) => {
      console.log(`Output: ${data}`);
    });

    process.stderr?.on('data', (data) => {
      console.error(`Error: ${data}`);
    });
  })
}
