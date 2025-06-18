/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { DevicesDrawer } from "./devices-drawer"
import styled from "styled-components"
import { DevicesDrawerCard } from "./devices-drawer-card"
import { storybookHelper } from "app-theme/utils"
import {
  DeviceImageColor,
  DeviceImageType,
  DeviceStatus,
} from "devices/common/models"

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
  },
  args: {
    opened: true,
  },
  render: (args) => {
    return (
      <DevicesDrawer {...args}>
        {[
          {
            id: "1",
            image: {
              type: DeviceImageType.Kompakt,
              color: DeviceImageColor.Black,
            },
            name: "Kompakt",
            serialNumber: "0000111122",
            status: DeviceStatus.Locked,
            active: true,
          },
          {
            id: "2",
            image: {
              type: DeviceImageType.Harmony1,
              color: DeviceImageColor.White,
            },
            name: "Harmony",
            serialNumber: "1111222233",
            status: DeviceStatus.Initialized,
          },
          {
            id: "3",
            image: {
              type: DeviceImageType.Harmony2,
              color: DeviceImageColor.Black,
            },
            name: "Harmony",
            serialNumber: "2222333344",
            status: DeviceStatus.CriticalError,
          },
          {
            id: "4",
            image: {
              type: DeviceImageType.HarmonyMsc,
              color: DeviceImageColor.White,
            },
            name: "Harmony",
            recoveryMode: true,
            status: DeviceStatus.Initialized,
          },
          {
            id: "5",
            image: {
              type: DeviceImageType.Pure,
              color: DeviceImageColor.White,
            },
            name: "Pure",
            serialNumber: "3333444455",
            status: DeviceStatus.Initialized,
          },
        ].map((device) => (
          <DevicesDrawerCard {...device} key={device.id} />
        ))}
      </DevicesDrawer>
    )
  },
}

export const DeviceCard: StoryObj<typeof DevicesDrawerCard> = {
  name: "Device card - default",
  argTypes: {
    // @ts-expect-error non-existing property
    opened: storybookHelper.disableControl().apply(),
    onClose: storybookHelper.disableControl().apply(),
    name: storybookHelper
      .assignCategory("Styles")
      .addDescription("Defines the name of the device.")
      .setType("string")
      .apply(),
    serialNumber: storybookHelper
      .assignCategory("Styles")
      .addDescription(
        "Defines the serial number of the device. If not provided, it will not be displayed."
      )
      .setType("string")
      .apply(),
    recoveryMode: storybookHelper
      .assignCategory("Styles")
      .addDescription(
        "Defines whether the device is in recovery mode or not. If true, a label will be displayed."
      )
      .setType("boolean")
      .apply(),
    image: storybookHelper
      .assignCategory("Styles")
      .addDescription(
        "Defines the image of the device. It should contain the type and optionally the color."
      )
      .setType("{ type: DeviceImageType; color?: DeviceImageColor }")
      .apply(),
    active: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines whether the device is active or not. If true, an active label will be displayed."
      )
      .setType("boolean")
      .apply(),
    status: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the status of the device. If not provided, loading state will be displayed."
      )
      .generateEnumSelector(DeviceStatus, "DeviceStatus")
      .apply(),
    onClick: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines a function to be called when clicking the device card.\n\n" +
          "Not available when the device is active."
      )
      .setType("VoidFunction")
      .apply(),
  },
  args: {
    status: DeviceStatus.Initialized,
  },
  decorators: [
    (Story) => (
      <SingleItemDecorator>
        <Story />
      </SingleItemDecorator>
    ),
  ],
  render: (args) => (
    <DevicesDrawerCard
      {...args}
      image={{
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
  args: {
    status: DeviceStatus.Initialized,
  },
  decorators: [
    (Story) => (
      <SingleItemDecorator>
        <Story />
      </SingleItemDecorator>
    ),
  ],
  render: (args) => (
    <DevicesDrawerCard
      {...args}
      image={{
        type: DeviceImageType.Kompakt,
      }}
      name="Kompakt"
      serialNumber="000011112222"
      active
    />
  ),
}

export const DeviceCardLocked: StoryObj<typeof DevicesDrawerCard> = {
  name: "Device card - locked",
  argTypes: DeviceCard.argTypes,
  args: {
    status: DeviceStatus.Locked,
  },
  decorators: [
    (Story) => (
      <SingleItemDecorator>
        <Story />
      </SingleItemDecorator>
    ),
  ],
  render: (args) => (
    <DevicesDrawerCard
      {...args}
      image={{
        type: DeviceImageType.Kompakt,
      }}
      name="Kompakt"
      serialNumber="000011112222"
    />
  ),
}

export const DeviceCardRecoveryMode: StoryObj<typeof DevicesDrawerCard> = {
  name: "Device card - recovery mode",
  argTypes: DeviceCard.argTypes,
  args: {
    status: DeviceStatus.Initialized,
  },
  decorators: [
    (Story) => (
      <SingleItemDecorator>
        <Story />
      </SingleItemDecorator>
    ),
  ],
  render: (args) => (
    <DevicesDrawerCard
      {...args}
      image={{
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
    args: {
      status: DeviceStatus.Initialized,
    },
    decorators: [
      (Story) => (
        <SingleItemDecorator>
          <Story />
        </SingleItemDecorator>
      ),
    ],
    render: (args) => (
      <DevicesDrawerCard
        {...args}
        image={{
          type: DeviceImageType.HarmonyMsc,
        }}
        name="Harmony 2"
        recoveryMode
        active
      />
    ),
  }

export const DeviceCardError: StoryObj<typeof DevicesDrawerCard> = {
  name: "Device card - error",
  argTypes: DeviceCard.argTypes,
  args: {
    status: DeviceStatus.CriticalError,
  },
  decorators: [
    (Story) => (
      <SingleItemDecorator>
        <Story />
      </SingleItemDecorator>
    ),
  ],
  render: (args) => (
    <DevicesDrawerCard
      {...args}
      image={{
        type: DeviceImageType.Harmony2,
      }}
      name="Harmony 2"
      serialNumber="000011112222"
    />
  )
}
