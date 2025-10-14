/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useEffect, useState } from "react"
import {
  createToastContent,
  GenericFailedModal,
  GenericProgressModal,
  useToastContext,
} from "app-theme/ui"
import { formatMessage, Messages } from "app-localize/utils"
import { QuotationSettings } from "../quotations.types"
import {
  QuotationsSettingsForm,
  QuotationsSettingsFormProps,
} from "./quotations-settings-form"

export interface QuotationsSettingsFlowProps
  extends QuotationsSettingsFormProps {
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
  const [flowState, setFlowState] = useState<QuotationsSettingsFlowState>(
    QuotationsSettingsFlowState.Idle
  )

  useEffect(() => {
    setFlowState(
      opened
        ? QuotationsSettingsFlowState.SettingsForm
        : QuotationsSettingsFlowState.Idle
    )
  }, [opened])

  const handleUpdateSettings = async (settings: QuotationSettings) => {
    setFlowState(QuotationsSettingsFlowState.Progress)
    const result = await updateSettings(settings)
    if (!result.ok) {
      setFlowState(QuotationsSettingsFlowState.Error)
      return result
    }
    setFlowState(QuotationsSettingsFlowState.Idle)
    addToast(
      createToastContent({
        text: formatMessage(messages.updateSettingsSuccessToastText),
      })
    )
    onClose()
    return result
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
        buttonText={formatMessage(
          messages.updateSettingsFailedModalCloseButtonText
        )}
      />
    </>
  )
}
