import settingsStore from "App/main/store/settings"
import axios from "axios"
import translationStores from "App/main/store/translations"
import { availableLanguages } from "App/translations.config.json"

const updateTranslations = async () => {
  const language = settingsStore.get("language") as string
  const id = availableLanguages.find(({ code }) => code === language)?.id

  try {
    if (!id) {
      Promise.reject(
        new Error(
          `There's no ID assigned to language (${language}) selected in settings.`
        )
      )
    }
    const { data } = await axios.get(
      `${process.env.PHRASE_API_URL}/locales/${id || "en"}/download`,
      {
        headers: {
          Authorization: `token ${process.env.PHRASE_API_KEY}`,
        },
        params: { file_format: "react_simple_json" },
      }
    )

    translationStores[language].store = data
  } catch (error) {
    // TODO: Replace with the new logger
    console.log(error)
  }
}

export default updateTranslations
