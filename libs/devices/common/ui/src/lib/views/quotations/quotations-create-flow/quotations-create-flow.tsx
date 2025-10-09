/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useEffect, useState } from "react"
import { AppResult } from "app-utils/models"
import { formatMessage } from "app-localize/utils"
import {
  GenericFailedModal,
  GenericProgressModal,
  useToastContext,
} from "app-theme/ui"
import { NewQuotation } from "../quotations.types"
import { createManageFilesToastContent } from "../../manage-files/create-manage-files-toast-content"
import { quotationsMessages } from "../quotations.messages"
import {
  QuotationsCreateForm,
  QuotationsCreateFormProps,
} from "./quotations-create-form"

export interface QuotationsCreateFlowProps {
  opened?: boolean
  onClose: VoidFunction
  createQuotation: (quotation: NewQuotation) => Promise<AppResult>
}

enum QuotationsCreateFlowState {
  Idle = "Idle",
  CreateForm = "CreateForm",
  Progress = "Progress",
  Error = "Error",
}

export const QuotationsCreateFlow: FunctionComponent<
  QuotationsCreateFlowProps
> = ({ opened = false, onClose, createQuotation }) => {
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
      createManageFilesToastContent({
        text: formatMessage(quotationsMessages.createSuccessToastText),
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
      />
      <GenericProgressModal
        opened={flowState === QuotationsCreateFlowState.Progress}
        title={formatMessage(quotationsMessages.createProgressModalTitle)}
        description={formatMessage(
          quotationsMessages.createProgressModalDescription
        )}
      />
      <GenericFailedModal
        opened={flowState === QuotationsCreateFlowState.Error}
        onClose={closeQuotationsCreateForm}
        title={formatMessage(quotationsMessages.createFailedModalTitle)}
        description={formatMessage(
          quotationsMessages.createFailedModalDescription
        )}
        buttonText={formatMessage(
          quotationsMessages.createFailedModalCloseButtonText
        )}
      />
    </>
  )
}
