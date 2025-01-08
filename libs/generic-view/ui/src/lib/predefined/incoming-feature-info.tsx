/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { IncomingFeatureInfoConfig } from "generic-view/models"
import { Typography } from "../typography"
import { Icon } from "../icon/icon"

const dataTestId = {
  wrapper: "incoming-feature-info-wrapper",
  header: "incoming-feature-info-header",
  text: "incoming-feature-info-text",
}

export const IncomingFeatureInfo: APIFC<
  undefined,
  IncomingFeatureInfoConfig
> = ({ config, children, ...props }) => {
  const dataTestIdSuffix = config.header
    .toLocaleLowerCase()
    .replaceAll(" ", "-")

  return (
    <Wrapper {...props} data-testid={dataTestId.wrapper}>
      <IconWrapper config={{ type: config.icon }} />
      <TextWrapper>
        <Typography.H4
          config={undefined}
          data-testid={`${dataTestId.header}-${dataTestIdSuffix}`}
        >
          {config.header}
        </Typography.H4>
        <Typography.P2
          config={undefined}
          data-testid={`${dataTestId.text}-${dataTestIdSuffix}`}
        >
          {" "}
          {config.text}
        </Typography.P2>
      </TextWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  gap: 1.2rem;
  height: 7.8rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.grey4};
  background-color: ${({ theme }) => theme.color.grey6};
`

const IconWrapper = styled(Icon)`
  width: 4.8rem;
  height: 4.8rem;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
