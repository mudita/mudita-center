/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadRowNameTestIds } from "Core/messages/components/thread-row-name/thread-row-name-test-ids"
import { ThreadRowNameProps } from "Core/messages/components/thread-row-name/thread-row-name.interface"
import { PhoneNumberDesignator } from "Core/messages/components/thread-row-name/thread-row-name.styled"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import {
  Name,
  NameWrapper,
} from "Core/__deprecated__/renderer/components/rest/messages/threads-table.component"
import getPrettyCaller from "Core/messages/helpers/get-pretty-caller"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import React from "react"

const ThreadRowName: FunctionComponent<ThreadRowNameProps> = ({
  contact,
  phoneNumber,
}) => {
  return (
    <NameWrapper>
      <Name
        displayStyle={TextDisplayStyle.Headline4}
        testId={ThreadRowNameTestIds.NameField}
      >
        {getPrettyCaller(contact, phoneNumber)}
      </Name>
      {Boolean(phoneNumber && contact?.secondaryPhoneNumber) && (
        <PhoneNumberDesignator
          displayStyle={TextDisplayStyle.Paragraph2}
          testId={ThreadRowNameTestIds.PhoneNumberDesignatorField}
        >
          &nbsp;
          {phoneNumber.split(" ").join("") ===
          contact?.secondaryPhoneNumber?.split(" ").join("")
            ? "#2"
            : "#1"}
        </PhoneNumberDesignator>
      )}
    </NameWrapper>
  )
}

export default ThreadRowName
