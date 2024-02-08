/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { connect, useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { State } from "Core/core/constants"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { CrashDump as CrashDumpDto } from "Core/crash-dump/dto"
import { CrashDumpContainerProps } from "Core/crash-dump/components/crash-dump/crash-dump.interface"
import { CrashDumpTestingIds } from "Core/crash-dump/components/crash-dump/crash-dump-testing-ids.enum"
import { CrashDumpModal } from "Core/crash-dump/components/crash-dump-modal"
import ErrorModal from "Core/ui/components/error-modal/error-modal.component"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"
import { SuccessModal } from "Core/ui/components/success-modal/success-modal.component"
import {
  downloadCrashDump,
  ignoreCrashDump,
  resetCrashDump,
} from "Core/crash-dump/actions"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import { isAllCrashDumpIgnoredSelector } from "Core/crash-dump/selectors/is-all-crash-dump-ignored.selector"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { getDeviceInitializationStatus } from "Core/device-initialization/selectors/get-device-initialization-status.selector"

const messages = defineMessages({
  crashDumpModalErrorTitle: {
    id: "component.crashDump.crashDumpModalErrorTitle",
  },
  crashDumpModalErrorSubtitle: {
    id: "component.crashDump.crashDumpModalErrorSubtitle",
  },
  crashDumpModalSendingTitle: {
    id: "component.crashDump.crashDumpModalSendingTitle",
  },
  crashDumpModalSendingSubtitle: {
    id: "component.crashDump.crashDumpModalSendingSubtitle",
  },
  crashDumpModalSuccessTitle: {
    id: "component.crashDump.crashDumpModalSuccessTitle",
  },
  crashDumpModalSuccessSubtitle: {
    id: "component.crashDump.crashDumpModalSuccessSubtitle",
  },
})

const CrashDumpContainer: FunctionComponent<CrashDumpContainerProps> = ({
  sending,
  sended,
  failed,
  deviceType,
  downloadCrashDump,
  ignoreCrashDump,
  resetCrashDump,
  layer = ModalLayers.CrashDump,
}) => {
  const allCrashDumpIgnored = useSelector(isAllCrashDumpIgnoredSelector)
  const deviceInitializationStatus = useSelector(getDeviceInitializationStatus)
  const [openInfo, setOpenInfo] = useState<boolean>(false)

  useEffect(() => {
    if (deviceInitializationStatus !== DeviceInitializationStatus.Initialized) {
      return
    }
    if (allCrashDumpIgnored) {
      return
    }

    if (sending || sended || failed) {
      setOpenInfo(false)
    } else {
      setOpenInfo(true)
    }
  }, [
    setOpenInfo,
    allCrashDumpIgnored,
    deviceInitializationStatus,
    sended,
    sending,
    failed,
  ])

  const handleClosCrashDumpModal = () => {
    ignoreCrashDump()
    setOpenInfo(false)
  }

  const handleDownloadCrashDump = (data: CrashDumpDto) => {
    downloadCrashDump(data)
    setOpenInfo(false)
  }

  const handleCloseModal = () => {
    resetCrashDump()
  }

  if (!deviceType) {
    return <></>
  }
  if (deviceInitializationStatus !== DeviceInitializationStatus.Initialized) {
    return <></>
  }

  return (
    <>
      {failed && (
        <ErrorModal
          layer={layer}
          open={failed}
          testId={CrashDumpTestingIds.Failed}
          title={intl.formatMessage(messages.crashDumpModalErrorTitle)}
          subtitle={intl.formatMessage(messages.crashDumpModalErrorSubtitle)}
          closeModal={handleCloseModal}
        />
      )}
      {sending && (
        <LoaderModal
          layer={layer}
          open={sending}
          testId={CrashDumpTestingIds.Loading}
          title={intl.formatMessage(messages.crashDumpModalSendingTitle)}
          subtitle={intl.formatMessage(messages.crashDumpModalSendingSubtitle)}
        />
      )}
      {sended && (
        <SuccessModal
          layer={layer}
          open={sended}
          testId={CrashDumpTestingIds.Success}
          title={intl.formatMessage(messages.crashDumpModalSuccessTitle)}
          subtitle={intl.formatMessage(messages.crashDumpModalSuccessSubtitle)}
          closeModal={handleCloseModal}
        />
      )}
      {openInfo && (
        <CrashDumpModal
          layer={layer}
          open={openInfo}
          deviceType={deviceType}
          onClose={handleClosCrashDumpModal}
          onSubmit={handleDownloadCrashDump}
        />
      )}
    </>
  )
}

const mapStateToProps = (state: ReduxRootState) => ({
  sending:
    state.crashDump.downloadingState === State.Loading ||
    state.crashDump.sendingState === State.Loading,
  sended:
    state.crashDump.downloadingState === State.Loaded &&
    state.crashDump.sendingState === State.Loaded,
  failed:
    state.crashDump.loadingState === State.Failed ||
    state.crashDump.downloadingState === State.Failed ||
    state.crashDump.sendingState === State.Failed,
  deviceType: state.device.deviceType,
})

const mapDispatchToProps = {
  downloadCrashDump,
  ignoreCrashDump,
  resetCrashDump,
}

export const CrashDump = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrashDumpContainer)
