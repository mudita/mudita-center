/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Meta } from "@storybook/react"
import Backup from "App/overview/components/overview/backup/backup.component"
import BackupItemInfo from "Common/interfaces/backup-item-info.interface"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import { css } from "styled-components"
import { Story as StoryInterface } from "@storybook/react"
import { action } from "@storybook/addon-actions"

const lastBackup: BackupItemInfo = {
  createdAt: "2020-01-15T07:35:01.562Z",
  size: 102400,
}

const storyContainerStyle = css`
  main > * {
    min-width: 63rem;
  }
`

const Template: StoryInterface<
  React.ComponentProps<typeof Backup> & { storyTitle: string }
> = (args) => {
  return (
    <StoryContainer column customStyle={storyContainerStyle}>
      <Story title={args.storyTitle} transparentMode>
        <Backup
          onBackupCreate={args.onBackupCreate}
          onBackupRestore={args.onBackupRestore}
          lastBackup={args.lastBackup}
        />
      </Story>
    </StoryContainer>
  )
}
export const NoBackupAvailable = Template.bind({})
NoBackupAvailable.args = {
  onBackupCreate: action("create backup"),
}

export const BackupAvailable = Template.bind({})
BackupAvailable.args = {
  onBackupCreate: action("create backup"),
  onBackupRestore: action("restore backup"),
  lastBackup,
}

export default {
  title: "Views|Overview/Backup",
  component: Backup,
} as Meta
