/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  LoaderProps,
  LoaderType,
} from "App/__deprecated__/renderer/components/core/loader/loader.interface"
import LoaderSpinner from "App/__deprecated__/renderer/components/core/loader/loader-spinner.component"
import LoaderLogo from "App/__deprecated__/renderer/components/core/loader/loader-logo.component"

const Loader: FunctionComponent<LoaderProps> = ({ type, size, ...props }) => {
  return (
    <>
      {type === LoaderType.Logo ? (
        <LoaderLogo size={size} {...props} />
      ) : (
        <LoaderSpinner size={size} {...props} />
      )}
    </>
  )
}

export default Loader
