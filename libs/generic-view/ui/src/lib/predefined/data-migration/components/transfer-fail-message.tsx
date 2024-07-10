/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useMemo, useRef } from "react"
import { defineMessages } from "react-intl"
import { useSelector } from "react-redux"
import {
  selectDataMigrationFeatures,
  selectDataMigrationStatus,
  selectDataTransferDomains,
  selectDataTransferErrorType,
} from "generic-view/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { isEmpty } from "lodash"
import { ApiFileTransferError } from "device/models"

const messages = defineMessages({
  genericDescription: {
    id: "module.genericViews.dataMigration.failure.genericDescription",
  },
  noChangesDescription: {
    id: "module.genericViews.dataMigration.failure.noChangesDescription",
  },
  cancelledPartialChangesDescription: {
    id: "module.genericViews.dataMigration.cancelled.partialChangesDescription",
  },
  failedPartialChangesDescription: {
    id: "module.genericViews.dataMigration.transferError.partialChangesDescription",
  },
  notEnoughSpace: {
    id: "module.genericViews.dataMigration.transferError.notEnoughSpace",
  },
})

export const TransferFailMessage: FunctionComponent = () => {
  const selectedFeatures = useSelector(selectDataMigrationFeatures)
  const transferDomains = useSelector(selectDataTransferDomains)
  const transferDomainsRef = useRef<typeof transferDomains>()
  const dataMigrationStatus = useSelector(selectDataMigrationStatus)
  const dataTransferErrorType = useSelector(selectDataTransferErrorType)

  const description = useMemo(() => {
    const domains = isEmpty(transferDomainsRef.current)
      ? transferDomains
      : transferDomainsRef.current

    const notEnoughSpaceDescription =
      dataTransferErrorType === ApiFileTransferError.NotEnoughSpace &&
      intl.formatMessage(messages.notEnoughSpace)

    if (isEmpty(domains)) {
      return (
        <p>
          {notEnoughSpaceDescription}{"\n"}
          {intl.formatMessage(messages.genericDescription)}
        </p>
      )
    }

    const transferredDomains = Object.entries(domains)
      .filter(([, { status }]) => status === "FINISHED")
      .map(([domain]) => domain)

    if (isEmpty(transferredDomains)) {
      return <p>{intl.formatMessage(messages.noChangesDescription)}</p>
    }

    const notTransferredFeatures = selectedFeatures.filter((feature) =>
      transferredDomains?.every((domain) => !domain.startsWith(feature))
    )

    return (
      <div>
        <p style={{ marginBottom: "1.4rem" }}>
          {notEnoughSpaceDescription}{"\n"}
          {intl.formatMessage(
            dataMigrationStatus === "CANCELLED"
              ? messages.cancelledPartialChangesDescription
              : messages.failedPartialChangesDescription
          )}
        </p>
        <ul>
          {notTransferredFeatures.map((feature) => (
            <li key={feature}>
              {intl.formatMessage({
                id: `module.genericViews.dataMigration.features.${feature}`,
              })}
            </li>
          ))}
        </ul>
      </div>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMigrationStatus, selectedFeatures, transferDomains])

  useEffect(() => {
    if (isEmpty(transferDomainsRef.current) && !isEmpty(transferDomains)) {
      transferDomainsRef.current = transferDomains
    }
  }, [transferDomains])

  return description
}
