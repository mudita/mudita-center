/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import kompaktBlackSmall from "./kompakt-black-small.png"
import kompaktBlackBig from "./kompakt-black-big.png"
import harmony1WhiteSmall from "./harmony-1-white-small.png"
import harmony1WhiteBig from "./harmony-1-white-big.png"
import harmony2BlackSmall from "./harmony-2-black-small.png"
import harmony2BlackBig from "./harmony-2-black-big.png"
import harmonyMscWhiteSmall from "./harmony-msc-white-small.png"
import harmonyMscWhiteBig from "./harmony-msc-white-big.png"
import pureBlackSmall from "./pure-black-small.png"
import pureBlackBig from "./pure-black-big.png"
import pureWhiteSmall from "./pure-white-small.png"
import pureWhiteBig from "./pure-white-big.png"
import {
  DeviceImageColor,
  DeviceImageSize,
  DeviceImageType,
} from "devices/common/models"

export const devicesImages = {
  [DeviceImageType.Kompakt]: {
    [DeviceImageColor.Black]: {
      [DeviceImageSize.Small]: kompaktBlackSmall,
      [DeviceImageSize.Big]: kompaktBlackBig,
    },
  },
  [DeviceImageType.Harmony1]: {
    [DeviceImageColor.White]: {
      [DeviceImageSize.Small]: harmony1WhiteSmall,
      [DeviceImageSize.Big]: harmony1WhiteBig,
    },
  },
  [DeviceImageType.Harmony2]: {
    [DeviceImageColor.Black]: {
      [DeviceImageSize.Small]: harmony2BlackSmall,
      [DeviceImageSize.Big]: harmony2BlackBig,
    },
  },
  [DeviceImageType.HarmonyMsc]: {
    [DeviceImageColor.White]: {
      [DeviceImageSize.Small]: harmonyMscWhiteSmall,
      [DeviceImageSize.Big]: harmonyMscWhiteBig,
    },
  },
  [DeviceImageType.Pure]: {
    [DeviceImageColor.Black]: {
      [DeviceImageSize.Small]: pureBlackSmall,
      [DeviceImageSize.Big]: pureBlackBig,
    },
    [DeviceImageColor.White]: {
      [DeviceImageSize.Small]: pureWhiteSmall,
      [DeviceImageSize.Big]: pureWhiteBig,
    },
  },
} satisfies {
  [key in DeviceImageType]: {
    [key in DeviceImageColor]?: {
      [key in DeviceImageSize]: string
    }
  }
}
