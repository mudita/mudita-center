/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { createSelector } from "@reduxjs/toolkit"
import { DomainTransferStatus } from "generic-view/store"

const domainStepsCount = 3

const getDomainProgress = (status: DomainTransferStatus) => {
  switch (status) {
    case "IDLE":
      return 0
    case "READY":
      return 0.5
    case "IN-PROGRESS":
      return 2
    case "PROCESSING":
      return domainStepsCount
  }
}

export const selectDataTransferProgress = createSelector(
  (state: ReduxRootState) => state.genericDataTransfer.status,
  (state: ReduxRootState) => state.genericDataTransfer.transfer,
  (mainStatus, dataTransfer) => {
    if (mainStatus === "IDLE") {
      return { progress: 0, currentDomain: undefined }
    }
    if (mainStatus === "FINALIZING") {
      return { progress: 90, currentDomain: undefined }
    }

    const progress = Object.entries(dataTransfer).reduce(
      (acc, [, { status }]) => {
        const domainProgressStep =
          89 / Object.keys(dataTransfer).length / domainStepsCount
        return acc + getDomainProgress(status) * domainProgressStep
      },
      0
    )

    const currentDomain =
      Object.entries(dataTransfer).find(
        ([, { status }]) => status === "IN-PROGRESS"
      )?.[0] ||
      Object.entries(dataTransfer).find(
        ([, { status }]) => status === "READY"
      )?.[0]

    return {
      progress,
      currentDomain,
    }
  }
)
