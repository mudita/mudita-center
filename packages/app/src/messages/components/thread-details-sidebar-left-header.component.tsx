/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  NameWrapper,
  PhoneNumberText,
} from "App/messages/components/thread-details.styled"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

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
          displayStyle={TextDisplayStyle.QuaternaryHeading}
          data-testid="sidebar-fullname"
        >
          {prettyCaller}
        </Text>
        {callerIdentification !== "" && (
          <Text
            displayStyle={TextDisplayStyle.LightText}
            data-testid="multiple-number"
          >
            &nbsp;
            {callerIdentification}
          </Text>
        )}
      </NameWrapper>
      {callerNumber !== "" && (
        <PhoneNumberText
          displayStyle={TextDisplayStyle.LightText}
          data-testid="sidebar-phone-number"
        >
          {callerNumber}
        </PhoneNumberText>
      )}
    </>
  )
}

export default ThreadDetailsSidebarLeftHeader
