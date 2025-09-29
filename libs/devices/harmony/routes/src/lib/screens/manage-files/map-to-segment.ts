/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatBytes, ISegmentBarItem } from "app-theme/ui"
import { HARMONY_SEGMENTS_CONFIG_MAP } from "./harmony-manage-files.config"
import { SegmentId } from "./harmony-manage-files.types"

export const mapToSegment = (
  key: SegmentId,
  bytes: number
): ISegmentBarItem => {
  const config = HARMONY_SEGMENTS_CONFIG_MAP[key]
  return {
    ...config,
    label: `${config.label} (${formatBytes(bytes, { minUnit: "KB" })})`,
    value: bytes,
  }
}