import { useCallback, useEffect, useMemo, useState } from "react"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import debounce from "lodash/debounce"
import { getDefaultHelpItems } from "App/main/store/default-help-items"

export const useHelpSearch = (
  saveToStore?: (data: QuestionAndAnswer) => Promise<any>,
  getStoreData?: (key?: string) => Promise<any>
) => {
  const [networkStatus, setNetworkStatus] = useState(window.navigator.onLine)
  const [data, setData] = useState<QuestionAndAnswer>({
    collection: [],
    items: {},
  })
  const [searchValue, setSearchValue] = useState("")

  const setDefaultHelpItemsAndSaveToStore = async (): Promise<void> => {
    if (getStoreData) {
      const storeData = await getStoreData("data")
      if (storeData) {
        setData(storeData)
      } else {
        const defaultHelpItems = getDefaultHelpItems()
        setData(defaultHelpItems)
        if (saveToStore) {
          await saveToStore(defaultHelpItems)
        }
      }
    }
  }
  const fetchDataAndSaveToStore = async (): Promise<void> => {
    const response: QuestionAndAnswer = await ipcRenderer.callMain(
      HelpActions.DownloadContentfulData
    )
    if (saveToStore) {
      await saveToStore(response)
    }
    if (getStoreData) {
      setData(await getStoreData("data"))
    }
  }

  useEffect(() => {
    if (networkStatus) {
      fetchDataAndSaveToStore()
    } else {
      setDefaultHelpItemsAndSaveToStore()
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
