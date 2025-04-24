/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"

const BackupWrapper = styled.section`
  overflow: hidden;
  display: flex;
  flex: 1;
`

const BackupTableRow = styled(SettingsTableRow)`
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 20rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
  width: 100%;
`

interface BackupProps {
  backupLocation: Settings["osBackupLocation"]
  openDialog?: () => void
}

export const Backup: FunctionComponent<BackupProps> = ({
  backupLocation,
  openDialog,
}) => {
  return <BackupWrapper></BackupWrapper>
}
