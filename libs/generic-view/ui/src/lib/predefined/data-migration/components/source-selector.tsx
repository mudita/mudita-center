/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { DeviceSelector } from "./device-selector"
import styled from "styled-components"
import * as ArrowSvg from "../arrow.svg"
import { H4 } from "../../../texts/headers"
import { useSelector } from "react-redux"
import {
  selectDataMigrationSourceDevices,
  selectDataMigrationTargetDevice,
} from "generic-view/store"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  from: {
    id: "module.genericViews.dataMigration.transferSetup.from",
  },
  to: {
    id: "module.genericViews.dataMigration.transferSetup.to",
  },
})

export const SourceSelector: FunctionComponent = () => {
  const sourceDevices = useSelector(selectDataMigrationSourceDevices)
  const targetDevice = useSelector(selectDataMigrationTargetDevice)
  return (
    <Wrapper>
      <Column>
        <H4>{intl.formatMessage(messages.from)}</H4>
        <DeviceSelector type={"source"} devices={sourceDevices} />
      </Column>
      <Column>
        <H4>&nbsp;</H4>
        <ArrowSvg />
      </Column>
      <Column>
        <H4>{intl.formatMessage(messages.to)}</H4>
        <DeviceSelector
          type={"target"}
          devices={targetDevice ? [targetDevice] : []}
        />
      </Column>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.6rem;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`
