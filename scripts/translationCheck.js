const { sync: globSync } = require("glob")
const { readFileSync } = require("fs")
const chalk = require("chalk")

const stringToHash = require("../src/renderer/utils/stringToHash.ts").default
const { availableLanguages } = require("../src/translations.config.json")
const languages = availableLanguages.map(({ code }) => code)

function checkTranslations(dir) {
  let files
  if (languages.length > 1) {
    files = globSync(`${dir}{${languages.join(",")}}.json`)
  } else {
    files = globSync(`${dir}${languages[0]}.json`)
  }

  if (!files.length || files.length !== languages.length) {
    console.log(
      chalk.red(
        `${dir} directory probably does not exist or is empty or not all files present`
      )
    )
    process.exitCode = 1
    return
  }

  const keys = files
    .map((filename) => JSON.parse(readFileSync(filename, "utf8")))
    .map((data) => Object.keys(data).sort())
  const hashes = keys.map((data) => stringToHash(data.join(" ")))
  const equal = hashes.every((str, idx, arr) => str === arr[0])

  if (!equal) {
    console.log(chalk.red("Number of keys in translation files is not equal"))
    keys.forEach((data, idx) => {
      console.log(
        chalk.blue(`${dir}${files[idx]}.json`),
        chalk.gray("keys:"),
        chalk.yellow(data.length),
        chalk.gray("hash:"),
        chalk.yellow(hashes[idx])
      )
    })
    process.exitCode = 2
  } else {
    console.log(chalk.green("Number of keys in translation files is equal: "))
    files.forEach((file) => console.log(chalk.gray(`   ${file}`)))
  }
}

checkTranslations("./src/renderer/locales/default/")
