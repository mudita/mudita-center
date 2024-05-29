/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* stylelint-disable no-duplicate-selectors */

import React, { FunctionComponent, useEffect } from "react"
import { APIFC } from "generic-view/utils"
import { McDataMigrationConfig } from "generic-view/models"
import { useDispatch, useSelector } from "react-redux"
import {
  selectDataMigrationSourceDevice,
  selectDataMigrationSourceDevices,
  selectDataMigrationStatus,
  selectDataMigrationTargetDevices,
  setDataMigrationStatus,
  setSourceDevice,
  startDataMigration,
} from "generic-view/store"
import { Instruction, InstructionWrapper } from "./instruction"
import styled, { DefaultTheme, ThemeProvider } from "styled-components"
import { H3 } from "../../texts/headers"
import { Divider } from "../../helpers/divider"
import { TargetSelector, TargetSelectorWrapper } from "./target-selector"
import Form from "../../interactive/form/form"
import { TransferSetup } from "./transfer-setup"
import { GenericThemeProvider } from "generic-view/theme"
import { Device } from "./components/device-card"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import theme from "Core/core/styles/theming/theme"
import { PurePasscode } from "./components/pure-passcode"
import { PureErrorModal } from "./components/pure-error-modal"
import { TransferErrorModal } from "./components/transfer-error-modal"

const messages = defineMessages({
  header: {
    id: "module.genericViews.dataMigration.header",
  },
})

const DataMigrationUI: FunctionComponent<McDataMigrationConfig> = ({
  dataTypes,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const activeDevice = useSelector(getActiveDevice)
  const dataMigrationStatus = useSelector(selectDataMigrationStatus)
  const sourceDevices = useSelector(
    selectDataMigrationSourceDevices
  ) as Device[]
  const targetDevices = useSelector(
    selectDataMigrationTargetDevices
  ) as Device[]
  const sourceDevice = useSelector(selectDataMigrationSourceDevice)

  const singleDeviceConnected =
    sourceDevices.length + targetDevices.length === 1
  const noSourceDeviceSelected = !sourceDevice
  const displayInstruction = singleDeviceConnected
  const displayTargetSelector =
    activeDevice?.deviceType === "MuditaPure" && targetDevices.length > 0
  const displayTransferSetup = !displayInstruction && !displayTargetSelector

  const closePasscodeModal = () => {
    dispatch(setDataMigrationStatus("idle"))
  }

  const startMigration = () => {
    dispatch(startDataMigration())
  }

  const onUnlock = () => {
    startMigration()
  }

  useEffect(() => {
    if (activeDevice?.deviceType === "APIDevice" && noSourceDeviceSelected) {
      if (sourceDevices.length > 0) {
        dispatch(setSourceDevice(sourceDevices[0].serialNumber))
      } else {
        dispatch(setSourceDevice(undefined))
      }
    }
  }, [
    activeDevice?.deviceType,
    dispatch,
    noSourceDeviceSelected,
    sourceDevices,
  ])

  return (
    <Wrapper>
      <Header>
        <H3>{intl.formatMessage(messages.header)}</H3>
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
      {sourceDevice && dataMigrationStatus === "pure-password-required" && (
        <ThemeProvider theme={theme as unknown as DefaultTheme}>
          <PurePasscode
            deviceId={sourceDevice?.serialNumber}
            onClose={closePasscodeModal}
            onUnlock={onUnlock}
          />
        </ThemeProvider>
      )}
      <PureErrorModal />
      <TransferErrorModal />
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
