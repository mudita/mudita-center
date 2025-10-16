/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Typography } from "app-theme/ui"
import styled from "styled-components"
import { ButtonSize, ButtonType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  lastBackupLabel: {
    id: "apiDevice.overview.backupSection.lastBackupLabel",
  },
  noBackupsInfo: {
    id: "apiDevice.overview.backupSection.noBackupsInfo",
  },
  restoreFromBackupButtonLabel: {
    id: "apiDevice.overview.backupSection.restoreButton",
  },
  createBackupButtonLabel: {
    id: "apiDevice.overview.backupSection.backupButton",
  },
})

interface Props {
  lastBackupDate?: Date
  onCreateBackup?: VoidFunction
  onRestoreBackup?: VoidFunction
}

export const McOverviewBackup: FunctionComponent<Props> = ({
  lastBackupDate,
  onCreateBackup,
  onRestoreBackup,
}) => {
  return (
    <Wrapper>
      <Info>
        {lastBackupDate ? (
          <>
            <Typography.P3 message={messages.lastBackupLabel.id} />
            <Typography.P1 color={"black"}>
              {lastBackupDate?.toLocaleString("en-US", {
                dateStyle: "long",
              })}
            </Typography.P1>
          </>
        ) : (
          <NoBackupsInfo message={messages.noBackupsInfo.id} />
        )}
      </Info>
      <Actions>
        {lastBackupDate && (
          <Button
            type={ButtonType.Secondary}
            size={ButtonSize.Big}
            onClick={onRestoreBackup}
            message={messages.restoreFromBackupButtonLabel.id}
          />
        )}
        <Button
          type={ButtonType.Primary}
          size={ButtonSize.Big}
          onClick={onCreateBackup}
          message={messages.createBackupButtonLabel.id}
        />
      </Actions>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const NoBackupsInfo = styled(Typography.P3)`
  margin-top: 0.6rem;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.4rem;
`
