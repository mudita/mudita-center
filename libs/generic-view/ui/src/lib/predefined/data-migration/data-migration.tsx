/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { APIFC } from "generic-view/utils"
import { McDataMigrationConfig } from "generic-view/models"
import { useDispatch, useSelector } from "react-redux"
import {
  resetDataMigration,
  selectCurrentDataMigrationDevices,
  selectDataMigrationSourceDevices,
  selectDataMigrationTargetDevices,
  setSourceDevice,
  setTargetDevice,
} from "generic-view/store"
import { Instruction, InstructionWrapper } from "./instruction"
import styled from "styled-components"
import { H3 } from "../../texts/headers"
import { Divider } from "../../helpers/divider"
import { TargetSelector, TargetSelectorWrapper } from "./target-selector"
import Form from "../../interactive/form/form"
import { TransferSetup } from "./transfer-setup"
import { GenericThemeProvider } from "generic-view/theme"
import { Device } from "./components/device-card"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"

const DataMigrationUI: FunctionComponent<McDataMigrationConfig> = ({
  dataTypes,
}) => {
  const dispatch = useDispatch()
  const activeDevice = useSelector(getActiveDevice)
  const sourceDevices = useSelector(
    selectDataMigrationSourceDevices
  ) as Device[]
  const targetDevices = useSelector(
    selectDataMigrationTargetDevices
  ) as Device[]
  const { sourceDevice, targetDevice } = useSelector(
    selectCurrentDataMigrationDevices
  )
  const singleDeviceConnected =
    sourceDevices.length + targetDevices.length === 1
  const noSourceDeviceSelected = !sourceDevice
  const noTargetDeviceSelected = !targetDevice

  const displayInstruction = singleDeviceConnected
  const displayTargetSelector =
    activeDevice?.deviceType === "MuditaPure" && targetDevices.length > 0
  const displayTransferSetup = !displayInstruction && !displayTargetSelector

  const startMigration = () => {
    // TODO: implement data migration process
    console.log("Start migration")
  }

  useEffect(() => {
    if (activeDevice?.deviceType === "APIDevice") {
      dispatch(setTargetDevice(activeDevice.serialNumber))

      if (noSourceDeviceSelected && sourceDevices.length > 0) {
        dispatch(setSourceDevice(sourceDevices[0].serialNumber))
      }
    }
  }, [
    activeDevice?.deviceType,
    activeDevice?.serialNumber,
    dispatch,
    noSourceDeviceSelected,
    sourceDevices,
  ])

  return (
    <Wrapper>
      <Header>
        <H3>Transfer Data from Pure to Kompakt</H3>
        <Divider />
      </Header>
      <Content>
        {displayInstruction && <Instruction />}
        {displayTargetSelector && <TargetSelector devices={targetDevices} />}
        {displayTransferSetup && (
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

export const DataMigrationPage: FunctionComponent = () => {
  return (
    <GenericThemeProvider>
      <DataMigration config={{ dataTypes: [] }} />
    </GenericThemeProvider>
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
