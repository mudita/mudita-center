/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType, CaseColor } from "Core/device/constants"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Image from "Core/__deprecated__/renderer/components/core/image/image.component"
import { DeviceTestIds } from "Core/overview/components/device-preview/device-preview-test-ids.enum"
import PureGrayImage from "Core/__deprecated__/renderer/images/pure-gray-front.png"
import PureBlackImage from "Core/__deprecated__/renderer/images/pure-black-front.png"
import KompaktGrayImage from "Core/__deprecated__/renderer/images/kompakt-gray-render.png"
import HarmonyImage from "Core/__deprecated__/renderer/images/harmony-render.png"

interface DeviceImageProps {
  deviceType: DeviceType
  caseColour?: CaseColor
}

export const DeviceImage: FunctionComponent<DeviceImageProps> = ({
  deviceType,
  caseColour,
}) => {
  if (deviceType === DeviceType.MuditaPure && caseColour === CaseColor.Black) {
    return <Image src={PureBlackImage} data-testid={DeviceTestIds.PureBlack} />
  }

  if (deviceType === DeviceType.MuditaPure) {
    return <Image src={PureGrayImage} data-testid={DeviceTestIds.PureGray} />
  }

  if (deviceType === DeviceType.MuditaHarmony) {
    return <Image src={HarmonyImage} />
  }
  if (deviceType === DeviceType.MuditaKompakt) {
    return <Image src={KompaktGrayImage} />
  }

  return <></>
}
