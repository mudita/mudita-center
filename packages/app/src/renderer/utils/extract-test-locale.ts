/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

type LanguageDictionary = Record<string, string>

export default (input: LanguageDictionary): LanguageDictionary => {
  const data = Object.keys(input)

  if (data.length > 0) {
    return data.reduce((acc: LanguageDictionary, item: string) => {
      return {
        ...acc,
        [item]: `[value] ${item}`,
      }
    }, {})
  }

  console.warn("Translation dictionary is empty!")

  return {}
}
