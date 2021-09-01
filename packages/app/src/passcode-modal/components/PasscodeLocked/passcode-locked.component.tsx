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
  const [sec, setSec] = useState<number>(time)

  useEffect(() => {
    const interval = setInterval(() => {
      if (sec > 0) {
        setSec((prevSec) => prevSec - 1)
      }
      if (sec === 0) {
        clearInterval(interval)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [sec])

  const formatTime = () => {
    if (sec < 60) {
      return `${moment.utc(sec * 1000).format("ss")} sec.`
    } else if (sec >= 60 && sec < 3600) {
      return `${moment.utc(sec * 1000).format("mm:ss")} min.`
    } else if (sec >= 3600 && sec < 86400) {
      return `${moment.utc(sec * 1000).format("HH:mm:ss")} h.`
    } else {
      const endDate = moment().add(sec, "s").format()
      return moment(endDate).toNow(true) + "."
    }
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
        {" in " + formatTime()}
      </TimeText>
    </PasscodeLockedContainer>
  )
}

export default PasscodeLocked
