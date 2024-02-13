/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled from "styled-components"
import { ButtonText } from "../buttons/button-text"
import { ButtonPrimary } from "../buttons/button-primary"
import { withConfig } from "../utils/with-config"
import { selectDeviceBackups, selectLastBackup } from "generic-view/store"
import { useSelector } from "react-redux"

interface Feature {
  label: string
  key: string
  supportedKeys?: string[]
}

interface Config {
  noBackupLabel?: string
  backupAvailableLabel?: string
  restoreFromBackupLabel?: string
  createBackupLabel?: string
  supportedFeatures: Feature[]
}

export const BackupBox: APIFC<undefined, Config> = ({ config }) => {
  const backups = useSelector(selectDeviceBackups)
  const lastBackup = useSelector(selectLastBackup)
  return (
    <Wrapper>
      {backups.length === 0 ? (
        <NoBackupLabel>
          {config?.noBackupLabel ||
            "You haven’t backed up your device yet.\nCreate your first backup file."}
        </NoBackupLabel>
      ) : (
        <BackupAvailable>
          <BackupAvailableLabel>
            {config?.backupAvailableLabel || "Last backup:"}
          </BackupAvailableLabel>
          <BackupDate>{lastBackup?.date.toDateString()}</BackupDate>
          <ButtonText
            config={{
              text: config?.restoreFromBackupLabel || "Restore from backup",
              action: {
                type: "navigate",
                viewKey: "restore-from-backup",
              },
              modifiers: ["link", "uppercase"],
            }}
          />
        </BackupAvailable>
      )}
      <ButtonPrimary
        config={{
          text: config?.createBackupLabel || "Create backup",
          action: {
            type: "navigate",
            viewKey: "create-backup",
          },
        }}
      />
    </Wrapper>
  )
}

export default withConfig(BackupBox)

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 17.6rem;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};
`

const NoBackupLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  color: ${({ theme }) => theme.color.grey2};
  white-space: pre;
  margin: 0;
`

const BackupAvailable = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  row-gap: ${({ theme }) => theme.space.xs};
  column-gap: ${({ theme }) => theme.space.lg};
`

const BackupAvailableLabel = styled.p`
  width: 100%;
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
