/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Connecting from "App/connecting/components/connecting.component"
import { State } from "App/core/constants"
import { updateAllIndexes } from "App/data-sync/actions/update-all-indexes.action"
import { getUnlockStatus, unlockDevice } from "App/device"
import { getLeftTimeSelector } from "App/device/selectors/get-left-time.selector"
import { noModalsShowSelector } from "App/modals-manager/selectors/no-modals-show.selector"
import {
  ReduxRootState,
  RootState,
  TmpDispatch,
} from "App/__deprecated__/renderer/store"
import { connect } from "react-redux"
import { CheckForUpdateState } from "App/update/constants/check-for-update-state.constant"

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  unlockDevice: (code: number[]) => dispatch(unlockDevice(code)),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  getUnlockStatus: () => dispatch(getUnlockStatus()),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  updateAllIndexes: () => dispatch(updateAllIndexes()),
})

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  deviceType: state.device.deviceType,
  loaded: state.device.status.loaded,
  unlocked: state.device.status.unlocked,
  criticalBatteryLevel: state.device.status.criticalBatteryLevel,
  onboardingFinished: state.device.status.onboardingFinished,
  syncInitialized: state.dataSync.initialized,
  syncState: state.dataSync.state,
  noModalsVisible: noModalsShowSelector(state),
  leftTime: getLeftTimeSelector(state),
  forceOsUpdateFailed:
    state.update.checkForUpdateState === CheckForUpdateState.Failed &&
    state.update.needsForceUpdate === true,
  checkingForOsForceUpdate:
    state.update.checkForUpdateState === CheckForUpdateState.Loading &&
    Boolean(state.update.needsForceUpdate),
  passcodeModalCloseable: !(
    state.update.needsForceUpdate ||
    state.update.forceUpdateState === State.Loading ||
    state.update.updateOsState === State.Loading
  ),
  checkedForForceUpdateNeed: state.update.checkedForForceUpdateNeed,
})

export default connect(mapStateToProps, mapDispatchToProps)(Connecting)
