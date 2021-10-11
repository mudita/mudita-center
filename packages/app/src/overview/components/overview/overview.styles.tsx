/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { DevicePreview } from "App/overview/components/device-preview/device-preview.component"
import Status from "App/overview/components/status/status.component"
import System from "App/overview/components/system/system.component"
import FilesManager from "App/overview/components/files-manager/files-manager.component"
import Backup from "App/overview/components/backup/backup.component"
import { Feature, flags } from "App/feature-flags"

export const DeviceInfo = styled(DevicePreview)`
  grid-area: Device;
`

export const StatusInfo = styled(Status)`
  grid-area: Network;
`
export const SystemInfo = styled(System)`
  grid-area: System;
`

export const BackupInfo = styled(Backup)`
  grid-area: Backup;
`

const overviewWrapperWithBackup = css`
  grid-template-rows: repeat(3, minmax(20.4rem, 1fr));
  grid-template-areas:
    "Device Network"
    "Device System"
    "Device Backup";
`

export const OverviewWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(28rem, 1fr) 2fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 3.2rem;
  grid-row-gap: 3.2rem;
  padding: 3.2rem;
  grid-template-areas:
    "Device Network"
    "Device System";
  ${flags.get(Feature.Backup) && overviewWrapperWithBackup};
`

export const FileManagerInfo = styled(FilesManager)`
  grid-area: FilesManager;
  display: none; /* TODO: Remove when feature becomes available */
`
