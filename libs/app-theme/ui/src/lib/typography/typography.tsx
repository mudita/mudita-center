/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { ListItem, P1, P2, P3, P4, P5 } from "./paragraphs"
import { H1, H2, H3, H4, H5 } from "./headlines"
import { BaseTypography } from "./base-typography"

export const Typography: FunctionComponent & {
  H1: typeof BaseTypography
  H2: typeof BaseTypography
  H3: typeof BaseTypography
  H4: typeof BaseTypography
  H5: typeof BaseTypography
  P1: typeof BaseTypography
  P2: typeof BaseTypography
  P3: typeof BaseTypography
  P4: typeof BaseTypography
  P5: typeof BaseTypography
  LI: typeof BaseTypography
} = () => {
  return null
}

const wrapWithBaseTypography = (
  Component: FunctionComponent<PropsWithChildren>
) => {
  const Wrapped: FunctionComponent<PropsWithChildren> = ({
    children,
    ...props
  }) => {
    return (
      <BaseTypography {...props}>
        <Component>{children}</Component>
      </BaseTypography>
    )
  }

  const name = Component.displayName || Component.name || "Anonymous"
  Wrapped.displayName = `Typography.${name}`

  return Wrapped
}

Typography.H1 = wrapWithBaseTypography(H1)
Typography.H2 = wrapWithBaseTypography(H2)
Typography.H3 = wrapWithBaseTypography(H3)
Typography.H4 = wrapWithBaseTypography(H4)
Typography.H5 = wrapWithBaseTypography(H5)

Typography.P1 = wrapWithBaseTypography(P1)
Typography.P2 = wrapWithBaseTypography(P2)
Typography.P3 = wrapWithBaseTypography(P3)
Typography.P4 = wrapWithBaseTypography(P4)
Typography.P5 = wrapWithBaseTypography(P5)

Typography.LI = wrapWithBaseTypography(ListItem)
