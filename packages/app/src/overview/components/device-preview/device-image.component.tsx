/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType, CaseColour } from "@mudita/pure"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { flags, Feature } from "App/feature-flags"
import Image from "Renderer/components/core/image/image.component"
import PureGrayImage from "Renderer/images/pure-gray-front.png"
import PureBlackImage from "Renderer/images/pure-black-front.png"
import HarmonyImage from "Renderer/images/harmony-render.png"
import { DeviceTestIds } from "App/overview/components/device-preview/device-preview-test-ids.enum"

interface DeviceImageProps {
  deviceType: DeviceType
  caseColour?: CaseColour
}

export const DeviceImage: FunctionComponent<DeviceImageProps> = ({ deviceType, caseColour }) => {
  return (
    <>
      {deviceType === DeviceType.MuditaPure ? (
        flags.get(Feature.PhoneColour) ? (
          caseColour === CaseColour.Gray ? (
            <Image src={PureGrayImage} data-testid={DeviceTestIds.PureGray} />
          ) : (
            <Image src={PureBlackImage} data-testid={DeviceTestIds.PureBlack} />
          )
        ) : <Image src={PureGrayImage} data-testid={DeviceTestIds.PureGray} />
      ) : <Image src={HarmonyImage} />}
    </>
  )
}
