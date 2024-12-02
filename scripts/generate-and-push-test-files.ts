import sharp from "sharp"
import fs from "fs-extra"
import path from "path"
import { exec } from "child_process"
import util from "util"

const execPromise = util.promisify(exec)

interface TestCase {
  name: string
  format?: string
  width?: number
  height?: number
  size?: number
}

interface TestCases {
  images: TestCase[]
  audio: TestCase[]
  ebooks: TestCase[]
  apk: TestCase[]
}

const outputDir = path.join(__dirname, "file-manager-test-files")
const testCasesFile = path.join(__dirname, "file-manager-test-cases.json")

async function loadTestCases(): Promise<TestCases> {
  try {
    const data = await fs.readFile(testCasesFile, "utf-8")
    return JSON.parse(data) as TestCases
  } catch (err) {
    console.error("Error loading test cases:", (err as Error).message)
    process.exit(1)
  }
}

async function generateImageFiles(imageTestCases: TestCase[]): Promise<void> {
  await generateSharpFiles(imageTestCases)
}

async function generateAudioFiles(audioTestCases: TestCase[]): Promise<void> {
  await generateDummyFiles(audioTestCases)
}

async function generateEBookFiles(eBookTestCases: TestCase[]): Promise<void> {
  await generateDummyFiles(eBookTestCases)
}

async function generateAPKFiles(apkTestCases: TestCase[]): Promise<void> {
  await generateDummyFiles(apkTestCases)
}

async function generateSharpFiles(testCases: TestCase[]): Promise<void> {
  await fs.ensureDir(outputDir)

  for (const testCase of testCases) {
    const filePath = path.join(outputDir, testCase.name)
    try {
      if (testCase.format) {
        await sharp({
          create: {
            width: testCase.width || 0,
            height: testCase.height || 0,
            channels: 3,
            background: { r: 255, g: 0, b: 0 },
          },
        })
          .toFormat(testCase.format as keyof sharp.FormatEnum)
          .toFile(filePath)
      } else {
        await fs.writeFile(filePath, "")
      }
    } catch (err) {
      console.error(
        `Error generating ${testCase.name}:`,
        (err as Error).message
      )
    }
  }
}

async function generateDummyFiles(testCases: TestCase[]): Promise<void> {
  await fs.ensureDir(outputDir)

  for (const testCase of testCases) {
    const filePath = path.join(outputDir, testCase.name)
    try {
      const buffer = Buffer.alloc(testCase.size || 0, "0")
      await fs.writeFile(filePath, buffer)
    } catch (err) {
      console.error(
        `Error generating ${testCase.name}:`,
        (err as Error).message
      )
    }
  }
}

async function checkAdbAvailability(): Promise<void> {
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

async function ensureSingleDevice(): Promise<void> {
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

async function checkIfDeviceLocked(): Promise<void> {
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

async function pushToDevice(): Promise<void> {
  try {
    const command = `adb push ${outputDir} /storage/emulated/0/`
    const { stdout, stderr } = await execPromise(command)
    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)
  } catch (err) {
    console.error(
      `Failed to push files to the device. Ensure the device is connected and accessible via ADB.`
    )
    console.error(`Error Details: ${(err as Error).message}`)
    process.exit(1)
  }
}

async function restartDevice(): Promise<void> {
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

async function generateAndPushTestFiles(): Promise<void> {
  try {
    const testCases = await loadTestCases()

    await generateImageFiles(testCases.images)
    await generateAudioFiles(testCases.audio)
    await generateEBookFiles(testCases.ebooks)
    await generateAPKFiles(testCases.apk)

    await checkAdbAvailability()
    await ensureSingleDevice()
    await checkIfDeviceLocked()
    await pushToDevice()
    await restartDevice()
  } catch (err) {
    console.error("Error during test file generation:", (err as Error).message)
  }
}

void generateAndPushTestFiles()
