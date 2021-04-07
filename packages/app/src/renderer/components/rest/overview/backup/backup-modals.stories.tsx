import { Meta } from "@storybook/react"
import { BackupStartModal } from "Renderer/modules/overview/backup-process/backup-start-modal.component"
import Story from "Renderer/components/storybook/story.component"
import { mockedBackupItems } from "App/__mocks__/mocked-backup-items"
import React from "react"
import { BackupLoadingModal } from "Renderer/modules/overview/backup-process/backup-loading-modal.component"
import { BackupFailedModal } from "Renderer/modules/overview/backup-process/backup-failed-modal.component"
import { BackupFinishedModal } from "Renderer/modules/overview/backup-process/backup-finished-modal.component"
import { BackupRestorationStartModal } from "Renderer/modules/overview/backup-process/restoration-start-modal.component"
import { BackupRestorationLoadingModal } from "Renderer/modules/overview/backup-process/restoration-loading-modal.component"
import { BackupRestorationFailedModal } from "Renderer/modules/overview/backup-process/restoration-failed-modal.component"
import { BackupRestorationFinishedModal } from "Renderer/modules/overview/backup-process/restoration-finished-modal.component"

export const BackupStartStory = () => {
  return (
    <Story title="Start" transparentMode>
      <BackupStartModal
        date="2020-07-20T19:25:00+02:00"
        items={mockedBackupItems}
        total={"18.1 Gb"}
        isOpen
      />
    </Story>
  )
}

export const BackupLoadingStory = () => {
  return (
    <Story transparentMode>
      <BackupLoadingModal progress={49} isOpen />
    </Story>
  )
}

export const BackupFinishedStory = () => {
  return (
    <Story transparentMode>
      <BackupFinishedModal
        isOpen
        items={mockedBackupItems}
        destination={"/Users/John Doe/backups"}
      />
    </Story>
  )
}

export const BackupFailedStory = () => {
  return (
    <Story transparentMode>
      <BackupFailedModal isOpen />
    </Story>
  )
}

export const BackupRestorationStartStory = () => {
  return (
    <Story transparentMode>
      <BackupRestorationStartModal items={mockedBackupItems} isOpen />
    </Story>
  )
}

export const BackupRestorationLoadingStory = () => {
  return (
    <Story transparentMode>
      <BackupRestorationLoadingModal progress={49} isOpen />
    </Story>
  )
}

export const BackupRestorationFailedStory = () => {
  return (
    <Story transparentMode>
      <BackupRestorationFailedModal isOpen />
    </Story>
  )
}

export const BackupRestorationFinishedStory = () => {
  return (
    <Story transparentMode>
      <BackupRestorationFinishedModal isOpen />
    </Story>
  )
}

export default {
  title: "Views|Overview/Backup Modals",
  component: BackupStartModal,
} as Meta
