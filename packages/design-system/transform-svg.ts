import * as path from "path"
import * as fs from "fs"
import svgr from "@svgr/core"
import { capitalize } from "lodash"

const svgDirName = path.join(__dirname, "dist", "app", "src", "renderer", "svg")
const tempSvgDir = "tmp-svg"

console.log("--- Reading original SVG directory")
fs.readdir(svgDirName, (dirError, fileNames) => {
  if (dirError) {
    throw dirError
  }
  console.log("--- Checking that temp directory exists")
  if (!fs.existsSync(tempSvgDir)) {
    fs.mkdirSync(tempSvgDir)
  } else {
    fs.rmdirSync(tempSvgDir, { recursive: true })
    fs.mkdirSync(tempSvgDir)
  }
  fileNames.forEach((fileName) => {
    const [_, fileType] = fileName.split(".")
    if (fileType !== "svg") {
      console.log(`!!! Skipping not .svg file ${fileName}`)
      return
    }
    const filePath = path.join(svgDirName, fileName)
    fs.readFile(filePath, "utf-8", (fileError, data) => {
      if (fileError) {
        throw fileError
      }
      const parsedData = data.toString()
      const componentName = fileName
        .replace(".", "-")
        .split("-")
        .map((partOfName) => capitalize(partOfName))
        .join("")
      svgr(parsedData, { icon: false }, { componentName })
        .then((jsCode: string) => {
          const newFilePathAndName = `${tempSvgDir}/${fileName}.tsx`
          fs.writeFileSync(newFilePathAndName, jsCode, "utf-8")
        })
        .catch((svgrError) => {
          console.log("--- SVG error:", svgrError, filePath, parsedData)
        })
    })
  })
})
