/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { useBrowse } from "./use-browse"
import { OpenDialogOptionsLite } from "app-utils/models"

type UseBrowseForDirectoryArgs = {
  opened: boolean
  openDirectoryDialog: (
    options: OpenDialogOptionsLite
  ) => Promise<string | null>
  onSelect: (directoryPath: string) => void
  onCancel: () => void
}

export function useBrowseForDirectory({
  opened,
  openDirectoryDialog,
  onSelect,
  onCancel,
}: UseBrowseForDirectoryArgs) {
  const runDialog = useCallback(async () => {
    const directoryPath = await openDirectoryDialog({
      properties: ["openDirectory"],
    })
    return directoryPath ?? null
  }, [openDirectoryDialog])

  useBrowse<string>({
    opened,
    runDialog,
    onSelect,
    onCancel,
  })
}
