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
        console.error(`Command failed with error: ${error.message}`);
        reject(`Error: ${error.message}`);
      } else if (stdout) {
        const output = stdout.toString().trim();
        console.log(`Command output: ${output}`);
        resolve(`Output: ${output}`);
      } else {
        const output = stderr?.toString().trim();
        console.error(`Command stderr output: ${output}`);
        reject(`Stderr: ${output}`);
      }
    })
  })
}
