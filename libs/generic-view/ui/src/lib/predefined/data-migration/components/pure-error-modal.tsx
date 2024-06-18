/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { IconType } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { selectDataMigrationStatus } from "generic-view/store"
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

  const title = intl.formatMessage(messages.title)
  const getDescription = () => {
    switch (dataMigrationStatus) {
      case "PURE-ONBOARDING-REQUIRED":
        return intl.formatMessage(messages.onboardingRequired)
      case "PURE-UPDATE-REQUIRED":
        return intl.formatMessage(messages.updateRequired)
      case "PURE-CRITICAL-BATTERY":
        return intl.formatMessage(messages.criticalBattery)
      default:
        return ""
    }
  }

  return (
    <ErrorModal
      modalIcon={IconType.Information}
      title={title}
      description={getDescription()}
      buttonLabel={intl.formatMessage(messages.closeButtonLabel)}
    />
  )
}
