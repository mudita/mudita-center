/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
import { defineMessages, FormattedMessage } from "react-intl"
import moment from "moment"
import { PasscodeLockedTestIds } from "App/passcode-modal/components/PasscodeLocked/passcode-locked-test-ids.enum"

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
  modalLockedTitle: { id: "component.passcodeModalLocked" }
})

interface Props {
  time: number
}

const PasscodeLocked: FunctionComponent<Props> = ({ time }) => {
  const [currentTime, setCurrentTime] = useState<number>(time)

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime > 0) {
        setCurrentTime((prevSec) => prevSec - 1)
      }
      if (currentTime <= 0) {
        clearInterval(interval)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [currentTime])

  const formatTime = () => {
      const endDate = moment().add(currentTime, "s").format()
      return moment(endDate).fromNow() + "."
  }
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
        data-testid={PasscodeLockedTestIds.Timer}
      >
        <FormattedMessage id="component.passcodeModalTryAgain" />
        {" " + formatTime()}
      </TimeText>
    </PasscodeLockedContainer>
  )
}

export default PasscodeLocked
