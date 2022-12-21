/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { showModal } from "App/modals-manager/actions"
import { ModalStateKey } from "App/modals-manager/reducers"
import { clearState } from "App/update/actions"
import { UpdateOsInterruptedFlow } from "App/update/components/update-os-interrupted-flow/update-os-interrupted-flow.component"
import { DownloadState } from "App/update/constants"
import { alreadyProcessedReleasesSelector, Mode } from "App/update/selectors"
import {
  ReduxRootState,
  RootState,
  TmpDispatch,
} from "App/__deprecated__/renderer/store"
import { connect } from "react-redux"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    downloadInterruptedModalOpened:
      state.update.downloadState === DownloadState.Failed,
    updateInterruptedModalOpened: state.update.updateOsState === State.Failed,
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
  onClose: () => dispatch(clearState()),
  openContactSupportFlow: () =>
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    dispatch(showModal(ModalStateKey.ContactSupportFlow)),
})

export const UpdateOsInterruptedFlowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateOsInterruptedFlow)
