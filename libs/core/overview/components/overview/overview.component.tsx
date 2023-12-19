/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { DeviceType } from "Core/device/constants"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  PureOverview,
  HarmonyOverview,
  KompaktOverview,
} from "Core/overview/components/overview-screens"

type PureOverviewProps = ComponentProps<typeof PureOverview>
type HarmonyOverviewProps = ComponentProps<typeof HarmonyOverview>
type Props = PureOverviewProps &
  HarmonyOverviewProps & { deviceType: DeviceType | null }

const Screen: FunctionComponent<Props> = (props) => {
  switch (props.deviceType) {
    case DeviceType.MuditaPure:
      return <PureOverview {...props} />
    case DeviceType.MuditaHarmony:
      return <HarmonyOverview {...props} />
    case DeviceType.MuditaKompakt:
      return <KompaktOverview />
    default:
      return <></>
  }
}
const Overview: FunctionComponent<Props> = (props) => {
  return <Screen {...props} />
}

export default Overview
