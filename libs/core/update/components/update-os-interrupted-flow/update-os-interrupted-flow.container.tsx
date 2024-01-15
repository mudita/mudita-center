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
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    downloadInterruptedModalOpened:
      state.update.downloadState === DownloadState.Failed &&
      isActiveDeviceProcessingSelector(state),
    updateInterruptedModalOpened:
      state.update.updateOsState === State.Failed &&
      isActiveDeviceProcessingSelector(state),
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
