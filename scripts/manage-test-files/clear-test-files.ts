import {
  checkAdbAvailability,
  checkIfDeviceLocked,
  ensureSingleDevice,
  execPromise,
} from "./helpers"
import { getRemotePaths } from "./get-remote-paths"
import {
  fileManagerTestFilesFolderName,
  lowStorageFolderName,
  RemotePathsTarget,
} from "./manage-test-files.const"
import { parseTargetArg } from "./parse-target-arg"

async function clearDeviceDirectory(path: string): Promise<void> {
  try {
    console.log(`🧹 Removing files from ${path}...`)
    const command = `adb shell rm -rf "${path}"`
    const { stdout, stderr } = await execPromise(command)

    if (stdout) console.log(`Output: ${stdout}`)
    if (stderr) console.error(`Error: ${stderr}`)
    console.log(`✅ Files successfully removed from ${path}`)
  } catch (err) {
    console.error(
      `❌ Failed to remove files from ${path}:`,
      (err as Error).message
    )
  }
}

async function main(): Promise<void> {
  await checkAdbAvailability()
  await ensureSingleDevice()
  await checkIfDeviceLocked()

  const target = parseTargetArg(process.argv.slice(2), RemotePathsTarget.both)
  const folders = [lowStorageFolderName, fileManagerTestFilesFolderName]

  for (const folder of folders) {
    const paths = await getRemotePaths(target, folder)
    for (const path of paths) {
      await clearDeviceDirectory(path)
    }
  }
  process.exit(0)
}

void main()
