/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC, withConfig, withData } from "generic-view/utils"
import styled from "styled-components"
import { Tag } from "../shared/tag"

interface Config {
  versionLabel?: string
}

interface Data {
  version?: string
  update:
    | {
        available?: boolean
        text?: undefined
        actionLabel?: undefined
      }
    | {
        available: true
        text: string
        actionLabel: string
      }
}

const OverviewOsVersion: APIFC<Data, Config> = ({ config, data, ...props }) => {
  return (
    <Wrapper {...props}>
      {config?.versionLabel && (
        <VersionLabel>{config.versionLabel}</VersionLabel>
      )}
      <VersionInfo>
        {data?.version && <Version>{data.version}</Version>}
        {data?.update.available && <Tag>{data.update.text}</Tag>}
        {data?.update.available && (
          <ActionLabel>{data.update.actionLabel}</ActionLabel>
        )}
      </VersionInfo>
    </Wrapper>
  )
}

export default withConfig(withData(OverviewOsVersion))

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

const VersionLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  color: ${({ theme }) => theme.color.grey2};
  margin: 0;
  letter-spacing: 0.7px;
`

const VersionInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};
`

const Version = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
  margin: 0;
`

const ActionLabel = styled.p`
  flex: 1;
  text-align: right;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
`
