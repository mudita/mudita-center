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
  const FormData = require("form-data")

  require("dotenv").config({
    path: path.join(__dirname, "../../../.env"),
  })

  interface AvailableLanguage {
    id: string
    code: string
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

  const uploadTranslations = async (languageId: string, filePath: string) => {
    try {
      await fs.ensureFileSync(path.resolve(filePath))

      const formData = new FormData()
      formData.append("file_format", "react_simple_json")
      formData.append("locale_id", languageId)
      formData.append("file", fs.createReadStream(filePath))

      await axios.post(`${phraseUrl}/uploads`, formData, {
        headers: {
          ...axiosDevConfig.headers,
          ...formData.getHeaders(),
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTranslation = async (ids: string[]) => {
    try {
      ids.forEach(async (id) => {
        await axios.delete(`${phraseUrl}/keys/${id}`, {
          ...axiosDevConfig,
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateInternalTranslations = async (
    languageId: string,
    filePath: string
  ) => {
    try {
      const { data } = await axios.get(`${localesUrl}/${languageId}/download`, {
        ...axiosConfig,
        params: { file_format: "react_simple_json" },
      })

      await fs.writeJson(path.resolve(filePath), data)
    } catch (error) {
      console.log(error)
    }
  }

  const script = async () => {
    try {
      console.log(`Syncing local translations with phrase.com`)

      const localesDir = "./src/renderer/locales/default/"

      availableLanguages.forEach(async (language: AvailableLanguage) => {
        const localesJsonPath = path.join(localesDir, `${language.code}.json`)

        await uploadTranslations(language.id, localesJsonPath)

        const internalTranslations = await fs.readJsonSync(localesJsonPath)
        const externalTranslations = await getTranslations(language.id)

        const removedDiff = externalTranslations.reduce(
          (acc: string[], value: ExternalKey) => {
            if (!internalTranslations.hasOwnProperty(value.key.name)) {
              acc.push(value.key.id)
            }

            return acc
          },
          []
        )

        await deleteTranslation(removedDiff)
        await updateInternalTranslations(language.id, localesJsonPath)
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  script()
}
