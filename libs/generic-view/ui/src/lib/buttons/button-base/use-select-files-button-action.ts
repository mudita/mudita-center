/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { openFileRequest } from "system-utils/feature"
import { NativeActionSelectFiles } from "generic-view/models"
import { useViewFormContext } from "generic-view/utils"

export const useSelectFilesButtonAction = () => {
  const getFormContext = useViewFormContext()

  return useCallback(
    async (
      action: NativeActionSelectFiles,
      callbacks: {
        onSuccess?: () => Promise<void>
        onFailure?: () => Promise<void>
      }
    ) => {
      const selectorResponse = await openFileRequest({
        ...(action.multiple
          ? { properties: ["openFile", "multiSelections"] }
          : { properties: ["openFile"] }),
        ...(action.extensions && {
          filters: [
            {
              name: action.extensionsGroupName || "Files",
              extensions: action.extensions,
            },
          ],
        }),
      })
      if (!selectorResponse.ok) {
        await callbacks.onFailure?.()
        return false
      }

      getFormContext(action.formOptions.formKey).setValue(
        action.formOptions.selectedFilesFieldName,
        selectorResponse.data
      )
      await callbacks.onSuccess?.()
      return true
    },
    [getFormContext]
  )
}
