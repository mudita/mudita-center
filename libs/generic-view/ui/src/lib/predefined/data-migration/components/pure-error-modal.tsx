/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { IconType } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import {
  DataMigrationStatus,
  selectDataMigrationStatus,
} from "generic-view/store"
import { defineMessages } from "react-intl"
import { ErrorModal } from "./error-modal"

const messages = defineMessages({
  title: {
    id: "module.genericViews.dataMigration.pureError.title",
  },
  closeButtonLabel: {
    id: "module.genericViews.dataMigration.pureError.closeButtonLabel",
  },
  onboardingRequired: {
    id: "module.genericViews.dataMigration.pureError.onboardingRequired",
  },
  updateRequired: {
    id: "module.genericViews.dataMigration.pureError.updateRequired",
  },
  criticalBattery: {
    id: "module.genericViews.dataMigration.pureError.criticalBattery",
  },
  connectionFailedTitle: {
    id: "module.genericViews.dataMigration.processError.title",
  },
  connectionFailedDescription: {
    id: "module.genericViews.dataMigration.processError.connectionFailed",
  },
})

export const PureErrorModal: FunctionComponent = () => {
  const dataMigrationStatus = useSelector(selectDataMigrationStatus)

  const statuses: DataMigrationStatus[] = [
    "pure-critical-battery",
    "pure-onboarding-required",
    "pure-update-required",
  ]
  const title = intl.formatMessage(messages.title)
  const getDescription = () => {
    switch (dataMigrationStatus) {
      case "pure-onboarding-required":
        return intl.formatMessage(messages.onboardingRequired)
      case "pure-update-required":
        return intl.formatMessage(messages.updateRequired)
      case "pure-critical-battery":
        return intl.formatMessage(messages.criticalBattery)
      default:
        return ""
    }
  }

  return (
    <ErrorModal
      modalKey={"pure-error-modal"}
      modalIcon={IconType.Information}
      statuses={statuses}
      title={title}
      description={getDescription()}
      buttonLabel={intl.formatMessage(messages.closeButtonLabel)}
    />
  )
}
