/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import sudoPrompt from "@vscode/sudo-prompt"

// `name` is required for Linux and must not contain special characters, except spaces and alphanumeric characters.
interface ExecCommandWithSudoOptions {
  name: string
  icns?: string
  env?: { [key: string]: string }
}

export const execCommandWithSudo = (
  command: string,
  options: ExecCommandWithSudoOptions
): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    sudoPrompt.exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command failed with error: ${error.message}`)
        return reject(`Error: ${error.message}`)
      }

      if (stderr && !stdout) {
        const output = stderr?.toString().trim()
        console.error(`Command stderr output: ${output}`)
        return reject(`Error: ${stderr.toString().trim()}`)
      }

      const output =
        stdout?.toString().trim() ||
        "Command executed successfully but produced no output."

      console.log(`Command output: ${output}`)
      resolve(output)
    })
  })
}
