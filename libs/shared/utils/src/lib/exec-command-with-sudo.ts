/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import sudoPrompt from "@vscode/sudo-prompt"

export const execCommandWithSudo = (
  command: string,
  options: { name?: string; icns?: string; env?: { [key: string]: string } }
): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    sudoPrompt.exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        reject(`Error: ${error}`)
      } else if (stdout) {
        console.log(`Output: ${stdout}`)
        resolve(`Output: ${stdout}`)
      } else {
        console.error(`Stderr: ${stderr}`)
        reject(`Stderr: ${stderr}`)
      }
    })
  })
}
