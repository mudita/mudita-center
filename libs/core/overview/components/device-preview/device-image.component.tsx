/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType, CaseColour } from "Core/device/constants"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Image from "Core/__deprecated__/renderer/components/core/image/image.component"
import { DeviceTestIds } from "Core/overview/components/device-preview/device-preview-test-ids.enum"
import PureGrayImage from "Core/__deprecated__/renderer/images/pure-gray-render.png"
import PureBlackImage from "Core/__deprecated__/renderer/images/pure-black-render.png"
import KompaktBlackImage from "Core/__deprecated__/renderer/images/kompakt-black-render.png"
import HarmonyGrayImage from "Core/__deprecated__/renderer/images/harmony-gray-render.png"
import HarmonyBlackImage from "Core/__deprecated__/renderer/images/harmony-black-render.png"

interface DeviceImageProps {
  deviceType: DeviceType
  caseColour?: CaseColour
}

export const DeviceImage: FunctionComponent<DeviceImageProps> = ({
  deviceType,
  caseColour = CaseColour.Black,
  ...props
}) => {
  if (deviceType === DeviceType.MuditaPure && caseColour === CaseColour.Black) {
    return <Image src={PureBlackImage} data-testid={DeviceTestIds.PureBlack} {...props} />
  }

  if (deviceType === DeviceType.MuditaPure) {
    return <Image src={PureGrayImage} data-testid={DeviceTestIds.PureGray} {...props}/>
  }

  if (deviceType === DeviceType.MuditaHarmony && caseColour === CaseColour.Black) {
    return <Image src={HarmonyBlackImage} {...props}/>
  }

  if (deviceType === DeviceType.MuditaHarmony) {
    return <Image src={HarmonyGrayImage} {...props}/>
  }
  if (deviceType === DeviceType.APIDevice) {
    return <Image src={KompaktBlackImage} {...props}/>
  }

  return <></>
}
