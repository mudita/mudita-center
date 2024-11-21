/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { get, isString } from "lodash"
import { DataProviderSearchConfig } from "device/models"
import { UseViewFormContext } from "generic-view/utils"

export const dataSearch = (formContext: UseViewFormContext) => {
  return (
    data: Record<string, unknown>[] = [],
    config?: DataProviderSearchConfig
  ) => {
    if (!config) {
      return data
    }
    const { fields, phraseSource, minPhraseLength = 0 } = config
    let searchPhrase = ""

    switch (phraseSource.type) {
      case "form-fields": {
        const form = formContext(phraseSource.formKey)
        searchPhrase = form.watch(phraseSource.field) || ""
      }
    }

    if (searchPhrase.length < minPhraseLength) {
      return undefined
    }

    return data.filter((item) => {
      return fields.some(({ field, mode, caseSensitive }) => {
        const fieldValue = get(item, field)
        if (isString(fieldValue)) {
          const fieldValueToCompare = caseSensitive
            ? fieldValue
            : fieldValue.toLowerCase()
          const searchPhraseToCompare = caseSensitive
            ? searchPhrase
            : searchPhrase.toLowerCase()
          switch (mode) {
            case "exact":
              return fieldValueToCompare === searchPhraseToCompare
            case "includes":
              return fieldValueToCompare.includes(searchPhraseToCompare)
            case "startsWith":
              return fieldValueToCompare.startsWith(searchPhraseToCompare)
          }
        }
        return false
      })
    })
  }
}
