/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { ModalDialogProps } from "Core/ui"

const messages = defineMessages({
  loadingTitle: {
    id: "module.settings.loadingTitle",
  },
  loadingSubtitle: {
    id: "module.settings.loadingSubtitle",
  },
})

interface Props extends Omit<ModalDialogProps, "close" | "open"> {
  testId?: string
  open: boolean
}

export const AboutLoaderModal: FunctionComponent<Props> = ({
  testId,
  open,
  ...rest
}) => {
  return (
    <LoaderModal
      {...rest}
      testId={testId}
      open={open}
      title={intl.formatMessage(messages.loadingTitle)}
      subtitle={intl.formatMessage(messages.loadingSubtitle)}
    />
  )
}
