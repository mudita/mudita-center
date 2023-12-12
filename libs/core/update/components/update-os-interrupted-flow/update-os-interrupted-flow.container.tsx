/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "Core/core/constants"
import { showModal } from "Core/modals-manager/actions"
import { ModalStateKey } from "Core/modals-manager/reducers"
import { closeUpdateFlow } from "Core/update/actions"
import { UpdateOsInterruptedFlow } from "Core/update/components/update-os-interrupted-flow/update-os-interrupted-flow.component"
import { DownloadState } from "Core/update/constants"
import { alreadyProcessedReleasesSelector, Mode } from "Core/update/selectors"
import {
  ReduxRootState,
  RootState,
  TmpDispatch,
} from "Core/__deprecated__/renderer/store"
import { connect } from "react-redux"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    downloadInterruptedModalOpened:
      state.update.downloadState === DownloadState.Failed &&
      !state.device.status.connected,
    updateInterruptedModalOpened:
      state.update.updateOsState === State.Failed &&
      !state.device.status.connected,
    alreadyDownloadedReleases: alreadyProcessedReleasesSelector(
      Mode.DownloadedReleases
    )(state),
    alreadyInstalledReleases: alreadyProcessedReleasesSelector(
      Mode.InstalledReleases
    )(state),
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  onClose: () => dispatch(closeUpdateFlow()),
  openContactSupportFlow: () =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(showModal(ModalStateKey.ContactSupportFlow)),
})

export const UpdateOsInterruptedFlowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateOsInterruptedFlow)
