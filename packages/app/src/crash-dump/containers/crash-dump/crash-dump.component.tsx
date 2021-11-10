/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  CrashDumpModal,
  CrashDumpSendingModal,
} from "App/crash-dump/components"
import { downloadCrashDump } from "App/crash-dump/actions"
import { ReduxRootState } from "App/renderer/store"

export interface CrashDumpContainerProps {
  hasCrashDump: boolean
  downloading: boolean
  downloadCrashDump: () => void
}

const CrashDumpContainer: FunctionComponent<CrashDumpContainerProps> = ({
  hasCrashDump,
  downloading,
  downloadCrashDump,
}) => {
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [openSending, setOpenSending] = useState<boolean>(false)

  useEffect(() => {
    if (!hasCrashDump) {
      return
    }

    if (downloading) {
      setOpenSending(true)
    } else {
      setOpenInfo(true)
    }
  }, [hasCrashDump])

  useEffect(() => {
    setOpenSending(downloading && hasCrashDump)
  }, [downloading])

  const handleCloseModal = () => {
    setOpenInfo(false)
  }

  const handleDownloadCrashDump = () => {
    downloadCrashDump()
    setOpenInfo(false)
  }

  return (
    <>
      <CrashDumpSendingModal open={openSending} />
      <CrashDumpModal
        open={openInfo}
        onClose={handleCloseModal}
        onAccept={handleDownloadCrashDump}
      />
    </>
  )
}

const mapStateToProps = (state: ReduxRootState) => ({
  hasCrashDump: Boolean(state.crashDump.data.files.length),
  downloading: state.crashDump.status.downloading,
})

const mapDispatchToProps = {
  downloadCrashDump,
}

export const CrashDump = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrashDumpContainer)
