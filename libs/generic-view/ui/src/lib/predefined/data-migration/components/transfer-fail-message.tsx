/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useMemo, useState } from "react"
import { defineMessages } from "react-intl"
import { useSelector } from "react-redux"
import {
  DataMigrationStatus,
  selectDataMigrationStatus,
  selectDataTransferErrorType,
} from "generic-view/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ApiFileTransferError } from "device/models"
import { FunctionComponent } from "Core/core/types/function-component.interface"

const messages = defineMessages({
  noChangesDescription: {
    id: "module.genericViews.dataMigration.failure.noChangesDescription",
  },
  partialChangesDescription: {
    id: "module.genericViews.dataMigration.failure.partialChangesDescription",
  },
  notEnoughSpace: {
    id: "module.genericViews.dataMigration.failure.notEnoughSpace",
  },
})

export const TransferFailMessage: FunctionComponent = () => {
  const dataMigrationStatus = useSelector(selectDataMigrationStatus)
  const dataTransferErrorType = useSelector(selectDataTransferErrorType)
  const [partialChanges, setPartialChanges] = useState(false)

  const description = useMemo(() => {
    const notEnoughSpace =
      dataTransferErrorType === ApiFileTransferError.NotEnoughSpace

    return (
      <p>
        {notEnoughSpace && (
          <>
            {intl.formatMessage(messages.notEnoughSpace)}
            <br />
          </>
        )}
        {partialChanges
          ? intl.formatMessage(messages.partialChangesDescription)
          : intl.formatMessage(messages.noChangesDescription)}
      </p>
    )
  }, [dataTransferErrorType, partialChanges])

  useEffect(() => {
    if (
      ![
        DataMigrationStatus.Failed,
        DataMigrationStatus.Cancelled,
        DataMigrationStatus.Completed,
      ].includes(dataMigrationStatus)
    ) {
      setPartialChanges(
        dataMigrationStatus === DataMigrationStatus.DataTransferring
      )
    }
  }, [dataMigrationStatus])

  return description
}
