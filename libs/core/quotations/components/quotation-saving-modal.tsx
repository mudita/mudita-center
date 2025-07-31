/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  title: {
    id: "module.quotations.quotationSavingModal.title",
  },
  subtitle: {
    id: "module.quotations.quotationSavingModal.subtitle",
  },
  description: {
    id: "module.quotations.quotationSavingModal.description",
  },
})

interface Props {
  opened?: boolean
}

export const QuotationSavingModal: FunctionComponent<Props> = ({ opened = false }) => {
  return (
    <LoaderModal
      open={opened}
      title={intl.formatMessage(messages.title)}
      subtitle={intl.formatMessage(messages.subtitle)}
      body={intl.formatMessage(messages.description)}
    />
  )
}
