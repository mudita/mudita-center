/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType, CaseColor } from "App/device/constants"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Image from "App/__deprecated__/renderer/components/core/image/image.component"
import PureGrayImage from "App/__deprecated__/renderer/images/pure-gray-front.png"
import PureBlackImage from "App/__deprecated__/renderer/images/pure-black-front.png"
import HarmonyImage from "App/__deprecated__/renderer/images/harmony-render.png"
import { DeviceTestIds } from "App/overview/components/device-preview/device-preview-test-ids.enum"

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
