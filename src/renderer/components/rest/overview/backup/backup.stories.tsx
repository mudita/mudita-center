import React from "react"
import { storiesOf } from "@storybook/react"
import Backup from "Renderer/components/rest/overview/backup/backup.component"
import { action } from "@storybook/addon-actions"
import BackupItemInfo from "Common/interfaces/backup-item-info.interface"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import { css } from "styled-components"
import { BackupStartModal } from "Renderer/modules/overview/backup-process/backup-start-modal.component"
import { BackupLoadingModal } from "Renderer/modules/overview/backup-process/backup-loading-modal.component"
import { BackupFailedModal } from "Renderer/modules/overview/backup-process/backup-failed-modal.component"
import { BackupFinishedModal } from "Renderer/modules/overview/backup-process/backup-finished-modal.component"
import { BackupRestorationStartModal } from "Renderer/modules/overview/backup-process/restoration-start-modal.component"
import { BackupRestorationLoadingModal } from "Renderer/modules/overview/backup-process/restoration-loading-modal.component"
import { BackupRestorationFailedModal } from "Renderer/modules/overview/backup-process/restoration-failed-modal.component"
import { BackupRestorationFinishedModal } from "Renderer/modules/overview/backup-process/restoration-finished-modal.component"
import { mockedBackupItems } from "App/__mocks__/mocked-backup-items"

export const lastBackup: BackupItemInfo = {
  createdAt: "2020-01-15T07:35:01.562Z",
  size: 102400,
}

const storyContainerStyle = css`
  main > * {
    min-width: 63rem;
  }
`

storiesOf("Modules|Overview/Backup", module)
  .add("Default", () => (
    <StoryContainer column customStyle={storyContainerStyle}>
      <Story title="No backup available" transparentMode>
        <Backup onBackupCreate={action("create backup")} />
      </Story>
      <Story title="A backup is available" transparentMode>
        <Backup
          lastBackup={lastBackup}
          onBackupCreate={action("create backup")}
          onBackupRestore={action("restore backup")}
        />
      </Story>
    </StoryContainer>
  ))
  .add("Modals - creating backup", () => (
    <StoryContainer column>
      <Story title="Start" transparentMode>
        <BackupStartModal fileSize="100 MB" date="22/07/2020" />
      </Story>
      <Story title="In progress" transparentMode>
        <BackupLoadingModal progress={49} />
      </Story>
      <Story title="Failed" transparentMode>
        <BackupFailedModal />
      </Story>
      <Story title="Completed" transparentMode>
        <BackupFinishedModal
          items={mockedBackupItems}
          destination={"/Users/John Doe/backups"}
        />
      </Story>
    </StoryContainer>
  ))
  .add("Modals - restoring backup", () => (
    <StoryContainer column>
      <Story title="Start" transparentMode>
        <BackupRestorationStartModal items={mockedBackupItems} />
      </Story>
      <Story title="In progress" transparentMode>
        <BackupRestorationLoadingModal progress={49} />
      </Story>
      <Story title="Failed" transparentMode>
        <BackupRestorationFailedModal />
      </Story>
      <Story title="Completed" transparentMode>
        <BackupRestorationFinishedModal />
      </Story>
    </StoryContainer>
  ))
