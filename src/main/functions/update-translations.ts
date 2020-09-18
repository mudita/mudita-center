import settingsStore from "App/main/store/settings"
import axios from "axios"
import translationStores from "App/main/store/translations"
import { availableLanguages } from "App/translations.config.json"
import { axiosConfig, localesUrl } from "App/common/configs/phrase"

const updateTranslations = async () => {
  const language = settingsStore.get("language") as string
  const id = availableLanguages.find(({ code }) => code === language)?.id
  // TODO: Replace with the new logger
  console.log(`Preparing translation update for language "${language}"`)

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
    // TODO: Replace with the new logger
    console.log(`Translation for language "${language}" applied successfully`)
  } catch (error) {
    // TODO: Replace with the new logger
    console.log(error)
  }
}

export default updateTranslations
