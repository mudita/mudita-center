/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled from "styled-components"
import { Tag } from "../shared/tag"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import {
  OverviewOsVersionConfig,
  OverviewOsVersionData,
} from "generic-view/models"

const dataTestIds = {
  versionWrapper: "version-wrapper",
  versionLabel: "version-label",
  version: "version",
  actionLabel: "action-label",
}

const messages = defineMessages({
  updateTag: { id: "module.genericViews.update.tag" },
  updateActionLabel: { id: "module.genericViews.update.actionLabel" },
})

export const OverviewOsVersion: APIFC<
  OverviewOsVersionData,
  OverviewOsVersionConfig
> = ({ config, data, ...props }) => {
  return (
    <Wrapper {...props} data-testid={dataTestIds.versionWrapper}>
      {config?.versionLabel && (
        <VersionLabel data-testid={dataTestIds.versionLabel}>
          {config.versionLabel}
        </VersionLabel>
      )}
      <VersionInfo>
        {data?.text && (
          <Version data-testid={dataTestIds.version}>{data?.text}</Version>
        )}
        {data?.update?.available && (
          <Tag>
            {intl.formatMessage(messages.updateTag, {
              version: data?.update.updateText,
            })}
          </Tag>
        )}
        {config?.showBadge && !data?.update?.available && (
          <Tag>{data?.badgeText}</Tag>
        )}
        {data?.update?.available && (
          <ActionLabel data-testid={dataTestIds.actionLabel}>
            {data.update.actionLabel ??
              intl.formatMessage(messages.updateActionLabel)}
          </ActionLabel>
        )}
      </VersionInfo>
    </Wrapper>
  )
}

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
