/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useMemo, useState } from "react"
import { AppActions, AppFileSystem } from "app-utils/renderer"
import { OpenDialogOptionsLite } from "app-utils/models"
import { FileManagerFile, FileManagerFileMap } from "devices/common/ui"

const mapToFileManagerFile = async (
  filePath: string
): Promise<FileManagerFile> => {
  const stats = await AppFileSystem.fileStats({
    fileAbsolutePath: filePath,
    absolute: true,
  })

  const size = stats.ok ? stats.data.size : 0

  return {
    id: filePath,
    name: filePath.split(/\\|\//g).reverse()[0],
    size: size,
    type: "file",
    path: filePath,
    mimeType: "",
  }
}

export const openFileDialog = async (
  options: OpenDialogOptionsLite
): Promise<FileManagerFile[]> => {
  const filePaths = await AppActions.openFileDialog(options)
  const files: FileManagerFile[] = []
  for (const filePath of filePaths)
    files.push(await mapToFileManagerFile(filePath))
  return files
}

export function useManageFilesSelection(params: {
  categories: { id: string }[]
  categoryFileMap: Record<string, Record<string, unknown>>
}) {
  const { categories, categoryFileMap } = params

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    categories[0]?.id
  )

  useEffect(() => {
    if (activeCategoryId !== undefined) {
      return
    }
    setActiveCategoryId(categories[0]?.id)
  }, [activeCategoryId, categories])

  const activeFileMap = useMemo(
    () =>
      (activeCategoryId
        ? (categoryFileMap[activeCategoryId] ?? {})
        : {}) as FileManagerFileMap,
    [activeCategoryId, categoryFileMap]
  )

  return { activeCategoryId, setActiveCategoryId, activeFileMap }
}
