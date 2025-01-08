/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Typography } from "../../typography"
import { DeviceCard } from "./components/device-card"
import { useDataMigrationDeviceSelector } from "shared/feature"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { BaseDevice } from "generic-view/models"

const messages = defineMessages({
  title: {
    id: "module.genericViews.dataMigration.targetSelector.title",
  },
  description: {
    id: "module.genericViews.dataMigration.targetSelector.description",
  },
})

interface Props {
  devices: BaseDevice[]
}

export const TargetSelector: FunctionComponent<Props> = ({ devices }) => {
  const selectDevice = useDataMigrationDeviceSelector()

  return (
    <TargetSelectorWrapper>
      <Header>
        <h2>{intl.formatMessage(messages.title)}</h2>
        <Typography.P3>
          {intl.formatMessage(messages.description)}
        </Typography.P3>
      </Header>
      <Devices>
        {devices.map((device) => {
          const onSelect = () => selectDevice(device.serialNumber)
          return (
            <DeviceCard
              key={device.serialNumber}
              image={device.image}
              name={device.name}
              serialNumber={device.serialNumber}
              onSelect={onSelect}
            />
          )
        })}
      </Devices>
    </TargetSelectorWrapper>
  )
}

export const TargetSelectorWrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: 14rem 1fr auto;
  justify-content: center;
  justify-items: center;
  align-self: center;
  width: 100%;
  max-width: 73.2rem;
  padding: 4.4rem 0 5.1rem 0;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40.6rem;
  gap: 1.4rem;

  h2 {
    font-size: 1.8rem;
    line-height: 2.4rem;
    margin: 0;
    text-align: center;
  }

  p {
    text-align: center;
  }
`

const Devices = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 28.3rem);
  grid-auto-rows: auto;
  max-width: 60rem;
  grid-auto-flow: dense;
  gap: ${({ theme }) => theme.space.xxl};
`
