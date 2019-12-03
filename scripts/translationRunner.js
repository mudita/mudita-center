const chalk = require("chalk")
const manageTranslations = require("react-intl-translations-manager").default
const { sync: globSync } = require("glob")

const { LANGUAGE } = require("../src/renderer/constants/languages.ts")
const provideExtractedMessagesCustom = require("./provideExtractedMessagesCustom")

const jsonOptions = { space: 2, trailingNewline: true }

const messagesDirectory = "./tmp/extractedMessages"

const files = globSync("./tmp/extractedMessages/**/*.json")

if (!files.length) {
  console.log(
    chalk.red("./tmp directory probably does not exist or is empty"),
    chalk.yellow("Change some files and restart build (`npm run start`)")
  )
  return
}

const commonOptions = {
  messagesDirectory,
  languages: LANGUAGE.available,
  jsonOptions,
}

manageTranslations({
  ...commonOptions,
  translationsDirectory: "./src/renderer/locales/main",
  overrideCoreMethods: {
    beforeReporting() {
      console.log(
        chalk.cyan(
          "--------------- ./src/renderer/locales/main ---------------\n"
        )
      )
    },
    provideExtractedMessages: () =>
      provideExtractedMessagesCustom(messagesDirectory),
  },
})
