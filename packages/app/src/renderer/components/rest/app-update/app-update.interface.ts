/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export interface AvailableAppUpdateInterface {
  onDownload?: () => void
}

export interface DownloadedAppUpdateInterface {
  onInstall?: () => void
}
