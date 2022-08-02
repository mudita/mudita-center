/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useMemo, useState } from "react"
import { QuestionAndAnswer } from "App/help/components/help.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import debounce from "lodash/debounce"
import { getDefaultHelpItems } from "App/__deprecated__/main/store/default-help-items"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHelpSearch = (
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveToStore?: (data: QuestionAndAnswer) => Promise<any>,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchDataAndSaveToStore()
    } else {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      setDefaultHelpItemsAndSaveToStore()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delaySearch = useCallback(
    debounce((value: string) => setSearchValue(value), 1000),
    []
  )

  const filteredData = useMemo(
    () => ({
      ...data,
      collection: Object.keys(data.items ? data.items : [])
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
