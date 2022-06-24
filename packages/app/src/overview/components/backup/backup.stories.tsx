/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Meta } from "@storybook/react"
import Backup from "App/overview/components/backup/backup.component"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import { css } from "styled-components"
import { Story as StoryInterface } from "@storybook/react"
import { action } from "@storybook/addon-actions"

const storyContainerStyle = css`
  main > * {
    height: 20.5rem;
    width: 62rem;
  }
`

type Props = ComponentProps<typeof Backup> & { storyTitle: string }

const Template: StoryInterface<Props> = (args) => {
  return (
    <StoryContainer column customStyle={storyContainerStyle}>
      <Story title={args.storyTitle} transparentMode>
        <Backup
          onBackupCreate={args.onBackupCreate}
          onBackupRestore={args.onBackupRestore}
          lastBackupDate={args.lastBackupDate}
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
  lastBackupDate: new Date("2020-01-15T07:35:01.562Z"),
}

export default {
  title: "Views|Overview/Backup",
  component: Backup,
} as Meta
