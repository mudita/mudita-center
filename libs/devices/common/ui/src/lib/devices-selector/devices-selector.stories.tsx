/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import { DeviceImageColor, DeviceImageType } from "devices/common/models"
import { DevicesSelector } from "./devices-selector"
import { Default as DevicesDrawerStory } from "../devices-drawer/devices-drawer.stories"
import styled from "styled-components"
import { DevicesSelectorCard } from "./devices-selector-card"

const SingleItemDecorator = styled.div`
  width: 34rem;
  height: 44rem;

  > li {
    width: 100%;
    height: 100%;
  }
`

const meta: Meta<typeof DevicesSelector> = {
  title: "App/Devices/Devices selector",
  component: DevicesSelector,
}

export default meta

type Story = StoryObj<typeof DevicesSelector>

export const Default: Story = {
  name: "Devices selector",
  decorators: [
    (Story) => (
      <div className={"no-padding"}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    devices: DevicesDrawerStory.argTypes?.devices,
    onSelect: DevicesDrawerStory.argTypes?.onSelect,
  },
  args: {
    devices: [
      {
        id: "1",
        device: {
          type: DeviceImageType.Kompakt,
          color: DeviceImageColor.Black,
        },
        name: "Kompakt",
        serialNumber: "0000111122",
      },
      {
        id: "2",
        device: {
          type: DeviceImageType.Harmony1,
          color: DeviceImageColor.White,
        },
        name: "Harmony",
        serialNumber: "1111222233",
      },
      {
        id: "3",
        device: {
          type: DeviceImageType.Harmony2,
          color: DeviceImageColor.Black,
        },
        name: "Harmony",
        serialNumber: "2222333344",
      },
      {
        id: "4",
        device: {
          type: DeviceImageType.HarmonyMsc,
          color: DeviceImageColor.White,
        },
        name: "Harmony",
        recoveryMode: true,
      },
      {
        id: "5",
        device: {
          type: DeviceImageType.Pure,
          color: DeviceImageColor.White,
        },
        name: "Pure",
        serialNumber: "3333444455",
      },
    ],
  },
}

export const DeviceCard: StoryObj<typeof DevicesSelectorCard> = {
  name: "Device card - default",
  argTypes: {
    // @ts-expect-error devices not exist
    devices: storybookHelper.disableControl().apply(),
    activeDeviceSerialNumber: storybookHelper.disableControl().apply(),
    opened: storybookHelper.disableControl().apply(),
    onClose: storybookHelper.disableControl().apply(),
    onSelect: storybookHelper.disableControl().apply(),
  },
  decorators: [
    (Story) => (
      <SingleItemDecorator>
        <Story />
      </SingleItemDecorator>
    ),
  ],
  render: () => (
    <DevicesSelectorCard
      device={{
        type: DeviceImageType.Kompakt,
      }}
      name="Kompakt"
      serialNumber="000011112222"
    />
  ),
}

export const DeviceCardRecoveryMode: StoryObj<typeof DevicesSelectorCard> = {
  name: "Device card - recovery mode",
  argTypes: DeviceCard.argTypes,
  decorators: [
    (Story) => (
      <SingleItemDecorator>
        <Story />
      </SingleItemDecorator>
    ),
  ],
  render: () => (
    <DevicesSelectorCard
      device={{
        type: DeviceImageType.HarmonyMsc,
      }}
      name="Harmony"
      recoveryMode
    />
  ),
}
