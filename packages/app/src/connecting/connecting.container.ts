/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { RootState, ReduxRootState, TmpDispatch } from "Renderer/store"
import { PureDeviceData, unlockDevice, getUnlockStatus } from "App/device"
import Connecting from "App/connecting/components/connecting.component"

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  unlockDevice: (code: number[]) => dispatch(unlockDevice(code)),
  getUnlockStatus: () => dispatch(getUnlockStatus()),
})

const mapStateToProps = (state: RootState & ReduxRootState) => ({
  device: state.device,
  loaded: state.device.status.loaded,
  unlocked: state.device.status.unlocked,
  phoneLockTime:
    (state.device.data as PureDeviceData)?.phoneLockTime ?? undefined,

  //TODO: tmp solution to remove
  initialModalsShowed: true,
})

export default connect(mapStateToProps, mapDispatchToProps)(Connecting)
