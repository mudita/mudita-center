/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { DownloadState } from "App/update/constants"
import { OsRelease } from "App/update/dto"
import appContextMenu from "App/__deprecated__/renderer/wrappers/app-context-menu"
import { useEffect, useState } from "react"

interface Params {
  allReleases: OsRelease[] | null
  updateOs: (releases?: OsRelease[]) => void
  downloadUpdates: (releases?: OsRelease[]) => void
  clearUpdateOsFlow: () => void
  downloadState: DownloadState | null
  updateState: State | null
}

interface Result {
  devRelease: OsRelease | undefined
  downloadDevUpdate: () => void
  startDevUpdate: () => void
  closeDevModal: () => void
  canShowDownloadVersion: boolean
  canShowInstallVersion: boolean
}

export const useDevUpdate = ({
  allReleases,
  downloadUpdates,
  updateOs,
  clearUpdateOsFlow,
  downloadState,
  updateState,
}: Params): Result => {
  const [devRelease, setDevRelease] = useState<OsRelease>()

  useEffect(() => {
    const unregisterItem = appContextMenu.registerItem("Overview", {
      label: "Select Pure OS version to update",
      submenu: allReleases?.length
        ? allReleases.map((release) => {
            const { type, version } = release
            return {
              label: `${type}: ${version}`,
              click: () => {
                setDevRelease(release)
              },
            }
          })
        : [{ label: "No releases available" }],
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return () => unregisterItem()
  }, [allReleases])

  const downloadDevUpdate = () => {
    if (devRelease) {
      downloadUpdates([devRelease])
    }
  }

  const startDevUpdate = () => {
    if (devRelease) {
      updateOs([devRelease])
    }
  }

  const closeDevModal = () => {
    setDevRelease(undefined)
    clearUpdateOsFlow()
  }

  const canShowDownloadVersion =
    Boolean(devRelease) &&
    downloadState === DownloadState.Initial &&
    updateState === State.Initial

  const canShowInstallVersion =
    Boolean(devRelease) &&
    downloadState === DownloadState.Loaded &&
    updateState === State.Initial

  return {
    devRelease,
    downloadDevUpdate,
    startDevUpdate,
    closeDevModal,
    canShowDownloadVersion,
    canShowInstallVersion,
  }
}
