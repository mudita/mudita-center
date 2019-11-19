// custom readMessageFiles (added filtering)
// original file https://github.com/GertjanReynaert/react-intl-translations-manager/blob/master/src/readMessageFiles.js
// readMessageFiles.js is provideExtractedMessages.js
// https://github.com/GertjanReynaert/react-intl-translations-manager/blob/master/src/manageTranslations.js#L83

const { readFileSync } = require("fs")
const { sync: globSync } = require("glob")
const Path = require("path")

module.exports = (messagesDirectory, filterMethod = () => true) => {
  if (
    !messagesDirectory ||
    typeof messagesDirectory !== "string" ||
    messagesDirectory.length === 0
  ) {
    throw new Error("messagesDirectory is required")
  }

  const EXTRACTED_MESSAGES_DIR = Path.join(messagesDirectory, "/")
  const EXTRACTED_MESSAGES = Path.join(EXTRACTED_MESSAGES_DIR, "**/*.json")

  return globSync(EXTRACTED_MESSAGES)
    .filter(filterMethod)
    .map(filename => ({
      path: filename.substring(EXTRACTED_MESSAGES_DIR.length),
      descriptors: JSON.parse(readFileSync(filename, "utf8")).map(({ id }) => ({
        id,
        defaultMessage: id,
      })),
    }))
    .filter(file => file.descriptors.length > 0)
}
