/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { execPromise } from "./helpers"
import { RemotePathsTarget } from "./manage-test-files.const"

async function getExternalStoragePath(folder: string): Promise<string | null> {
  try {
    const { stdout } = await execPromise(`adb shell ls /storage`)
    const candidates = stdout
      .trim()
      .split("\n")
      .filter((name) => /^[\w\d]{4}-[\w\d]{4}$/.test(name))

    if (candidates.length === 0) {
      console.warn("⚠️ No external storage detected.")
      return null
    }

    const selected = candidates[0]
    return `/storage/${selected}/DCIM/${folder}`
  } catch (err) {
    console.error(
      "❌ Failed to detect external storage:",
      (err as Error).message
    )
    return null
  }
}

export async function getRemotePaths(
  target: RemotePathsTarget,
  folder: string
): Promise<string[]> {
  const internalStoragePath = `/storage/emulated/0/${folder}`
  const paths: string[] = []

  if (
    target === RemotePathsTarget.internal ||
    target === RemotePathsTarget.both
  ) {
    paths.push(internalStoragePath)
  }

  if (
    target === RemotePathsTarget.external ||
    target === RemotePathsTarget.both
  ) {
    const externalPath = await getExternalStoragePath(folder)
    if (externalPath) {
      paths.push(externalPath)
    } else {
      console.warn("⚠️ Skipping external storage – path not found.")
    }
  }

  if (paths.length === 0) {
    console.error("❌ No valid storage targets found.")
    process.exit(1)
  }

  return paths
}
