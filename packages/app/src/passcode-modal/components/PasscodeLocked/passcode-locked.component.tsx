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
  modalLockedTitle: { id: "component.passcodeModalLocked" },
})

interface Props {
  time: number
}

const PasscodeLocked: FunctionComponent<Props> = ({ time }) => {
  const calculateInitDifference = () => {
    return moment.unix(time).diff(moment(), "s")
  }
  const [currentDifference, setCurrentDifference] = useState<number>(
    calculateInitDifference
  )

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentDifference > 0) {
        setCurrentDifference((prevSec) => prevSec - 1)
      }
      if (currentDifference <= 1) {
        clearInterval(interval)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [currentDifference])

  const formatTime = () => {
    const endDate = moment.unix(time)
    return moment(endDate).fromNow() + "."
  }
  return (
    <PasscodeLockedContainer data-testid={PasscodeLockedTestIds.Container}>
      <Title
        displayStyle={TextDisplayStyle.PrimaryHeading}
        message={{
          ...messages.modalLockedTitle,
        }}
      />
      <TimeText
        displayStyle={TextDisplayStyle.LightText}
        data-testid={PasscodeLockedTestIds.Timer}
        color="secondary"
      >
        <FormattedMessage id="component.passcodeModalTryAgain" />
        {" " + formatTime()}
      </TimeText>
    </PasscodeLockedContainer>
  )
}

export default PasscodeLocked
