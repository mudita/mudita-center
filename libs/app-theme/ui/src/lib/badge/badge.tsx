/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { get } from "lodash"
import { IconType } from "app-theme/models"
import { AppColor, borderRadius, theme } from "app-theme/utils"
import { formatMessage } from "app-localize/utils"
import { Icon } from "../icon/icon"
import { Typography } from "../typography/typography"
import { icons } from "../icon/icons"
import { Translation } from "../shared/translation.type"

type Props = PropsWithChildren &
  Translation & {
    icon?: IconType
    backgroundColor?: AppColor
    color?: AppColor | "currentColor"
  }

export const Badge: FunctionComponent<Props> = ({
  icon,
  children,
  backgroundColor,
  color,
  message,
  values,
}) => {
  return (
    <Wrapper
      backgroundColor={backgroundColor}
      color={color}
      hasIcon={icon ? !!icons[icon] : false}
    >
      {icon && <BadgeIcon type={icon} />}
      {message ? (
        <Typography.P5>{formatMessage({ id: message }, values)}</Typography.P5>
      ) : (
        children
      )}
    </Wrapper>
  )
}

export const Wrapper = styled.div<Props & { hasIcon?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  padding: ${({ hasIcon }) => (hasIcon ? "0 0.6rem 0 0.1rem" : "0 0.6rem")};

  border-radius: ${borderRadius("medium")};
  background-color: ${({ backgroundColor = "grey5" }) =>
    get(theme.app.color, backgroundColor)};
  color: ${({ theme, color = "currentColor" }) =>
    color === "currentColor" ? "currentColor" : get(theme.app.color, color)};

  p {
    color: inherit;
  }
`

export const BadgeIcon = styled(Icon)`
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 0.1rem;
`
