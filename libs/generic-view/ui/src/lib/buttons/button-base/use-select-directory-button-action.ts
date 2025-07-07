/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { chooseDirectoryRequest } from "system-utils/feature"
import { NativeActionSelectDirectory } from "generic-view/models"
import { useViewFormContext } from "generic-view/utils"
import { ipcRenderer } from "electron-better-ipc"

export const useSelectDirectoryButtonAction = () => {
  const getFormContext = useViewFormContext()
  return useCallback(
    async (action: NativeActionSelectDirectory) => {
      const downloadsPath = (await ipcRenderer.callMain(
        "get-downloads-path"
      )) as string

      const selectorResponse = await chooseDirectoryRequest({
        title: action.title || "Choose a directory to export",
        properties: ["openDirectory", "createDirectory"],
        defaultPath: downloadsPath,
      })

      if (!selectorResponse.ok || !selectorResponse.data.length) {
        return false
      }

      getFormContext(action.formOptions.formKey).setValue(
        action.formOptions.selectedDirectoryFieldName,
        selectorResponse.data
      )

      return true
    },
    [getFormContext]
  )
}
