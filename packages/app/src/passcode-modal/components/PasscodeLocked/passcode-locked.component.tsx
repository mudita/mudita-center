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
import { defineMessages, FormattedMessage } from "react-intl"
import moment from "moment"
import { PasscodeLockedTestIds } from "App/passcode-modal/components/PasscodeLocked/passcode-locked-test-ids.enum"

const PasscodeLockedContainer = styled.div`
  margin-bottom: 4.2rem;
`
export const Title = styled(Text)`
  margin-bottom: 0.8rem;
`

export const TimeText = styled(Text)`
  text-align: center;
`

export const messages = defineMessages({
  modalLockedTitle: { id: "component.passcodeModalLocked" },
})

interface Props {
  leftTime: number | undefined
}

const PasscodeLocked: FunctionComponent<Props> = ({ leftTime }) => {
  const [dynamicLeftTime, setDynamicLeftTime] = useState<number | undefined>()

  useEffect(() => {
    if (leftTime === undefined) {
      setDynamicLeftTime(undefined)
    }
    if (leftTime !== undefined && dynamicLeftTime === undefined) {
      setDynamicLeftTime(leftTime)
    }
  }, [leftTime, dynamicLeftTime])

  useEffect(() => {
    const interval = setInterval(() => {
      if (dynamicLeftTime === undefined || dynamicLeftTime <= 1) {
        clearInterval(interval)
        return
      }
      if (dynamicLeftTime > 0) {
        setDynamicLeftTime((prevSec = 1) => prevSec - 1)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [dynamicLeftTime])

  const formatTime = (): string => {
    const breakdownTolerance = 20
    const time = dynamicLeftTime ? dynamicLeftTime + breakdownTolerance : 0
    const endDate = moment().add(time, "s")
    return moment(endDate).fromNow() + "."
  }
  return (
    <PasscodeLockedContainer data-testid={PasscodeLockedTestIds.Container}>
      <Title
        displayStyle={TextDisplayStyle.Headline2}
        message={{
          ...messages.modalLockedTitle,
        }}
      />
      <TimeText
        displayStyle={TextDisplayStyle.Paragraph4}
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
