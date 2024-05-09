/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { APIFC } from "generic-view/utils"
import { McDataMigrationConfig } from "generic-view/models"
import { useSelector } from "react-redux"
import {
  selectCurrentDataMigrationDevices,
  selectDataMigrationSourceDevices,
  selectDataMigrationTargetDevices,
} from "generic-view/store"
import { Instruction, InstructionWrapper } from "./instruction"
import styled from "styled-components"
import { H3 } from "../../texts/headers"
import { Divider } from "../../helpers/divider"
import { TargetSelector, TargetSelectorWrapper } from "./target-selector"
import { SourceSelector } from "./components/source-selector"
import Form from "../../interactive/form/form"
import { ButtonPrimary } from "../../buttons/button-primary"
import { FeaturesSelector } from "./components/features-selector"
import { TransferSetup } from "./transfer-setup"
import { kompaktImg } from "Root/demo-data/kompakt-img"

export const DataMigrationUI: FunctionComponent<McDataMigrationConfig> = ({
  dataTypes,
}) => {
  const sourceDevices = useSelector(selectDataMigrationSourceDevices)
  const targetDevices = useSelector(selectDataMigrationTargetDevices)
  const { sourceDevice, targetDevice } = useSelector(
    selectCurrentDataMigrationDevices
  )
  console.log(sourceDevices.length, targetDevice)
  const singleDeviceConnected = !sourceDevices.length || !targetDevices.length
  const noSourceDeviceSelected = !sourceDevice
  const noTargetDeviceSelected = !targetDevice

  const startMigration = () => {
    console.log("Start migration")
  }

  return (
    <Wrapper>
      <Header>
        <H3>Transfer Data from Pure to Kompakt</H3>
        <Divider />
      </Header>
      <Content>
        {singleDeviceConnected && <Instruction />}
        {noTargetDeviceSelected && <TargetSelector />}
        {!singleDeviceConnected && !noTargetDeviceSelected && (
          <TransferSetup
            features={dataTypes}
            onStartMigration={startMigration}
          />
        )}
      </Content>
    </Wrapper>
  )
}

export const DataMigration: APIFC<undefined, McDataMigrationConfig> = ({
  config,
}) => {
  return (
    <Form>
      <DataMigrationUI {...config} />
    </Form>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:has(${InstructionWrapper}),
  &:has(${TargetSelectorWrapper}) {
    background-color: ${({ theme }) => theme.color.white};
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.grey6};

  ${H3} {
    padding: ${({ theme }) => theme.space.xxl};
  }
`

const Content = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
`
