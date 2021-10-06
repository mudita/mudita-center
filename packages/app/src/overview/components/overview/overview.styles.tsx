/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { DevicePreview } from "App/overview/components/device-preview/device-preview.component"
import Status from "App/overview/components/status/status.component"
import System from "App/overview/components/system/system.component"
import FilesManager from "App/overview/components/files-manager/files-manager.component"

export const DeviceInfo = styled(DevicePreview)`
  grid-area: Device;
`

export const StatusInfo = styled(Status)`
  grid-area: Network;
`
export const SystemInfo = styled(System)`
  grid-area: System;
`

export const OverviewWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(27rem, 1fr) 2fr;
  /* TODO: Change to grid-template-rows: repeat(4, 1fr) when Files Manager will be available */
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
  padding: 3.2rem 3rem 3.7rem 4rem;
  grid-template-areas:
    "Device Network"
    "Device System"
    /*"Device FilesManager" TODO: Uncomment when feature is done */;
`

export const FileManagerInfo = styled(FilesManager)`
  grid-area: FilesManager;
  display: none; /* TODO: Remove when feature becomes available */
`
