import { useCallback, useEffect, useMemo, useState } from "react"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { normalizeHelpData } from "Renderer/utils/contentful/normalize-help-data"
import debounce from "lodash/debounce"
import { getDefaultHelpItems } from "App/main/store/default-help-items"

export const useHelpSearch = (
  saveToStore: (data: QuestionAndAnswer) => Promise<any>
) => {
  const [networkStatus, setNetworkStatus] = useState(window.navigator.onLine)
  const [data, setData] = useState<QuestionAndAnswer>({
    collection: [],
    items: {},
  })
  const [searchValue, setSearchValue] = useState("")

  const setDefaultHelpItemsAndSaveToStore = async () => {
    const defaultHelpItems = getDefaultHelpItems() as QuestionAndAnswer
    setData(defaultHelpItems)
    await saveToStore(defaultHelpItems)
  }
  const fetchDataAndSaveToStore = async () => {
    const response = await ipcRenderer.invoke(
      HelpActions.DownloadContentfulData
    )
    const normalizedData = normalizeHelpData(response)
    setData(normalizedData)
    await saveToStore(normalizedData)
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
