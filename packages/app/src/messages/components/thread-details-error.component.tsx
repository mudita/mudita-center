/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { MouseEventHandler } from "react"
import { defineMessages } from "react-intl"
import { ThreadDetailsTestIds } from "App/messages/components/thread-details-test-ids.enum"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  ColumnContent,
  RetryButton,
} from "App/messages/components/thread-details.styled"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"

const translations = defineMessages({
  errorText: {
    id: "module.messages.loadingThreadModalErrorBody",
  },
  tryAgainButtonText: { id: "component.dataModalErrorWithRetryButton" },
})

interface Properties {
  onClick?: MouseEventHandler
}

const ThreadDetailsError: FunctionComponent<Properties> = ({ onClick }) => {
  return (
    <ColumnContent>
      <Text
        displayStyle={TextDisplayStyle.Paragraph1}
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
