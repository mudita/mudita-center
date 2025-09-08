/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Meta } from "@storybook/react"
import { styled } from "storybook/theming"
import { StoryObj } from "@storybook/react-vite"
import { action } from "storybook/actions"
import { HarmonyCheckingForUpdateModal } from "./harmony-checking-for-update-modal"
import { HarmonyUpdateNotAvailableModal } from "./harmony-update-not-available-modal"
import { HarmonyUpdateAvailableModal } from "./harmony-update-available-modal"
import { HarmonyUpdateDownloadedModal } from "./harmony-update-downloaded-modal"
import { HarmonyUpdateDownloadingModal } from "./harmony-update-downloading-modal"
import { HarmonyUpdateInstallingModal } from "./harmony-update-installing-modal"
import { HarmonyUpdateCompleteModal } from "./harmony-update-complete-modal"
import { HarmonyUpdateFailedModal } from "./harmony-update-failed-modal"
import { HarmonyUpdateBatteryFlatModal } from "./harmony-update-battery-flat-modal"

const Decorator = styled.div`
  width: 100%;
  height: 100%;

  .ReactModalPortal {
    width: 100%;
    height: 100%;
  }

  .ReactModal__Overlay {
    width: 100%;
    height: 100%;
    position: relative !important;
    padding: 2rem !important;
    box-sizing: border-box !important;
  }
`

const meta: Meta = {
  title: "Devices/Harmony/OS Update",
  decorators: [
    (Story) => (
      <Decorator className={"story-decorator"}>
        <Story />
      </Decorator>
    ),
  ],
}

export default meta

export const Default: StoryObj<typeof HarmonyCheckingForUpdateModal> = {
  name: "Checking for update modal",
  args: {
    opened: true,
    onClose: action("onClose"),
  },
  render: (args) => <HarmonyCheckingForUpdateModal {...args} />,
}

export const NotAvailable: StoryObj<typeof HarmonyUpdateNotAvailableModal> = {
  name: "Update not available modal",
  args: {
    opened: true,
    currentVersion: "1.0.0",
    onClose: action("onClose"),
  },
  render: (args) => <HarmonyUpdateNotAvailableModal {...args} />,
}

export const Available: StoryObj<typeof HarmonyUpdateAvailableModal> = {
  name: "Update available modal",
  args: {
    opened: true,
    newVersion: "2.0.0",
    downloadRequired: true,
    onUpdate: action("onUpdate"),
    onClose: action("onClose"),
    onDownload: action("onDownload"),
  },
  render: (args) => <HarmonyUpdateAvailableModal {...args} />,
}

export const Downloading: StoryObj<typeof HarmonyUpdateDownloadingModal> = {
  name: "Update downloading modal",
  args: {
    opened: true,
    progress: 45,
    onCancel: action("onCancel"),
  },
  render: (args) => <HarmonyUpdateDownloadingModal {...args} />,
}

export const Downloaded: StoryObj<typeof HarmonyUpdateDownloadedModal> = {
  name: "Update downloaded modal",
  args: {
    opened: true,
    newVersion: "2.0.0",
    onClose: action("onClose"),
    onUpdate: action("onCancel"),
  },
  render: (args) => <HarmonyUpdateDownloadedModal {...args} />,
}

export const BatteryFlat: StoryObj<typeof HarmonyUpdateBatteryFlatModal> = {
  name: "Update battery flat modal",
  args: {
    opened: true,
    onClose: action("onClose"),
  },
  render: (args) => <HarmonyUpdateBatteryFlatModal {...args} />,
}

export const Installing: StoryObj<typeof HarmonyUpdateInstallingModal> = {
  name: "Update installing modal",
  args: {
    opened: true,
    progress: 75,
    onCancel: action("onCancel"),
  },
  render: (args) => <HarmonyUpdateInstallingModal {...args} />,
}

export const Complete: StoryObj<typeof HarmonyUpdateCompleteModal> = {
  name: "Update complete modal",
  args: {
    opened: true,
    onClose: action("onClose"),
  },
  render: (args) => <HarmonyUpdateCompleteModal {...args} />,
}

export const Failed: StoryObj<typeof HarmonyUpdateFailedModal> = {
  name: "Update failed modal",
  args: {
    opened: true,
    onGoToHelp: action("onGoToHelp"),
    onContactSupport: action("onContactSupport"),
    onClose: action("onClose"),
  },
  render: (args) => <HarmonyUpdateFailedModal {...args} />,
}
