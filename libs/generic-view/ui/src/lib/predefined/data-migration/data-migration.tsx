/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* stylelint-disable no-duplicate-selectors */

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react"
import { defineMessages } from "react-intl"
import { useDispatch, useSelector } from "react-redux"
import { APIFC } from "generic-view/utils"
import { BaseDevice, McDataMigrationConfig } from "generic-view/models"
import { getActiveDevice } from "device-manager/feature"
import {
  abortDataMigration,
  clearDataMigrationAbortControllers,
  clearDataTransfer,
  DataMigrationStatus,
  prepareDevicesForDataMigration,
  processPureDatabase,
  selectDataMigrationPureRestarting,
  selectDataMigrationSourceDevice,
  selectDataMigrationSourceDevices,
  selectDataMigrationStatus,
  selectDataMigrationTargetDevices,
  setDataMigrationFeatures,
  setDataMigrationPureRestarting,
  setDataMigrationSourceDevice,
  setDataMigrationStatus,
  transferMigrationData,
} from "generic-view/store"
import { Instruction, InstructionWrapper } from "./instruction"
import styled from "styled-components"
import { H3 } from "../../texts/headers"
import { Divider } from "../../helpers/divider"
import { TargetSelector, TargetSelectorWrapper } from "./target-selector"
import Form from "../../interactive/form/form"
import { TransferSetup } from "./transfer-setup"
import {
  GenericThemeProvider,
  modalTransitionDuration,
} from "generic-view/theme"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { PureErrorModal } from "./components/pure-error-modal"
import { TransferErrorModal } from "./components/transfer-error-modal"
import { PurePasscodeModal } from "./components/pure-passcode-modal"
import { ProgressModal } from "./components/progress-modal"
import { SuccessModal } from "./components/success-modal"
import { Modal } from "../../interactive/modal"
import { CancelledModal } from "./components/transfer-cancelled-modal"

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
  const sourceDevices = useSelector(
    selectDataMigrationSourceDevices
  ) as BaseDevice[]
  const targetDevices = useSelector(
    selectDataMigrationTargetDevices
  ) as BaseDevice[]
  const sourceDevice = useSelector(selectDataMigrationSourceDevice)
  const dataMigrationStatus = useSelector(selectDataMigrationStatus)
  const pureRestarting = useSelector(selectDataMigrationPureRestarting)

  const [modalOpened, setModalOpened] = useState(false)

  const noSourceDeviceSelected =
    dataMigrationStatus === DataMigrationStatus.Idle && !sourceDevice
  const displayInstruction =
    Boolean(sourceDevices.length) !== Boolean(targetDevices.length)
  const displayTargetSelector =
    activeDevice?.deviceType === "MuditaPure" && targetDevices.length > 0
  const displayTransferSetup = !displayInstruction && !displayTargetSelector

  const startMigration = useCallback(() => {
    dispatch(
      prepareDevicesForDataMigration({
        onSuccess: () => {
          dispatch(
            setDataMigrationStatus(DataMigrationStatus.PureDatabaseCreating)
          )
        },
      })
    )
  }, [dispatch])

  const onPureUnlock = useCallback(() => {
    if (pureRestarting) {
      dispatch(setDataMigrationStatus(DataMigrationStatus.PureDatabaseIndexing))
    } else {
      dispatch(setDataMigrationStatus(DataMigrationStatus.PureDatabaseCreating))
    }
  }, [dispatch, pureRestarting])

  const startPureDatabaseProcessing = useCallback(() => {
    dispatch(processPureDatabase())
  }, [dispatch])

  const startTransfer = useCallback(() => {
    dispatch(transferMigrationData())
  }, [dispatch])

  const cancelMigration = useCallback(() => {
    dispatch(abortDataMigration({ reason: DataMigrationStatus.Cancelled }))
  }, [dispatch])

  const onFinish = () => {
    setModalOpened(false)
    setTimeout(() => {
      dispatch(setDataMigrationStatus(DataMigrationStatus.Idle))
      dispatch(setDataMigrationFeatures([]))
      dispatch(clearDataTransfer())
      dispatch(clearDataMigrationAbortControllers())
    }, modalTransitionDuration)
  }

  useEffect(() => {
    if (
      activeDevice?.deviceType === "APIDevice" &&
      noSourceDeviceSelected &&
      dataMigrationStatus === DataMigrationStatus.Idle
    ) {
      if (sourceDevices.length > 0) {
        dispatch(setDataMigrationSourceDevice(sourceDevices[0]))
      } else {
        dispatch(setDataMigrationSourceDevice(undefined))
      }
    }
  }, [
    activeDevice?.deviceType,
    dataMigrationStatus,
    dispatch,
    noSourceDeviceSelected,
    sourceDevices,
  ])

  useEffect(() => {
    console.log({ dataMigrationStatus })
    switch (dataMigrationStatus) {
      case DataMigrationStatus.PureDatabaseCreating:
        startPureDatabaseProcessing()
        break
      case DataMigrationStatus.PureDatabaseIndexing:
        dispatch(setDataMigrationPureRestarting(false))
        break
      case DataMigrationStatus.DataTransferring:
        startTransfer()
        break
    }
    setModalOpened(
      dataMigrationStatus !== DataMigrationStatus.Idle &&
        dataMigrationStatus !== DataMigrationStatus.PurePasswordRequired
    )
  }, [
    dataMigrationStatus,
    dispatch,
    startPureDatabaseProcessing,
    startTransfer,
  ])

  useEffect(() => {
    if (dataMigrationStatus === DataMigrationStatus.PureDatabaseCreating) {
      if (sourceDevice?.disconnected && !pureRestarting) {
        dispatch(setDataMigrationPureRestarting(true))
      } else if (!sourceDevice?.disconnected && pureRestarting) {
        dispatch(
          prepareDevicesForDataMigration({
            onSuccess: () => {
              dispatch(setDataMigrationPureRestarting(false))
              dispatch(
                setDataMigrationStatus(DataMigrationStatus.PureDatabaseIndexing)
              )
            },
          })
        )
      }
    }
  }, [dataMigrationStatus, dispatch, pureRestarting, sourceDevice])

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
      <PurePasscodeModal
        deviceId={sourceDevice?.serialNumber}
        onUnlock={onPureUnlock}
      />
      <Modal
        config={{
          defaultOpened:
            modalOpened &&
            (dataMigrationStatus === DataMigrationStatus.PureCriticalBattery ||
              dataMigrationStatus ===
                DataMigrationStatus.PureOnboardingRequired ||
              dataMigrationStatus === DataMigrationStatus.PureUpdateRequired),
          size: "small",
        }}
        componentKey={"data-migration-modal-pure-error"}
      >
        <PureErrorModal onButtonClick={onFinish} />
      </Modal>
      <Modal
        config={{
          defaultOpened:
            modalOpened && dataMigrationStatus === DataMigrationStatus.Failed,
          size: "small",
        }}
        componentKey={"data-migration-modal-transfer-failed"}
      >
        <TransferErrorModal onButtonClick={onFinish} />
      </Modal>
      <Modal
        config={{
          defaultOpened:
            modalOpened &&
            [
              DataMigrationStatus.DataTransferring,
              DataMigrationStatus.PureDatabaseCreating,
              DataMigrationStatus.PureDatabaseIndexing,
              DataMigrationStatus.DataTransferred,
            ].includes(dataMigrationStatus),
          size: "small",
        }}
        componentKey={"data-migration-modal-progress"}
      >
        <ProgressModal onCancel={cancelMigration} />
      </Modal>
      <Modal
        config={{
          defaultOpened:
            modalOpened &&
            dataMigrationStatus === DataMigrationStatus.Cancelled,
          size: "small",
        }}
        componentKey={"data-migration-modal-cancelled"}
      >
        <CancelledModal onClose={onFinish} />
      </Modal>
      <Modal
        config={{
          defaultOpened:
            modalOpened &&
            dataMigrationStatus === DataMigrationStatus.Completed,
          size: "small",
        }}
        componentKey={"data-migration-modal-success"}
      >
        <SuccessModal onButtonClick={onFinish} />
      </Modal>
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
