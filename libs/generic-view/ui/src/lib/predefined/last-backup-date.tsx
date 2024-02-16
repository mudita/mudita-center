/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { isEmpty } from "lodash"
import styled from "styled-components"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { selectLastBackup } from "generic-view/store"
import { APIFC } from "generic-view/utils"
import { defineMessages } from "react-intl"
import { withConfig } from "../utils/with-config"

interface Config {
  noBackupLabel?: string
  backupAvailableLabel?: string
}

const messages = defineMessages({
  noBackupLabel: {
    id: "module.genericBackup.noBackupLabel",
  },
  backupAvailableLabel: {
    id: "module.genericBackup.backupAvailableLabel",
  },
})

export const LastBackupDate: APIFC<undefined, Config> = ({
  data,
  config,
  ...props
}) => {
  const lastBackup = useSelector(selectLastBackup)

  if (isEmpty(lastBackup)) {
    return (
      <NoBackupLabel {...props}>
        {config?.noBackupLabel
          ? config.noBackupLabel
          : intl.formatMessage(messages.noBackupLabel)}
      </NoBackupLabel>
    )
  }

  return (
    <BackupAvailable {...props}>
      <BackupAvailableLabel>
        {config?.backupAvailableLabel
          ? config.backupAvailableLabel
          : intl.formatMessage(messages.backupAvailableLabel)}
      </BackupAvailableLabel>
      <BackupDate>
        {lastBackup?.date.toLocaleDateString("en-US", { dateStyle: "long" })}
      </BackupDate>
    </BackupAvailable>
  )
}

export default withConfig(LastBackupDate)

const NoBackupLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  color: ${({ theme }) => theme.color.grey2};
  white-space: pre;
  margin: 0;
`

const BackupAvailable = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.space.xs};
  column-gap: ${({ theme }) => theme.space.lg};
`

const BackupAvailableLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  color: ${({ theme }) => theme.color.grey2};
  margin: 0;
  letter-spacing: 0.07rem;
`

const BackupDate = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
  margin: 0;
  text-transform: lowercase;

  &:first-letter {
    text-transform: uppercase;
  }
`
