/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useMemo, useRef } from "react"
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
import { FunctionComponent } from "Core/core/types/function-component.interface"

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
    const transferredDomains = Object.entries(domains)
      .filter(([, { status }]) => status === "FINISHED")
      .map(([domain]) => domain)
    const notTransferredFeatures = selectedFeatures.filter((feature) =>
      transferredDomains?.every((domain) => !domain.startsWith(feature))
    )

    const notEnoughSpace =
      dataTransferErrorType === ApiFileTransferError.NotEnoughSpace

    if (notEnoughSpace && isEmpty(domains)) {
      return (
        <p>
          {intl.formatMessage(messages.notEnoughSpace)}{" "}
          {intl.formatMessage(messages.noChangesDescription)}
        </p>
      )
    }

    if (notEnoughSpace || !isEmpty(transferredDomains)) {
      return (
        <div>
          <p style={{ marginBottom: "1.4rem" }}>
            {notEnoughSpace && (
              <>{intl.formatMessage(messages.notEnoughSpace)} </>
            )}
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
    }

    if (!isEmpty(domains) && isEmpty(transferredDomains)) {
      return <p>{intl.formatMessage(messages.noChangesDescription)}</p>
    }

    return <p>{intl.formatMessage(messages.genericDescription)}</p>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMigrationStatus, selectedFeatures, transferDomains])

  useEffect(() => {
    if (isEmpty(transferDomainsRef.current) && !isEmpty(transferDomains)) {
      transferDomainsRef.current = transferDomains
    }
  }, [transferDomains])

  return description
}
