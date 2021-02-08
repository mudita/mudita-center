/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ImgHTMLAttributes } from "react"

export interface LoaderSpinnerProps {
  size?: number
}

export enum LoaderType {
  Logo,
  Spinner,
}

export interface LoaderProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: number
  type: LoaderType
}
