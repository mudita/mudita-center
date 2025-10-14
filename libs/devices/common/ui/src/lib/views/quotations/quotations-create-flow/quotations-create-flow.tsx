/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useEffect, useState } from "react"
import { AppResult } from "app-utils/models"
import { formatMessage, Messages } from "app-localize/utils"
import {
  createToastContent,
  GenericFailedModal,
  GenericProgressModal,
  useToastContext,
} from "app-theme/ui"
import { NewQuotation } from "devices/common/models"
import {
  QuotationsCreateForm,
  QuotationsCreateFormProps,
} from "./quotations-create-form"

export interface QuotationsCreateFlowProps {
  opened?: boolean
  onClose: VoidFunction
  createQuotation: (quotation: NewQuotation) => Promise<AppResult>
  messages: QuotationsCreateFormProps["messages"] & {
    createSuccessToastText: Messages
    createProgressModalTitle: Messages
    createProgressModalDescription: Messages
    createFailedModalTitle: Messages
    createFailedModalDescription: Messages
    createFailedModalCloseButtonText: Messages
  }
}

enum QuotationsCreateFlowState {
  Idle = "Idle",
  CreateForm = "CreateForm",
  Progress = "Progress",
  Error = "Error",
}

export const QuotationsCreateFlow: FunctionComponent<
  QuotationsCreateFlowProps
> = ({ opened = false, onClose, createQuotation, messages }) => {
  const { addToast } = useToastContext()
  const [flowState, setFlowState] = useState<QuotationsCreateFlowState>(
    QuotationsCreateFlowState.Idle
  )

  useEffect(() => {
    setFlowState(
      opened
        ? QuotationsCreateFlowState.CreateForm
        : QuotationsCreateFlowState.Idle
    )
  }, [opened])

  const onSave: QuotationsCreateFormProps["onSave"] = async (quotation) => {
    setFlowState(QuotationsCreateFlowState.Progress)
    const result = await createQuotation(quotation)
    if (!result.ok) {
      setFlowState(QuotationsCreateFlowState.Error)
      return
    }
    onClose()
    setFlowState(QuotationsCreateFlowState.Idle)
    addToast(
      createToastContent({
        text: formatMessage(messages.createSuccessToastText),
      })
    )
  }
  const closeQuotationsCreateForm = () => {
    setFlowState(QuotationsCreateFlowState.Idle)
    onClose()
  }

  return (
    <>
      <QuotationsCreateForm
        opened={flowState === QuotationsCreateFlowState.CreateForm}
        onClose={closeQuotationsCreateForm}
        onSave={onSave}
        messages={messages}
      />
      <GenericProgressModal
        opened={flowState === QuotationsCreateFlowState.Progress}
        title={formatMessage(messages.createProgressModalTitle)}
        description={formatMessage(messages.createProgressModalDescription)}
      />
      <GenericFailedModal
        opened={flowState === QuotationsCreateFlowState.Error}
        onClose={closeQuotationsCreateForm}
        title={formatMessage(messages.createFailedModalTitle)}
        description={formatMessage(messages.createFailedModalDescription)}
        buttonText={formatMessage(messages.createFailedModalCloseButtonText)}
      />
    </>
  )
}
