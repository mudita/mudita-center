/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { DevicesDrawer } from "./devices-drawer"
import styled from "styled-components"
import { DevicesDrawerCard } from "./devices-drawer-card"
import { storybookHelper } from "app-theme/utils"
import { DeviceImageColor, DeviceImageType } from "devices/common/models"

const SingleItemDecorator = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > li {
    width: 33.3rem;
  }
`

const meta: Meta<typeof DevicesDrawer> = {
  title: "App/Devices/Devices drawer",
  component: DevicesDrawer,
}

export default meta

type Story = StoryObj<typeof DevicesDrawer>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className={"no-padding"}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    opened: storybookHelper
      .addDescription("Defines whether the drawer is visible or not.")
      .apply({
        control: {
          type: "boolean",
        },
      }),
    onClose: storybookHelper
      .addDescription(
        "Defines a function to be called when clicking the close button or backdrop."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
    devices: storybookHelper
      .addDescription("Defines a list of devices to display.")
      .setType(
        "Device[]",
        "{\n" +
          "  id: string\n" +
          "  name: string\n" +
          "  device: {\n" +
          "    type: DeviceImageType\n" +
          "    color?: DeviceImageColor\n" +
          "  }\n" +
          "  serialNumber?: string\n" +
          "  recoveryMode?: boolean\n" +
          "}[]"
      )
      .apply({
        control: {
          disable: true,
        },
      }),
    activeDeviceId: storybookHelper
      .addDescription("Defines the id of the active device.")
      .setType("string")
      .apply(),
    onSelect: storybookHelper
      .addDescription(
        "Defines a function to be called when clicking the device card."
      )
      .apply({
        control: {
          disable: true,
        },
      }),
  },
  args: {
    opened: true,
    activeDeviceId: "1",
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

export const DeviceCard: StoryObj<typeof DevicesDrawerCard> = {
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
    <DevicesDrawerCard
      device={{
        type: DeviceImageType.Kompakt,
      }}
      name="Kompakt"
      serialNumber="000011112222"
    />
  ),
}

export const DeviceCardActive: StoryObj<typeof DevicesDrawerCard> = {
  name: "Device card - active",
  argTypes: DeviceCard.argTypes,
  decorators: [
    (Story) => (
      <SingleItemDecorator>
        <Story />
      </SingleItemDecorator>
    ),
  ],
  render: () => (
    <DevicesDrawerCard
      device={{
        type: DeviceImageType.Kompakt,
      }}
      name="Kompakt"
      serialNumber="000011112222"
      active
    />
  ),
}

export const DeviceCardRecoveryMode: StoryObj<typeof DevicesDrawerCard> = {
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
    <DevicesDrawerCard
      device={{
        type: DeviceImageType.HarmonyMsc,
      }}
      name="Harmony 2"
      serialNumber="000011112222"
      recoveryMode
    />
  ),
}

export const DeviceCardRecoveryModeActive: StoryObj<typeof DevicesDrawerCard> =
  {
    name: "Device card - recovery mode + no serial number + active",
    argTypes: DeviceCard.argTypes,
    decorators: [
      (Story) => (
        <SingleItemDecorator>
          <Story />
        </SingleItemDecorator>
      ),
    ],
    render: () => (
      <DevicesDrawerCard
        device={{
          type: DeviceImageType.HarmonyMsc,
        }}
        name="Harmony 2"
        recoveryMode
        active
      />
    ),
  }
