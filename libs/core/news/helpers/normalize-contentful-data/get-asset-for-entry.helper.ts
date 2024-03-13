/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Asset } from "contentful"

export const getAssetForEntry = (
  assets: Asset[],
  assetId?: string
): { title: string; url: string } => {
  if (!assetId) {
    return { title: '', url: '' };
  }

  const asset = assets.find((asset) => asset.sys.id === assetId)

  if (asset && asset.fields.file) {
    const {
      title,
      file: { url },
    } = asset.fields
    return { title, url }
  }

  return { title: "", url: "" }
}
