/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useState } from "react"
import { QuotationSettings } from "devices/common/models"
import { formatMessage, Messages } from "app-localize/utils"
import { delayUntil } from "app-utils/common"
import {
  createToastContent,
  GenericFailedModal,
  GenericProgressModal,
  useToastContext,
} from "app-theme/ui"
import {
  QuotationsSettingsForm,
  QuotationsSettingsFormProps,
} from "./quotations-settings-form"

export interface QuotationsSettingsFlowProps extends QuotationsSettingsFormProps {
  opened: boolean
  onClose: VoidFunction
  messages: QuotationsSettingsFormProps["messages"] & {
    updateSettingsSuccessToastText: Messages
    updateSettingsProgressModalTitle: Messages
    updateSettingsProgressModalDescription: Messages
    updateSettingsFailedModalTitle: Messages
    updateSettingsFailedModalDescription: Messages
    updateSettingsFailedModalCloseButtonText: Messages
  }
}

enum QuotationsSettingsFlowState {
  Idle = "Idle",
  SettingsForm = "SettingsForm",
  Progress = "Progress",
  Error = "Error",
}

export const QuotationsSettingsFlow: FunctionComponent<
  QuotationsSettingsFlowProps
> = ({
  opened = false,
  settings,
  customQuotationsCount,
  updateSettings,
  onClose,
  messages,
}) => {
  const { addToast } = useToastContext()
  const [previouslyOpened, setPreviouslyOpened] = useState(opened)
  const [flowState, setFlowState] = useState<QuotationsSettingsFlowState>(
    QuotationsSettingsFlowState.Idle
  )

  if (previouslyOpened !== opened) {
    setPreviouslyOpened(opened)
    setFlowState(
      opened
        ? QuotationsSettingsFlowState.SettingsForm
        : QuotationsSettingsFlowState.Idle
    )
  }

  const handleUpdateSettings = async (settings: QuotationSettings) => {
    try {
      setFlowState(QuotationsSettingsFlowState.Progress)
      await delayUntil(updateSettings(settings), 250)
      setFlowState(QuotationsSettingsFlowState.Idle)
      addToast(
        createToastContent({
          text: formatMessage(messages.updateSettingsSuccessToastText),
        })
      )
      onClose()
    } catch {
      setFlowState(QuotationsSettingsFlowState.Error)
    }
  }

  return (
    <>
      <QuotationsSettingsForm
        opened={flowState === QuotationsSettingsFlowState.SettingsForm}
        settings={settings}
        customQuotationsCount={customQuotationsCount}
        updateSettings={handleUpdateSettings}
        onClose={onClose}
        messages={messages}
      />
      <GenericProgressModal
        opened={flowState === QuotationsSettingsFlowState.Progress}
        title={formatMessage(messages.updateSettingsProgressModalTitle)}
        description={formatMessage(
          messages.updateSettingsProgressModalDescription
        )}
      />
      <GenericFailedModal
        opened={flowState === QuotationsSettingsFlowState.Error}
        onClose={onClose}
        title={formatMessage(messages.updateSettingsFailedModalTitle)}
        description={formatMessage(
          messages.updateSettingsFailedModalDescription
        )}
        closeButtonText={formatMessage(
          messages.updateSettingsFailedModalCloseButtonText
        )}
      />
    </>
  )
}
