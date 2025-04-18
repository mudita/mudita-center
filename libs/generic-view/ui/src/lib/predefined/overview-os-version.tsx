/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import axios from "axios"
import styled from "styled-components"
import { MuditaCenterServerRoutes } from "shared/utils"
import { selectActiveDeviceConfiguration } from "generic-view/store"
import { APIFC } from "generic-view/utils"
import {
  OverviewOsVersionConfig,
  OverviewOsVersionData,
} from "generic-view/models"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import logger from "Core/__deprecated__/main/utils/logger"
import { Tag } from "../labels/tag"

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

const serverUrl = process.env.MUDITA_CENTER_SERVER_URL

export const OverviewOsVersion: APIFC<
  OverviewOsVersionData,
  OverviewOsVersionConfig
> = ({ config, data, ...props }) => {
  const deviceConfiguration = useSelector(selectActiveDeviceConfiguration)
  const [availableUpdateName, setAvailableUpdateName] = useState<string>()
  const updateAvailable = availableUpdateName !== undefined
  const { osVersionTimestamp, otaApiKey } =
    deviceConfiguration?.apiConfig?.otaApiConfig || {}

  useEffect(() => {
    void (async () => {
      if (!serverUrl) {
        return
      }
      try {
        const { data } = await axios.get<{
          available: boolean
          versionName?: string
        }>(
          `${serverUrl}/${MuditaCenterServerRoutes.KompaktOsUpdateAvailability}?imei=${otaApiKey}&version=${osVersionTimestamp}`
        )
        if (data && data.available && data.versionName) {
          setAvailableUpdateName(data.versionName)
        }
      } catch (error) {
        logger.error(
          `Error while checking Kompakt OS update availability for ${otaApiKey}, version ${osVersionTimestamp}.`,
          error
        )
      }
    })()
  }, [osVersionTimestamp, otaApiKey])

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
        {updateAvailable && (
          <Tag>
            {intl.formatMessage(messages.updateTag, {
              version: availableUpdateName,
            })}
          </Tag>
        )}
        {config?.showBadge && !updateAvailable && <Tag>{data?.badgeText}</Tag>}
        {updateAvailable && (
          <ActionLabel data-testid={dataTestIds.actionLabel}>
            {data?.update?.actionLabel ??
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
`

const ActionLabel = styled.p`
  flex: 1;
  text-align: right;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
`
