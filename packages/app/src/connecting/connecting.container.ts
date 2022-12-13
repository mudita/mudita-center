/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import {
  RootState,
  ReduxRootState,
  TmpDispatch,
} from "App/__deprecated__/renderer/store"
import { unlockDevice, getUnlockStatus } from "App/device"
import Connecting from "App/connecting/components/connecting.component"
import { noModalsShowSelector } from "App/modals-manager/selectors/no-modals-show.selector"
import { updateAllIndexes } from "App/data-sync/actions/update-all-indexes.action"
import { getLeftTimeSelector } from "App/device/selectors/get-left-time.selector"

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
  syncInitialized: state.dataSync.initialized,
  syncState: state.dataSync.state,
  noModalsVisible: noModalsShowSelector(state),
  leftTime: getLeftTimeSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Connecting)
