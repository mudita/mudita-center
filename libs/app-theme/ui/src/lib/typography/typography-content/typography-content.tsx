/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  isValidElement,
  PropsWithChildren,
  ReactNode,
} from "react"
import { BaseTypographyProps } from "../base-typography"
import { Typography } from "../typography"

const isTypographyElement = (child: ReactNode): boolean => {
  if (!isValidElement(child)) return false

  const component = child.type as FunctionComponent
  const displayName = component?.displayName

  return (
    typeof displayName === "string" && displayName.startsWith("Typography.")
  )
}

export const TypographyContent: FunctionComponent<
  PropsWithChildren & BaseTypographyProps
> = ({ children, as: Component = Typography.P1, ...props }) => {
  if (!children) return null

  if (isTypographyElement(children)) {
    return children
  }

  return <Component {...props}>{children}</Component>
}
