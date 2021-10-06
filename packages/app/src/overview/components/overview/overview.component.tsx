/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import { DevMode } from "App/dev-mode/store/dev-mode.interface"
import { DeviceType } from "@mudita/pure"
import React from "react"
import {
  PureOverview,
  HarmonyOverview,
} from "App/overview/components/overview-screens"
import { PhoneUpdateStore } from "Renderer/models/phone-update/phone-update.interface"
import { AppSettings, SettingsState } from "App/main/store/settings.interface"

import { DeviceState } from "App/device"

export interface UpdateBasicInfo {
  toggleDeviceUpdating: (option: boolean) => void
  setCollectingData: (option: AppSettings["appCollectingData"]) => void
}

type Props = DeviceState["data"] &
  PhoneUpdateStore &
  SettingsState &
  DevMode & {
    deviceType: DeviceType | null
  }

const Overview: FunctionComponent<Props> = (props) => {
  const Screen = () => {
    switch (props.deviceType) {
      case DeviceType.MuditaPure:
        return <PureOverview {...props} />
      case DeviceType.MuditaHarmony:
        return <HarmonyOverview {...props} />
      default:
        return <></>
    }
  }

  return <Screen />
}

export default Overview
