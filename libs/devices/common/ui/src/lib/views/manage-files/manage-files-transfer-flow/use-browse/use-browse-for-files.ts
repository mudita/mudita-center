/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { OpenDialogOptionsLite } from "app-utils/models"
import { FileManagerFile } from "../../manage-files.types"
import { useBrowse } from "./use-browse"

type UseBrowseForFilesArgs = {
  opened: boolean
  supportedFileTypes: string[]
  openFileDialog: (options: OpenDialogOptionsLite) => Promise<FileManagerFile[]>
  onSelect: (files: FileManagerFile[]) => void
  onCancel: () => void
}

export function useBrowseForFiles({
  opened,
  supportedFileTypes,
  openFileDialog,
  onSelect,
  onCancel,
}: UseBrowseForFilesArgs) {
  const runDialog = useCallback(async () => {
    const files = await openFileDialog({
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "Files", extensions: supportedFileTypes }],
    })

    if (!files || files.length === 0) {
      return null
    }

    return files
  }, [openFileDialog, supportedFileTypes])

  useBrowse<FileManagerFile[]>({
    opened,
    runDialog,
    onSelect,
    onCancel,
  })
}
