/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useRef } from "react"
import { OpenDialogOptionsLite } from "app-utils/models"
import { FileManagerFile } from "../manage-files.types"

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
  const inFlightRef = useRef(false)
  const lastOpenedRef = useRef(false)

  useEffect(() => {
    if (!lastOpenedRef.current && opened && !inFlightRef.current) {
      inFlightRef.current = true
      const run = async () => {
        try {
          const files = await openFileDialog({
            properties: ["openFile", "multiSelections"],
            filters: [{ name: "Files", extensions: supportedFileTypes }],
          })

          if (files && files.length > 0) {
            onSelect(files)
          } else {
            onCancel()
          }
        } catch {
          onCancel()
        } finally {
          inFlightRef.current = false
        }
      }
      void run()
    }

    lastOpenedRef.current = opened
  }, [opened, openFileDialog, onSelect, onCancel, supportedFileTypes])
}
