/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import settingsStore from "App/main/store/settings"
import axios from "axios"
import translationStores from "App/main/store/translations"
import { availableLanguages } from "App/translations.config.json"
import { axiosConfig, localesUrl } from "App/common/configs/phrase"
import logger from "App/main/utils/logger"

const updateTranslations = async () => {
  const language = settingsStore.get("language")
  const id = availableLanguages.find(({ code }) => code === language)?.id
  logger.info(`Preparing translation update for language "${language}"`)

  try {
    if (!id) {
      Promise.reject(
        new Error(
          `There's no ID assigned to language (${language}) selected in settings.`
        )
      )
    }
    const { data } = await axios.get(`${localesUrl}/${id}/download`, {
      ...axiosConfig,
      params: { file_format: "react_simple_json" },
    })

    translationStores[language].store = data
    logger.info(`Translation for language "${language}" applied successfully`)
  } catch (error) {
    logger.error(error)
  }
}

export default updateTranslations
