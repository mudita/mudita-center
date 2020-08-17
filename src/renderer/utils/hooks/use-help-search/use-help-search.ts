import { ChangeEvent, useEffect, useState } from "react"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { normalizeHelpData } from "Renderer/utils/contentful/normalize-help-data"

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

  const searchQuestion = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value)
    const filteredIds = Object.keys(data.items)
      .map((id) => data.items[id])
      .filter(({ question }) =>
        question.toLowerCase().includes(target.value.toLowerCase())
      )
      .map(({ id }) => id)
    setData({
      ...data,
      collection: filteredIds,
    })
  }

  return {
    data,
    searchQuestion,
    searchValue,
  }
}
