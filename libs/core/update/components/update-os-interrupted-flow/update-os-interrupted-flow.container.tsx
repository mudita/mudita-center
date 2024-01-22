/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
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
import { isActiveDeviceAttachedSelector } from "Core/device-manager/selectors/is-active-device-attached.selector"
import { deactivateDevice } from "Core/device-manager/actions/deactivate-device.action"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    downloadInterruptedModalOpened:
      state.update.downloadState === DownloadState.Failed ||
      state.update.downloadState === DownloadState.Cancelled,
    updateInterruptedModalOpened:
      state.update.updateOsState === State.Failed &&
      !isActiveDeviceAttachedSelector(state),
    alreadyDownloadedReleases: alreadyProcessedReleasesSelector(
      Mode.DownloadedReleases
    )(state),
    alreadyInstalledReleases: alreadyProcessedReleasesSelector(
      Mode.InstalledReleases
    )(state),
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  onClose: () => dispatch(closeUpdateFlow()),
  openContactSupportFlow: () =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    dispatch(showModal(ModalStateKey.ContactSupportFlow)),
  deactivateDevice: () =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    dispatch(deactivateDevice()),
})

export const UpdateOsInterruptedFlowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateOsInterruptedFlow)
