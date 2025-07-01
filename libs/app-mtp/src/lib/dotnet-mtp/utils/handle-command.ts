/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { spawn } from "child_process"
import * as readline from "readline"
import path from "path"
import { MTPError } from "../../app-mtp.interface"

const getExecPath = () => {
  if (process.env["NODE_ENV"] === "production") {
    return path.join(process.resourcesPath, "MtpFileTransfer.exe")
  } else {
    return path.join(
      process.cwd().replace("apps\\mudita-center", ""),
      "apps/mudita-center/resources/MtpFileTransfer.exe"
    )
  }
}

const exePath = getExecPath()

const PREFIX_LOG = `[app-mtp/dotnet-mtp]`

export async function runCommand(
  request: object,
  stdOutHandler: (line: string) => void,
  stdErrHandler?: (line: string) => void,
  abortSignal?: AbortSignal
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

    const handleAbort = () => {
      if (child.stdin.writable) {
        child.stdin.write("cancel\n")
        child.stdin.end()
      } else {
        reject(MTPError.MTP_GENERAL_ERROR)
      }
    }

    if (abortSignal?.aborted) {
      return handleAbort()
    }

    abortSignal?.addEventListener("abort", handleAbort)

    child.on("close", (code: number) => {
      abortSignal?.removeEventListener("abort", handleAbort)
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
