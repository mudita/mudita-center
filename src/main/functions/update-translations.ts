import settingsStore from "App/main/store/settings"
import axios from "axios"
import translationStores from "App/main/store/translations"

const updateTranslations = async () => {
  const language = settingsStore.get("language")?.tag || "en-US"

  try {
    const { data } = await axios.get(
      `https://api.phrase.com/v2/projects/${process.env.PHRASE_PROJECT_ID}/locales/${language}/download`,
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
