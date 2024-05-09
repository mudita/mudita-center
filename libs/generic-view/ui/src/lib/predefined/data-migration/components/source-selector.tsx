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

export const SourceSelector: FunctionComponent = () => {
  const sourceDevices = useSelector(selectDataMigrationSourceDevices)
  const targetDevice = useSelector(selectDataMigrationTargetDevice)
  return (
    <Wrapper>
      <Column>
        <H4>From</H4>
        <DeviceSelector type={"source"} devices={sourceDevices} />
      </Column>
      <Column>
        <H4>&nbsp;</H4>
        <ArrowSvg />
      </Column>
      <Column>
        <H4>To</H4>
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
