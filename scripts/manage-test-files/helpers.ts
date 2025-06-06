import { exec } from "child_process"
import util from "util"

export const execPromise = util.promisify(exec)

export async function checkAdbAvailability(): Promise<void> {
  try {
    await execPromise("adb --version")
    console.log("ADB is available.")
  } catch (err) {
    console.error(
      "ADB is not installed or not found. Please install ADB and add it to your PATH."
    )
    process.exit(1)
  }
}

export async function ensureSingleDevice(): Promise<void> {
  try {
    const { stdout } = await execPromise("adb devices")
    const devices = stdout
      .split("\n")
      .slice(1)
      .filter((line) => line.includes("device") && !line.includes("offline"))

    if (devices.length === 0) {
      console.error("No devices found. Please connect a device and try again.")
      process.exit(1)
    }

    if (devices.length > 1) {
      console.error(
        "Multiple devices detected. Please connect only one device and try again."
      )
      devices.forEach((device) => console.log(`- ${device.split("\t")[0]}`))
      process.exit(1)
    }

    console.log(`Using device: ${devices[0].split("\t")[0]}`)
  } catch (err) {
    console.error("Error checking devices:", (err as Error).message)
    process.exit(1)
  }
}

export async function checkIfDeviceLocked(): Promise<void> {
  try {
    console.log("Checking if the device is locked...")
    const { stdout } = await execPromise("adb shell dumpsys window")

    if (
      stdout.includes("mDreamingLockscreen=true") ||
      stdout.includes("isStatusBarKeyguard=true")
    ) {
      console.warn(
        "The device appears to be locked. Please unlock it manually and rerun the script."
      )
      process.exit(1)
    } else {
      console.log("The device is unlocked and ready.")
    }
  } catch (err) {
    console.error(
      "Failed to determine the lock state of the device:",
      (err as Error).message
    )
    process.exit(1)
  }
}

export async function pushToDevice(
  outputDir: string,
  remotePath: string
): Promise<void> {
  try {
    const command = `adb push ${outputDir} ${remotePath}`
    const { stdout, stderr } = await execPromise(command)
    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)
  } catch (err) {
    console.error(
      `Failed to push files to the device: ${(err as Error).message}`
    )
    process.exit(1)
  }
}

export async function restartDevice(): Promise<void> {
  try {
    console.log("Restarting the device...")
    const { stdout, stderr } = await execPromise("adb reboot")
    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)
    console.log("Device is restarting.")
  } catch (err) {
    console.error(
      "Failed to restart the device. Ensure it is connected and ADB is working:",
      (err as Error).message
    )
    process.exit(1)
  }
}
