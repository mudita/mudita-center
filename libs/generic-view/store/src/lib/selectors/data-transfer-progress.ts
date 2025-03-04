/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { createSelector } from "@reduxjs/toolkit"
import { DomainTransferStatus } from "../data-transfer/data-transfer.types"

const getDomainProgress = (status: DomainTransferStatus) => {
  switch (status) {
    case DomainTransferStatus.Idle:
      return 0
    case DomainTransferStatus.Ready:
      return 10
    case DomainTransferStatus.InProgress:
      return 40
    case DomainTransferStatus.Processing:
      return 70
    case DomainTransferStatus.Finished:
      return 100
  }
}

export const selectDataTransferStatus = createSelector(
  (state: ReduxRootState) => state.genericDataTransfer.status,
  (status) => status
)

export const selectDataTransferPostProcessingProgress = createSelector(
  (state: ReduxRootState) => state.genericDataTransfer.postProcessingProgress,
  (progress) => {
    return progress || 0
  }
)

export const selectDataTransferDomains = createSelector(
  (state: ReduxRootState) => state.genericDataTransfer.transfer,
  (transfer) => transfer
)

export const selectDataTransferProgress = createSelector(
  selectDataTransferStatus,
  selectDataTransferDomains,
  selectDataTransferPostProcessingProgress,
  (mainStatus, dataTransfer, postProcessingProgress) => {
    if (mainStatus === "IDLE") {
      return { progress: 0, currentDomain: undefined }
    }
    const domainsCount = Object.keys(dataTransfer).length
    const domainsProgress = Object.values(dataTransfer).reduce(
      (acc, { status }) => {
        return acc + getDomainProgress(status) / domainsCount
      },
      0
    )

    const progress = Math.floor(
      domainsProgress * 0.3 + postProcessingProgress * 0.7
    )

    const currentDomain =
      Object.entries(dataTransfer).find(
        ([, { status }]) => status === DomainTransferStatus.InProgress
      )?.[0] ||
      Object.entries(dataTransfer).find(
        ([, { status }]) => status === DomainTransferStatus.Ready
      )?.[0]

    return {
      progress,
      currentDomain,
    }
  }
)
