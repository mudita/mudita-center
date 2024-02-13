/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled from "styled-components"
import { Tag } from "../shared/tag"
import { withData } from "../utils/with-data"
import { withConfig } from "../utils/with-config"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  updateTag: { id: "module.genericViews.update.tag" },
  updateActionLabel: { id: "module.genericViews.update.actionLabel" },
})

interface Config {
  versionLabel?: string
  showBadge?: boolean
}

interface Data {
  version?: string
  text?: string
  badgeText?: string
  update?:
    | {
        available?: boolean
        actionLabel?: undefined
        updateVersion?: string
        updateText?: string
      }
    | {
        available: true
        actionLabel?: string
        updateVersion: string
        updateText: string
      }
}

const OverviewOsVersion: APIFC<Data, Config> = ({ config, data, ...props }) => {
  return (
    <Wrapper {...props}>
      {config?.versionLabel && (
        <VersionLabel>{config.versionLabel}</VersionLabel>
      )}
      <VersionInfo>
        {data?.text && <Version>{data.text}</Version>}
        {config?.showBadge && <Tag>{data?.badgeText}</Tag>}
        {data?.update?.available && (
          <Tag>
            {intl.formatMessage(messages.updateTag, {
              version: data.update.updateText,
            })}
          </Tag>
        )}
        {data?.update?.available && (
          <ActionLabel>
            {data.update.actionLabel ??
              intl.formatMessage(messages.updateActionLabel)}
          </ActionLabel>
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
  letter-spacing: 0.07rem;
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
  text-transform: lowercase;

  &:first-letter {
    text-transform: uppercase;
  }
`

const ActionLabel = styled.p`
  flex: 1;
  text-align: right;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
`
