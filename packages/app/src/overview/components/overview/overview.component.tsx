/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import { DeviceType } from "@mudita/pure"
import React, { ComponentProps } from "react"
import {
  PureOverview,
  HarmonyOverview,
} from "App/overview/components/overview-screens"

type PureOverviewProps = ComponentProps<typeof PureOverview>
type HarmonyOverviewProps = ComponentProps<typeof HarmonyOverview>
type Props = PureOverviewProps & HarmonyOverviewProps

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
