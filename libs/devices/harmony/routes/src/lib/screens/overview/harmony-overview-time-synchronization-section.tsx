/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import styled from "styled-components"
import { useHarmonyTimeSynchronizationMutation } from "devices/harmony/feature"
import { useActiveDeviceQuery } from "devices/common/feature"
import { Harmony } from "devices/harmony/models"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  timeLabel: {
    id: "harmony.overview.time.timeLabel",
  },
  synchronizeButton: {
    id: "harmony.overview.time.synchronizeButton",
  },
  synchronizingButton: {
    id: "harmony.overview.time.synchronizingButton",
  },
  synchronizedButton: {
    id: "harmony.overview.time.synchronizedButton",
  },
})

interface Props {
  time: string
  date: string
}

export const HarmonyOverviewTimeSynchronizationSection: FunctionComponent<
  Props
> = ({ time, date }) => {
  const { data: activeDevice } = useActiveDeviceQuery<Harmony>()
  const {
    mutate: synchronizeHarmonyTime,
    isPending,
    isSuccess,
  } = useHarmonyTimeSynchronizationMutation(activeDevice)

  return (
    <Wrapper>
      <Info>
        <Typography.P3 message={messages.timeLabel.id} />
        <TextWrapper>
          <Typography.P1 color={"black"}>{time}</Typography.P1>
          <Typography.P1 color={"black"}>{date}</Typography.P1>
        </TextWrapper>
      </Info>
      <Button
        type={isPending ? ButtonType.Primary : ButtonType.Secondary}
        size={ButtonSize.Medium}
        icon={
          isPending
            ? IconType.Refreshing
            : isSuccess
              ? IconType.CheckCircle
              : undefined
        }
        onClick={() => synchronizeHarmonyTime()}
        disabled={isPending}
        message={
          isPending
            ? messages.synchronizingButton.id
            : isSuccess
              ? messages.synchronizedButton.id
              : messages.synchronizeButton.id
        }
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`

const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.4rem;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`
