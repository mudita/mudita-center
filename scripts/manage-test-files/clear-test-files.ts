import { checkAdbAvailability, checkIfDeviceLocked, ensureSingleDevice, execPromise } from "./helpers"


async function clearTestFiles(): Promise<void> {
  try {
    console.log("Removing test files from the device...")
    const command = `adb shell rm -rf /storage/emulated/0/file-manager-test-files`
    const { stdout, stderr } = await execPromise(command)

    if (stdout) console.log(`Output: ${stdout}`)
    if (stderr) console.error(`Error: ${stderr}`)
    console.log("Test files successfully removed from the device.")
  } catch (err) {
    console.error(
      `Failed to remove test files from the device. Ensure the device is connected and accessible via ADB.`
    )
    console.error(`Error Details: ${(err as Error).message}`)
  }
}

async function main(): Promise<void> {
  await checkAdbAvailability()
  await ensureSingleDevice()
  await checkIfDeviceLocked()
  await clearTestFiles()
  process.exit(0)
}

void main()
