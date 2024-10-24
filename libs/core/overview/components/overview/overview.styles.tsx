/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { DevicePreview } from "Core/overview/components/device-preview/device-preview.component"
import Status from "Core/overview/components/status/status.component"
import System from "Core/overview/components/system/system.component"
import FilesManager from "Core/overview/components/files-manager/files-manager.component"
import Backup from "Core/overview/components/backup/backup.component"
import TimeSynchronization from "../time-synchronization/time-synchronization.component"

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

export const TimeSynchronizationInfo = styled(TimeSynchronization)`
  grid-area: TimeSynchronization;
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
`

export const OverviewPureWrapper = styled(OverviewWrapper)`
  ${overviewWrapperWithBackup};
`

export const OverviewHarmonyWrapper = styled(OverviewWrapper)`
  grid-template-areas:
    "Device Network"
    "Device System"
    "Device TimeSynchronization";
  grid-template-rows: repeat(3, 1fr);
`

export const FileManagerInfo = styled(FilesManager)`
  grid-area: FilesManager;
  display: none; /* TODO: Remove when feature becomes available */
`
