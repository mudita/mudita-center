/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { connect } from "react-redux"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import Overview from "Renderer/modules/overview/overview.component"
import { select } from "Renderer/store"
import { RootModel } from "Renderer/models/models"
import { PhoneUpdate } from "Renderer/models/phone-update/phone-update.interface"
import { StoreValues as BasicInfoValues } from "Renderer/models/basic-info/basic-info.typings"

const selection = select((models: any) => ({
  networkName: models.basicInfo.activeSimNetworkName,
  networkLevel: models.basicInfo.activeNetworkLevelFromSim,
}))

const mapStateToProps = (state: RootModel) => {
  return {
    ...state.basicInfo,
    ...selection(state, null),
    ...state.phoneUpdate,
    ...state.settings,
    ...state.devMode,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  disconnectDevice: () => dispatch.basicInfo.disconnect(),
  changeSim: (card: SimCard) => dispatch.basicInfo.changeSim(card),
  updatePhoneOsInfo: (updateInfo: PhoneUpdate) =>
    dispatch.phoneUpdate.update(updateInfo),
  updateBasicInfo: (updateInfo: Partial<BasicInfoValues>) =>
    dispatch.basicInfo.update(updateInfo),
  toggleUpdatingDevice: dispatch.basicInfo.toggleUpdatingDevice,
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
