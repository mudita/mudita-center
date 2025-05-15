/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { DevicesDrawer } from "./devices-drawer"
import styled from "styled-components"
import { DevicesDrawerCard } from "./devices-drawer-card"
import { devicesDrawerImages } from "./img"
import { storybookHelper } from "app-theme/utils"

const Decorator = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  margin: -1rem;
  overflow: hidden;
`

const SingleItemDecorator = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > li {
    width: 33.3rem;
  }
`

const ImagesDecorator = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  code {
    margin: 0;
  }

  img {
    width: 9.1rem;
    height: auto;
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
      <Decorator>
        <Story />
      </Decorator>
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
          "  image: string\n" +
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
  },
  render: (args) => {
    return (
      <DevicesDrawer
        opened={args.opened}
        onClose={args.onClose}
        onSelect={args.onSelect}
        activeDeviceId={args.activeDeviceId}
        devices={[
          {
            id: "1",
            image: devicesDrawerImages.kompakt.black,
            name: "Kompakt",
            serialNumber: "0000111122",
          },
          {
            id: "2",
            image: devicesDrawerImages.harmony.white,
            name: "Harmony",
            serialNumber: "1111222233",
          },
          {
            id: "3",
            image: devicesDrawerImages.harmony.black,
            name: "Harmony",
            recoveryMode: true,
          },
          {
            id: "4",
            image: devicesDrawerImages.pure.black,
            name: "Pure",
            serialNumber: "3333444455",
          },
        ]}
      />
    )
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
      image={devicesDrawerImages.kompakt.black}
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
      image={devicesDrawerImages.kompakt.black}
      name="Kompakt"
      serialNumber="000011112222"
      active
    />
  ),
}

export const DeviceCardNoSerialNumber: StoryObj<typeof DevicesDrawerCard> = {
  name: "Device card - no serial number",
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
      image={devicesDrawerImages.kompakt.black}
      name="Kompakt"
      serialNumber="0000000000"
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
      image={devicesDrawerImages.harmony.black}
      name="Harmony"
      serialNumber="000011112222"
      recoveryMode
    />
  ),
}

export const DeviceCardRecoveryModeActive: StoryObj<typeof DevicesDrawerCard> =
  {
    name: "Device card - recovery mode + active",
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
        image={devicesDrawerImages.harmony.black}
        name="Harmony"
        serialNumber="000011112222"
        recoveryMode
        active
      />
    ),
  }

export const DevicesImages: StoryObj = {
  name: "Devices - images",
  argTypes: DeviceCard.argTypes,
  decorators: [
    (Story) => (
      <ImagesDecorator>
        <Story />
      </ImagesDecorator>
    ),
  ],
  render: () => (
    <>
      {Object.entries(devicesDrawerImages).map(([deviceName, device]) => {
        return Object.entries(device).map(([color, src]) => {
          return (
            <div key={`${deviceName}-${color}`}>
              <code>
                devicesDrawerImages.{deviceName}.{color}
              </code>
              <img
                key={`${deviceName}-${color}`}
                src={src}
                alt={`${deviceName} ${color}`}
              />
            </div>
          )
        })
      })}
    </>
  ),
}
