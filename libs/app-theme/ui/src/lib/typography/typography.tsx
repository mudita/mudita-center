/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { P1, P2, P3, P4, P5 } from "./paragraphsStyles"
import { H1, H2, H3, H4, H5 } from "./headlinesStyles"
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
} = () => {
  return null
}

const wrapWithBaseTypography = (
  Component: FunctionComponent<PropsWithChildren>
) => {
  return ({ children, ...props }: PropsWithChildren) => {
    return (
      <BaseTypography {...props}>
        <Component>{children}</Component>
      </BaseTypography>
    )
  }
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

//
// const TypographyWrapper = styled.div<TypographyWrapperStyledProps>`
//   &,
//   ${Content} p {
//     margin: 0;
//     padding: 0;
//     white-space: pre-wrap;
//     color: ${({ theme, $color }) => theme.color[$color]};
//     letter-spacing: ${({ letterSpacing }) => letterSpacing};
//
//     font-size: ${({ fontSize, theme }) => fontSize({ theme })};
//     line-height: ${({ fontHeight, theme }) => fontHeight({ theme })};
//     font-weight: ${({ fontWeight, theme }) =>
//       fontWeight && fontWeight({ theme })};
//
//     b,
//     strong {
//       font-weight: ${({ strongFontWeight, theme }) =>
//         strongFontWeight && strongFontWeight({ theme })};
//     }
//
//     ${({ $singleLine }) =>
//       $singleLine &&
//       css`
//         white-space: nowrap;
//         overflow: hidden;
//         text-overflow: ellipsis;
//       `}
//
//     text-transform: ${({ $textTransform = "unset" }) =>
//       $textTransform === "capitalize-first-letter"
//         ? "lowercase"
//         : $textTransform};
//
//     ${({ $textTransform }) =>
//       $textTransform === "capitalize-first-letter" &&
//       css`
//         &:first-letter {
//           text-transform: uppercase;
//         }
//       `}
//
//     text-align: ${({ $textAlign = "unset" }) => $textAlign};
//
//     ${({ $unbold }) =>
//       $unbold &&
//       css`
//         font-weight: ${({ theme }) => theme.fontWeight.regular};
//
//         b,
//         strong {
//           font-weight: ${({ theme }) => theme.fontWeight.bold};
//         }
//       `}
//   }
// `
//
// export const Typography = BaseTypography as typeof BaseTypography & {
//   H3: typeof BaseTypography
//   H4: typeof BaseTypography
//   H5: typeof BaseTypography
//   P1: typeof BaseTypography
//   P2: typeof BaseTypography
//   P3: typeof BaseTypography
//   P4: typeof BaseTypography
//   P5: typeof BaseTypography
// }
//
// Typography.H3 = (props) => (
//   <BaseTypography {...props} componentName="typography.h3" />
// )
//
// Typography.H4 = (props) => (
//   <BaseTypography {...props} componentName="typography.h4" />
// )
//
// Typography.H5 = (props) => (
//   <BaseTypography {...props} componentName="typography.h5" />
// )
//
// Typography.P1 = (props) => (
//   <BaseTypography {...props} componentName="typography.p1" />
// )
//
// Typography.P2 = (props) => (
//   <BaseTypography {...props} componentName="typography.p2" />
// )
//
// Typography.P3 = (props) => (
//   <BaseTypography {...props} componentName="typography.p3" />
// )
//
// Typography.P4 = (props) => (
//   <BaseTypography {...props} componentName="typography.p4" />
// )
//
// Typography.P5 = (props) => (
//   <BaseTypography {...props} componentName="typography.p5" />
// )
