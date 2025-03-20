/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsData } from "news/models"

export const getAssetForEntry = (
  data?: NewsData,
  assetId?: string
): { title: string; url: string } => {
  if (!assetId) {
    return { title: "", url: "" }
  }

  const asset = data?.includes?.Asset?.find((asset) => asset.sys.id === assetId)

  if (asset && asset.fields.file) {
    const {
      title,
      file: { url },
    } = asset.fields
    return { title: (title as string) || "", url: (url as string) || "" }
  }

  return { title: "", url: "" }
}
