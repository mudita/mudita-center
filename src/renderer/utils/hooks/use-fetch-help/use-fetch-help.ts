import { useEffect, useState } from "react"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { normalizeHelpData } from "Renderer/utils/contentful/normalize-help-data"

export const useFetchHelp = (
  saveToStore?: (data: QuestionAndAnswer) => Promise<any>
) => {
  const [data, setData] = useState<QuestionAndAnswer>({
    collection: [],
    items: {},
  })
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

  return {
    data,
    setData,
  }
}
