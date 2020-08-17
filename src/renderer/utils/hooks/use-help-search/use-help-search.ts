import { useCallback, useEffect, useMemo, useState } from "react"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { normalizeHelpData } from "Renderer/utils/contentful/normalize-help-data"
import debounce from "lodash/debounce"

export const useHelpSearch = (
  saveToStore?: (data: QuestionAndAnswer) => Promise<any>
) => {
  const [data, setData] = useState<QuestionAndAnswer>({
    collection: [],
    items: {},
  })
  const [searchValue, setSearchValue] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      const response = await ipcRenderer.invoke(
        HelpActions.DownloadContentfulData
      )
      const normalizedData = normalizeHelpData(response)
      setData(normalizedData)
      if (saveToStore) {
        await saveToStore(normalizedData)
      }
    }

    fetchData()
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
