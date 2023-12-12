/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType, CaseColor } from "Core/device/constants"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import Image from "Core/__deprecated__/renderer/components/core/image/image.component"
import PureGrayImage from "Core/__deprecated__/renderer/images/pure-gray-front.png"
import PureBlackImage from "Core/__deprecated__/renderer/images/pure-black-front.png"
import HarmonyImage from "Core/__deprecated__/renderer/images/harmony-render.png"
import { DeviceTestIds } from "Core/overview/components/device-preview/device-preview-test-ids.enum"

interface DeviceImageProps {
  deviceType: DeviceType
  caseColour?: CaseColor
}

export const DeviceImage: FunctionComponent<DeviceImageProps> = ({
  deviceType,
  caseColour,
}) => {
  return (
    <>
      {deviceType === DeviceType.MuditaPure ? (
        caseColour === CaseColor.Gray ? (
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <Image src={PureGrayImage} data-testid={DeviceTestIds.PureGray} />
        ) : (
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <Image src={PureBlackImage} data-testid={DeviceTestIds.PureBlack} />
        )
      ) : (
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <Image src={HarmonyImage} />
      )}
    </>
  )
}
