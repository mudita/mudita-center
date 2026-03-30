/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * License Generator Script
 *
 * This script scans the node_modules directory and collects license information
 * from production dependencies only (excluding devDependencies).
 *
 * How it works:
 * 1. Uses `npm ls --prod --all --json` to get the production dependency tree
 * 2. Scans node_modules for packages that match the production dependencies
 * 3. Reads license files from each package
 * 4. Groups packages with identical license text to reduce redundancy
 * 5. Outputs a sorted JSON file with all unique licenses
 *
 * Supported license file names:
 * LICENSE, LICENSE.md, LICENSE.txt, LICENSE-MIT, LICENCE, etc.
 *
 * Output format (libs/settings/feature/src/lib/license/licenses.json):
 * {
 *   "licenses": [
 *     {
 *       "packages": [{ "name": "package-name", "version": "1.0.0" }, ...],
 *       "license": "License text content..."
 *     },
 *     ...
 *   ]
 * }
 *
 * Usage: npm run generate:licenses
 */

import * as fs from "fs-extra"
import * as path from "path"
import { execSync } from "child_process"

interface PackageInfo {
  name: string
  version: string
}

interface LicenseGroup {
  packages: PackageInfo[]
  license: string
}

interface LicensesOutput {
  licenses: LicenseGroup[]
}

interface PackageJson {
  name: string
  version: string
  dependencies?: Record<string, string>
}

interface NpmLsDependency {
  version?: string
  dependencies?: Record<string, NpmLsDependency>
}

interface NpmLsOutput {
  dependencies?: Record<string, NpmLsDependency>
}

const LICENSE_FILE_NAMES = [
  "LICENSE",
  "LICENSE.md",
  "LICENSE.txt",
  "LICENSE-MIT",
  "LICENSE-MIT.txt",
  "LICENSE.BSD",
  "LICENCE",
  "LICENCE.md",
  "LICENCE.txt",
  "license",
  "license.md",
  "license.txt",
]

const findLicenseFile = (packagePath: string): string | null => {
  for (const fileName of LICENSE_FILE_NAMES) {
    const licensePath = path.join(packagePath, fileName)
    if (fs.existsSync(licensePath)) {
      return licensePath
    }
  }
  return null
}

const readPackageJson = (packagePath: string): PackageJson | null => {
  const packageJsonPath = path.join(packagePath, "package.json")
  if (!fs.existsSync(packageJsonPath)) {
    return null
  }

  try {
    const content = fs.readFileSync(packageJsonPath, "utf-8")
    const parsed = JSON.parse(content)
    return {
      name: parsed.name || "",
      version: parsed.version || "",
      dependencies: parsed.dependencies,
    }
  } catch {
    return null
  }
}

const getAllPackagePaths = (nodeModulesPath: string): string[] => {
  const packages: string[] = []

  if (!fs.existsSync(nodeModulesPath)) {
    return packages
  }

  const entries = fs.readdirSync(nodeModulesPath, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) {
      continue
    }

    const fullPath = path.join(nodeModulesPath, entry.name)

    if (entry.name.startsWith("@")) {
      const scopedEntries = fs.readdirSync(fullPath, { withFileTypes: true })
      for (const scopedEntry of scopedEntries) {
        if (scopedEntry.isDirectory()) {
          packages.push(path.join(fullPath, scopedEntry.name))
        }
      }
    } else {
      packages.push(fullPath)
    }
  }

  return packages
}

const collectProductionDependencies = (projectRoot: string): Set<string> => {
  const visited = new Set<string>()

  try {
    const output = execSync("npm ls --omit=dev --all --json", {
      cwd: projectRoot,
      encoding: "utf-8",
      maxBuffer: 50 * 1024 * 1024,
      stdio: ["pipe", "pipe", "ignore"],
    })

    const parsed: NpmLsOutput = JSON.parse(output)

    const traverse = (deps: Record<string, NpmLsDependency> | undefined) => {
      if (!deps) return
      for (const [name] of Object.entries(deps)) {
        if (!visited.has(name)) {
          visited.add(name)
          traverse(deps[name].dependencies)
        }
      }
    }

    traverse(parsed.dependencies)
  } catch (error) {
    console.warn(
      "Failed to get npm ls output, falling back to package.json parsing"
    )
    console.warn(error)
  }

  return visited
}

const collectLicenses = async (): Promise<void> => {
  const projectRoot = process.cwd()
  const nodeModulesPath = path.join(projectRoot, "node_modules")
  const outputPath = path.join(
    projectRoot,
    "libs",
    "settings",
    "feature",
    "src",
    "lib",
    "license",
    "licenses.json"
  )

  console.log("Scanning node_modules for production licenses...")

  const productionPackages = collectProductionDependencies(projectRoot)

  if (productionPackages.size === 0) {
    console.error("No production dependencies found")
    process.exit(1)
  }

  console.log(`Found ${productionPackages.size} production dependencies`)

  const packagePaths = getAllPackagePaths(nodeModulesPath)
  const licenseMap = new Map<string, PackageInfo[]>()

  for (const packagePath of packagePaths) {
    const packageInfo = readPackageJson(packagePath)
    if (!packageInfo || !packageInfo.name) {
      continue
    }

    if (!productionPackages.has(packageInfo.name)) {
      continue
    }

    const licenseFilePath = findLicenseFile(packagePath)
    if (!licenseFilePath) {
      continue
    }

    try {
      const licenseContent = fs.readFileSync(licenseFilePath, "utf-8").trim()
      const existingPackages = licenseMap.get(licenseContent) || []
      existingPackages.push({
        name: packageInfo.name,
        version: packageInfo.version,
      })
      licenseMap.set(licenseContent, existingPackages)
    } catch {
      console.warn(`Failed to read license for ${packageInfo.name}`)
    }
  }

  const licenses: LicenseGroup[] = Array.from(licenseMap.entries()).map(
    ([license, packages]) => {
      return {
        packages: packages.sort((a, b) => {
          return a.name.localeCompare(b.name)
        }),
        license,
      }
    }
  )

  licenses.sort((a, b) => {
    return a.packages[0].name.localeCompare(b.packages[0].name)
  })

  const output: LicensesOutput = { licenses }

  fs.writeJsonSync(outputPath, output, "utf-8")

  console.log(`Generated ${licenses.length} unique license groups`)
  console.log(`Output saved to: ${outputPath}`)
}

collectLicenses().catch((error) => {
  console.error("Error collecting licenses:", error)
  process.exit(1)
})
