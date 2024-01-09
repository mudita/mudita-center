/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC, useScreenTitle, withConfig } from "generic-view/utils"
import styled from "styled-components"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { GenericViewLink } from "../shared/generic-view-link"

interface Config {
  linkViewKey: string
  label: string
  icon: string
}

const IconLink: APIFC<undefined, Config> = ({ config, ...props }) => {
  const currentViewName = useScreenTitle(props.viewKey as string)
  return (
    <Wrapper
      to={{
        pathname: `/generic/${config?.linkViewKey}`,
        state: {
          previousViewName: currentViewName,
        },
      }}
      {...props}
    >
      <Icon type={IconType.Pure} size={IconSize.Medium} />
      <Label>{config?.label}</Label>
    </Wrapper>
  )
}

export default withConfig(IconLink)

const Wrapper = styled(GenericViewLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  padding: 0.4rem;
`

const Label = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.link};
  line-height: ${({ theme }) => theme.lineHeight.link};
  letter-spacing: 0.12rem;
  text-transform: uppercase;
`
