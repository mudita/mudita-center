/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { spawn } from "child_process"
import * as readline from "readline"
import path from "path"
import { PREFIX_LOG } from "../dotnet-mtp"

const exePath = path.join(
  __dirname,
  "../../../../../../apps/mudita-center/resources/MtpFileTransfer.exe"
)

export async function runCommand(
  request: object,
  stdOutHandler: (line: string) => void,
  stdErrHandler?: (line: string) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const args = JSON.stringify(request)
    const child = spawn(exePath, [args])
    const stdOut = readline.createInterface({
      input: child.stdout,
      crlfDelay: Infinity,
    })
    const stdErr = readline.createInterface({
      input: child.stderr,
      crlfDelay: Infinity,
    })

    stdOut.on("line", (line: string) => {
      stdOutHandler(line)
    })
    stdErr.on("line", (line: string) => {
      if (stdErrHandler) {
        stdErrHandler(line)
      } else {
        console.error(`${PREFIX_LOG} stderr: ${line}`)
      }
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
