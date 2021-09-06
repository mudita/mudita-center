namespace SyncTranslation {
  const axios = require("axios")
  const path = require("path")
  const fs = require("fs-extra")
  const { availableLanguages } = require("../src/translations.config.json")
  const {
    localesUrl,
    phraseUrl,
    axiosConfig,
    axiosDevConfig,
  } = require("../src/common/configs/phrase")

  require("dotenv").config({
    path: path.join(__dirname, "../../../.env"),
  })

  interface InternalNewKey {
    name: string
    content: string
  }

  interface ExternalKey {
    id: string
    content: string
    unverified: boolean
    excluded: boolean
    plural_suffix: string
    key: {
      id: string
      name: string
      plural: boolean
      data_type: string
      tags: string[]
    }
    created_at: string
    updated_at: string
    placeholders: string[]
    state: string
    locale: {
      id: string
      name: string
      code: string
    }
  }

  const getTranslations = async (
    languageId: string
  ): Promise<ExternalKey[]> => {
    let haveData = true
    let currentPage = 0
    let translations = []

    try {
      while (haveData) {
        const { data } = await axios.get(
          `${localesUrl}/${languageId}/translations`,
          {
            ...axiosConfig,
            params: {
              per_page: 100,
              page: currentPage + 1,
            },
          }
        )

        if (data.length) {
          translations.push(...data)
          currentPage++
        } else {
          haveData = false
        }
      }

      return translations
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const addTranslation = async (
    values: InternalNewKey[],
    languageId: string
  ) => {
    for await (const item of values) {
      const { data: keyData } = await axios.post(
        `${phraseUrl}/keys`,
        {
          name: item.name,
        },
        {
          ...axiosDevConfig,
        }
      )

      return axios.post(
        `${phraseUrl}/translations`,
        {
          key_id: keyData.id,
          locale_id: languageId,
          content: item.content,
        },
        {
          ...axiosDevConfig,
        }
      )
    }
  }

  const updateInternalTranslations = async (
    languageId: string,
    filePath: string
  ) => {
    const { data } = await axios.get(`${localesUrl}/${languageId}/download`, {
      ...axiosConfig,
      params: { file_format: "react_simple_json" },
    })

    return fs.writeJsonSync(path.resolve(filePath), data)
  }

  const script = async () => {
    try {
      console.log(`Syncing local translations with phrase.com`)

      const localesDir = "./src/renderer/locales/default/"

      for await (const language of availableLanguages) {
        const localesJsonPath = path.join(localesDir, `${language.code}.json`)
        const internalTranslations = await fs.readJsonSync(localesJsonPath)
        const externalTranslations = await getTranslations(language.id)

        const addedKeysDiff = Object.keys(internalTranslations).reduce(
          (acc: InternalNewKey[], value: string) => {
            const externalTranslation = externalTranslations.find(
              (item) => item.key.name === value
            )

            if (!externalTranslation) {
              acc.push({ name: value, content: internalTranslations[value] })
            }

            return acc
          },
          []
        )

        await addTranslation(addedKeysDiff, language.id)
        await updateInternalTranslations(language.id, localesJsonPath)
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  script()
}
