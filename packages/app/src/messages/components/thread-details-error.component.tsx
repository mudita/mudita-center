/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { MouseEventHandler } from "react"
import { defineMessages } from "react-intl"
import { ThreadDetailsTestIds } from "App/messages/components/thread-details-test-ids.enum"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  ColumnContent,
  RetryButton,
} from "App/messages/components/thread-details.styled"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"

const translations = defineMessages({
  errorText: {
    id: "module.messages.modal.loadingThreadError.body",
  },
  tryAgainButtonText: { id: "component.modal.data.errorWithRetry.button" },
})

interface Properties {
  onClick?: MouseEventHandler
}

const ThreadDetailsError: FunctionComponent<Properties> = ({ onClick }) => {
  return (
    <ColumnContent>
      <Text
        displayStyle={TextDisplayStyle.LargeFadedText}
        message={translations.errorText}
        data-testid={ThreadDetailsTestIds.ErrorText}
      />
      <RetryButton
        displayStyle={DisplayStyle.Primary}
        labelMessage={translations.tryAgainButtonText}
        onClick={onClick}
        data-testid={ThreadDetailsTestIds.RetryButton}
      />
    </ColumnContent>
  )
}

export default ThreadDetailsError
