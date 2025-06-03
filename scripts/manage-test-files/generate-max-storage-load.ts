/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  checkAdbAvailability,
  checkIfDeviceLocked,
  ensureSingleDevice,
  execPromise,
} from "./helpers"
import { getRemotePaths } from "./get-remote-paths"
import { lowStorageFolderName } from "./manage-test-files.const"
import { parseTargetArg } from "./parse-target-arg"

const partSizeBytes = 10 * 1024 ** 3 // 10 GB
const targetFillSizeBytes = 100 * 1024 ** 3 // 100 GB

const writePart = async (
  bytes: number,
  remotePath: string,
  index: number
): Promise<number> => {
  const mb = Math.floor(bytes / (1024 * 1024))
  const filename = `dummy_file_${mb}_${Date.now()}_${index}.bin`

  console.log(`📦 Writing part ${index + 1}: ${mb} MB to ${remotePath}...`)

  const start = Date.now()
  try {
    await execPromise(
      `adb shell 'dd if=/dev/zero of="${remotePath}/${filename}" bs=1M count=${mb}'`
    )
    const duration = ((Date.now() - start) / 1000).toFixed(1)
    console.log(`✅ Part ${index + 1} written successfully in ${duration}s`)
    return bytes
  } catch (err) {
    console.error(
      `❌ Failed to write part ${index + 1} — likely due to lack of space.`
    )

    try {
      const { stdout } = await execPromise(
        `adb shell ls -l "${remotePath}/${filename}"`
      )
      const parts = stdout.trim().split(/\s+/)
      const actualSize = parseInt(parts[4], 10)
      const duration = ((Date.now() - start) / 1000).toFixed(1)
      console.log(
        `ℹ️  Partial file created: ${(actualSize / 1024 ** 2).toFixed(
          2
        )} MB in ${duration}s`
      )
      return actualSize
    } catch {
      console.warn("⚠️  Could not determine partial file size.")
      return 0
    }
  }
}

const simulateLowStorage = async (
  totalTargetBytes: number,
  remotePath: string
): Promise<void> => {
  console.log(`📁 Creating directory at ${remotePath}...`)
  await execPromise(`adb shell mkdir -p "${remotePath}"`)

  console.log("📊 Starting low storage simulation in 10 GB chunks...")
  let written = 0
  let index = 0

  while (written < totalTargetBytes) {
    const remaining = totalTargetBytes - written
    const sizeToWrite = Math.min(partSizeBytes, remaining)
    const writtenNow = await writePart(sizeToWrite, remotePath, index)
    if (writtenNow === 0) break
    written += writtenNow
    index++
  }

  console.log(
    `🏁 Done. Total written: ${(written / 1024 ** 3).toFixed(
      2
    )} GB in ${index} part(s).`
  )
}

async function main(): Promise<void> {
  await checkAdbAvailability()
  await ensureSingleDevice()
  await checkIfDeviceLocked()

  const target = parseTargetArg(process.argv.slice(2))

  const paths = await getRemotePaths(target, lowStorageFolderName)

  console.log("📱 Simulating low storage on Kompakt device...")
  console.log(
    "ℹ️  This process can take several minutes depending on device speed."
  )
  console.log("💡 Example: Writing 10 GB takes ~1 minute on average.")

  for (const path of paths) {
    await simulateLowStorage(targetFillSizeBytes, path)
  }
  process.exit(0)
}

void main()
