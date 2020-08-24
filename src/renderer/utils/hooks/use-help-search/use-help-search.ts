import { useCallback, useEffect, useMemo, useState } from "react"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { normalizeHelpData } from "Renderer/utils/contentful/normalize-help-data"
import debounce from "lodash/debounce"
import { getDefaultHelpItems } from "App/main/store/default-help-items"
import { getAppSettings } from "Renderer/requests/app-settings.request"

export const useHelpSearch = (
  saveToStore?: (data: QuestionAndAnswer) => Promise<any>,
  getStoreData?: (k?: string) => Promise<any>
) => {
  const [networkStatus, setNetworkStatus] = useState(true)
  const [data, setData] = useState<QuestionAndAnswer>({
    collection: [],
    items: {},
  })
  const [searchValue, setSearchValue] = useState("")

  const setDefaultHelpItemsAndSaveToStore = async () => {
    if (getStoreData) {
      const storeData = await getStoreData("data")
      if (storeData) {
        setData(storeData)
      } else {
        const defaultHelpItems = getDefaultHelpItems() as QuestionAndAnswer
        setData(defaultHelpItems)
        if (saveToStore) {
          await saveToStore(defaultHelpItems)
        }
      }
    }
  }
  const fetchDataAndSaveToStore = async () => {
    const languageSettings = await getAppSettings()
    const response = await ipcRenderer.invoke(
      HelpActions.DownloadContentfulData,
      languageSettings.language.tag
    )
    const normalizedData = normalizeHelpData(
      response,
      languageSettings.language.tag
    )
    if (saveToStore) {
      await saveToStore(normalizedData)
    }
    if (getStoreData) {
      setData(await getStoreData("data"))
    }
  }

  useEffect(() => {
    if (!networkStatus) {
      setDefaultHelpItemsAndSaveToStore()
    } else {
      fetchDataAndSaveToStore()
    }
  }, [networkStatus])

  useEffect(() => {
    const handleOnlineStatus = () => setNetworkStatus(window.navigator.onLine)

    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [])

  const searchQuestion = (value: string) => {
    if (value) {
      if (value.length >= 3) {
        delaySearch(value)
      }
    } else {
      delaySearch.cancel()
      setSearchValue("")
    }
  }

  const delaySearch = useCallback(
    debounce((value: string) => setSearchValue(value), 1000),
    []
  )

  const filteredData = useMemo(
    () => ({
      ...data,
      collection: Object.keys(data.items)
        .map((id) => data.items[id])
        .filter(({ question }) =>
          question.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map(({ id }) => id),
    }),
    [data, searchValue]
  )

  return {
    data: filteredData,
    searchQuestion,
  }
}
