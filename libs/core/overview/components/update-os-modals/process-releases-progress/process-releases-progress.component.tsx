/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ProcessReleasesProgressProps } from "Core/overview/components/update-os-modals/process-releases-progress/process-releases-progress.interface"
import { ProgressText } from "Core/overview/components/update-os-modals/process-releases-progress/process-releases-progress.styled"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  processReleaseProgressOf: {
    id: "module.overview.processReleaseProgressOf",
  },
})

export const ProcessReleasesProgress: FunctionComponent<
  ProcessReleasesProgressProps
> = ({ currentIndex, totalSize, processText, className }) => {
  return (
    <ProgressText
      className={className}
      displayStyle={TextDisplayStyle.Paragraph3}
      color="info"
    >
      {processText} ({currentIndex}{" "}
      {intl.formatMessage(messages.processReleaseProgressOf)}{" "}
      <span>{totalSize}</span>)
    </ProgressText>
  )
}
