/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  NameWrapper,
  PhoneNumberText,
} from "App/messages/components/thread-details.styled"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"

interface Props {
  prettyCaller: string
  callerIdentification?: string
  callerNumber?: string
}

const ThreadDetailsSidebarLeftHeader: FunctionComponent<Props> = ({
  prettyCaller,
  callerIdentification = "",
  callerNumber = "",
}) => {
  return (
    <>
      <NameWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline4}
          data-testid="sidebar-fullname"
        >
          {prettyCaller}
        </Text>
        {callerIdentification !== "" && (
          <Text
            displayStyle={TextDisplayStyle.Paragraph4}
            data-testid="multiple-number"
          >
            &nbsp;
            {callerIdentification}
          </Text>
        )}
      </NameWrapper>
      {callerNumber !== "" && (
        <PhoneNumberText
          displayStyle={TextDisplayStyle.Paragraph4}
          data-testid="sidebar-phone-number"
        >
          {callerNumber}
        </PhoneNumberText>
      )}
    </>
  )
}

export default ThreadDetailsSidebarLeftHeader
