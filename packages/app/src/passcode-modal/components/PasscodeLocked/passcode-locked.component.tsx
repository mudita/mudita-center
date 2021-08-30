/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
import { defineMessages } from "react-intl"

const PasscodeLockedContainer = styled.div`
  margin-bottom: 4.2rem;
`
export const Title = styled(Text)`
  font-size: 3rem;
  font-weight: ${fontWeight("default")};
  margin-bottom: 1.6rem;
`

export const TimeText = styled(Text)`
  text-align: center;
`

export const messages = defineMessages({
  modalLockedTitle: { id: "component.passcodeModalLocked" },
  modalLockedTime: { id: "component.passcodeModalTryAgainTime" },
})

interface Props {
  time: string
}

const PasscodeLocked: FunctionComponent<Props> = ({ time }) => {
  return (
    <PasscodeLockedContainer>
      <Title
        displayStyle={TextDisplayStyle.PrimaryHeading}
        message={{
          ...messages.modalLockedTitle,
        }}
      />
      <TimeText
        displayStyle={TextDisplayStyle.MediumFadedLightText}
        message={{
          ...messages.modalLockedTime,
          values: { time: time },
        }}
      />
    </PasscodeLockedContainer>
  )
}

export default PasscodeLocked
