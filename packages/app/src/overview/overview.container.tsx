/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import Overview from "App/overview/components/overview/overview.component"
import { ReduxRootState, TmpDispatch } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import {
  UpdatingState,
  PureDeviceData,
  disconnectDevice,
  changeSim,
  setUpdateState,
  startUpdateOs,
} from "App/device"

const mapStateToProps = (state: RootModel & ReduxRootState) => {
  return {
    batteryLevel: state.device.data?.batteryLevel,
    osVersion: state.device.data?.osVersion,
    osUpdateDate: state.device.data?.osUpdateDate,
    memorySpace: state.device.data?.memorySpace,
    serialNumber: state.device.data?.serialNumber,
    simCards: (state.device.data as PureDeviceData)?.simCards,
    networkName: (state.device.data as PureDeviceData)?.networkName,
    networkLevel: (state.device.data as PureDeviceData)?.networkLevel,
    ...state.phoneUpdate,
    ...state.settings,
    ...state.devMode,
  }
}

// TODO replace `TmpDispatch` with legit `Dispatch`
const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  disconnectDevice: () => dispatch(disconnectDevice()),
  changeSim: (card: SimCard) => dispatch(changeSim(card)),
  setUpdateState: (state: UpdatingState) => dispatch(setUpdateState(state)),
  startUpdateOs: (file: string) => dispatch(startUpdateOs(file)),
  // TODO refactor legacy staff
  updatePhoneOsInfo: (updateInfo: PhoneUpdate) =>
    dispatch.phoneUpdate.update(updateInfo),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
