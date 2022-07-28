/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { DeviceType } from "@mudita/pure"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  CrashDumpModal,
  CrashDumpSendingModal,
} from "App/crash-dump/components"
import { downloadCrashDump, ignoreCrashDump } from "App/crash-dump/actions"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

export interface CrashDumpContainerProps {
  hasCrashDump: boolean
  downloading: boolean
  sending: boolean
  deviceType: DeviceType | null
  downloadCrashDump: () => void
  ignoreCrashDump: () => void
}

const CrashDumpContainer: FunctionComponent<CrashDumpContainerProps> = ({
  hasCrashDump,
  downloading,
  sending,
  deviceType,
  downloadCrashDump,
  ignoreCrashDump,
}) => {
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [openSending, setOpenSending] = useState<boolean>(false)

  useEffect(() => {
    if (!hasCrashDump) {
      return
    }

    if (sending || downloading) {
      setOpenSending(true)
    } else {
      setOpenInfo(true)
    }
  }, [hasCrashDump])

  useEffect(() => {
    setOpenSending((sending || downloading) && hasCrashDump)
  }, [sending, downloading])

  const handleCloseModal = () => {
    ignoreCrashDump()
    setOpenInfo(false)
  }

  const handleDownloadCrashDump = () => {
    downloadCrashDump()
    setOpenInfo(false)
  }

  if (!deviceType) {
    return <></>
  }

  return (
    <>
      <CrashDumpSendingModal open={openSending} />
      <CrashDumpModal
        open={openInfo}
        deviceType={deviceType}
        onClose={handleCloseModal}
        onAccept={handleDownloadCrashDump}
      />
    </>
  )
}

const mapStateToProps = (state: ReduxRootState) => ({
  hasCrashDump: Boolean(state.crashDump.data.files.length),
  downloading: state.crashDump.status.downloading,
  sending: state.crashDump.status.sending,
  deviceType: state.device.deviceType,
})

const mapDispatchToProps = {
  downloadCrashDump,
  ignoreCrashDump,
}

export const CrashDump = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrashDumpContainer)
