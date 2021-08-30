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

export const Title = styled(Text)`
  font-size: 3rem;
  font-weight: ${fontWeight("default")};
  margin-bottom: 1.6rem;
  margin-top: 5.4rem;
`

export const TimeText = styled(Text)`
  margin-bottom: 23.4rem;
`

export const messages = defineMessages({
  modalLockedTitle: { id: "component.passcodeModalLocked" },
  modalLockedTime: {id: "component.passcodeModalTryAgainTime"}
})

interface Props {
  time: string
}

const PasscodeLocked: FunctionComponent<Props> = ({ time }) => {
  return (
    <>
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
    </>
  )
}

export default PasscodeLocked
