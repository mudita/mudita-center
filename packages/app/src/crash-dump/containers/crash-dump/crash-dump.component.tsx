/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { defineMessages } from "react-intl"
import { State } from "App/core/constants"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { CrashDump as CrashDumpDto } from "App/crash-dump/dto"
import { CrashDumpContainerProps } from "App/crash-dump/containers/crash-dump/crash-dump.interface"
import { CrashDumpTestingIds } from "App/crash-dump/containers/crash-dump/crash-dump-testing-ids.enum"
import { CrashDumpModal } from "App/crash-dump/components"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import LoaderModal from "App/ui/components/loader-modal/loader-modal.component"
import { SuccessModal } from "App/ui/components/success-modal/success-modal.component"
import {
  downloadCrashDump,
  ignoreCrashDump,
  resetCrashDump,
} from "App/crash-dump/actions"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { intl } from "App/__deprecated__/renderer/utils/intl"

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
  hasCrashDump,
  sending,
  sended,
  failed,
  deviceType,
  downloadCrashDump,
  ignoreCrashDump,
  resetCrashDump,
}) => {
  const [openInfo, setOpenInfo] = useState<boolean>(false)

  useEffect(() => {
    if (!hasCrashDump) {
      return
    }

    if (sending || sended || failed) {
      setOpenInfo(false)
    } else {
      setOpenInfo(true)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCrashDump, sended, sended, failed])

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

  return (
    <>
      {failed && (
        <ErrorModal
          open={failed}
          testId={CrashDumpTestingIds.Failed}
          title={intl.formatMessage(messages.crashDumpModalErrorTitle)}
          subtitle={intl.formatMessage(messages.crashDumpModalErrorSubtitle)}
          closeModal={handleCloseModal}
        />
      )}
      {sending && (
        <LoaderModal
          open={sending}
          testId={CrashDumpTestingIds.Loading}
          title={intl.formatMessage(messages.crashDumpModalSendingTitle)}
          subtitle={intl.formatMessage(messages.crashDumpModalSendingSubtitle)}
        />
      )}
      {sended && (
        <SuccessModal
          open={sended}
          testId={CrashDumpTestingIds.Success}
          title={intl.formatMessage(messages.crashDumpModalSuccessTitle)}
          subtitle={intl.formatMessage(messages.crashDumpModalSuccessSubtitle)}
          closeModal={handleCloseModal}
        />
      )}
      {openInfo && (
        <CrashDumpModal
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
  hasCrashDump: Boolean(state.crashDump.data.files.length),
  sending:
    state.crashDump.loadingState === State.Loading ||
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
