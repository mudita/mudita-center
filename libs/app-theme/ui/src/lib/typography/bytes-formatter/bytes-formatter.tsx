/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { formatBytes, Options } from "./format-bytes"

type Props = Options & PropsWithChildren

export const BytesFormatter: FunctionComponent<Props> = ({
  children,
  minUnit,
}) => {
  if (!children) {
    return null
  }
  if (typeof children === "string" && children.trim() === "") {
    return children
  }

  const bytes = Number(children)
  if (isNaN(bytes)) {
    return children
  }

  return formatBytes(Number(children), { minUnit })
}
