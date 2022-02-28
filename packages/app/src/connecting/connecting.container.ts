/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { RootState, ReduxRootState, TmpDispatch } from "Renderer/store"
import { PureDeviceData, unlockDevice, getUnlockStatus } from "App/device"
import Connecting from "App/connecting/components/connecting.component"
import { noModalsShowSelector } from "App/modals-manager/selectors/no-modals-show.selector"
import { updateAllIndexes } from "App/data-sync/actions/update-all-indexes.action"

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  unlockDevice: (code: number[]) => dispatch(unlockDevice(code)),
  getUnlockStatus: () => dispatch(getUnlockStatus()),
  updateAllIndexes: () => dispatch(updateAllIndexes()),
})

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  device: state.device,
  loaded: state.device.status.loaded,
  unlocked: state.device.status.unlocked,
  syncInitialized: state.dataSync.initialized,
  syncState: state.dataSync.state,
  phoneLockTime:
    (state.device.data as PureDeviceData)?.phoneLockTime ?? undefined,
  noModalsVisible: noModalsShowSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Connecting)
