import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';

interface TestCase {
  name: string;
  format?: string;
  width?: number;
  height?: number;
  size?: number;
}

interface TestCases {
  images: TestCase[];
  audio: TestCase[];
  ebooks: TestCase[];
  apk: TestCase[];
}

const outputDir = path.join(__dirname, 'file-manager-test-files');
const testCasesFile = path.join(__dirname, 'file-manager-test-cases.json');

async function loadTestCases(): Promise<TestCases> {
  try {
    const data = await fs.readFile(testCasesFile, 'utf-8');
    return JSON.parse(data) as TestCases;
  } catch (err) {
    console.error("Error loading test cases:", (err as Error).message);
    process.exit(1);
  }
}

async function generateImageFiles(imageTestCases: TestCase[]): Promise<void> {
  await generateSharpFiles(imageTestCases);
}

async function generateAudioFiles(audioTestCases: TestCase[]): Promise<void> {
  await generateDummyFiles(audioTestCases);
}

async function generateEBookFiles(eBookTestCases: TestCase[]): Promise<void> {
  await generateDummyFiles(eBookTestCases);
}

async function generateAPKFiles(apkTestCases: TestCase[]): Promise<void> {
  await generateDummyFiles(apkTestCases);
}

async function generateSharpFiles(testCases: TestCase[]): Promise<void> {
  await fs.ensureDir(outputDir);

  for (const testCase of testCases) {
    const filePath = path.join(outputDir, testCase.name);
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
      .toFile(filePath);
      } else {
        await fs.writeFile(filePath, '');
      }
    } catch (err) {
      console.error(`Error generating ${testCase.name}:`, (err as Error).message);
    }
  }
}

async function generateDummyFiles(testCases: TestCase[]): Promise<void> {
  await fs.ensureDir(outputDir);

  for (const testCase of testCases) {
    const filePath = path.join(outputDir, testCase.name);
    try {
      const buffer = Buffer.alloc(testCase.size || 0, '0');
      await fs.writeFile(filePath, buffer);
    } catch (err) {
      console.error(`Error generating ${testCase.name}:`, (err as Error).message);
    }
  }
}

async function generateTestFiles(): Promise<void> {
  try {
    const testCases = await loadTestCases();

    await generateImageFiles(testCases.images);
    await generateAudioFiles(testCases.audio);
    await generateEBookFiles(testCases.ebooks);
    await generateAPKFiles(testCases.apk);
  } catch (err) {
    console.error("Error during test file generation:", (err as Error).message);
  }
}

generateTestFiles();
