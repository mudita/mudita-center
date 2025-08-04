/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react"
import { storybookHelper } from "app-theme/utils"
import {
  DeviceImageColor,
  DeviceImageType,
  DeviceStatus,
} from "devices/common/models"
import { DevicesSelector } from "./devices-selector"
import styled from "styled-components"
import { DevicesSelectorCard } from "./devices-selector-card"

const Decorator = styled.div`
  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
`

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
      <Decorator className={"no-padding"}>
        <Story />
      </Decorator>
    ),
  ],
  render: (args) => {
    return (
      <DevicesSelector {...args}>
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
          {
            id: "6",
            image: {
              type: DeviceImageType.Kompakt,
              color: DeviceImageColor.Black,
            },
            name: "Kompakt",
            serialNumber: "0000111166",
            status: DeviceStatus.Initializing,
          },
          {
            id: "7",
            image: {
              type: DeviceImageType.Harmony1,
              color: DeviceImageColor.White,
            },
            name: "Harmony",
            serialNumber: "1111222277",
            status: DeviceStatus.Initializing,
          },
        ].map((device) => {
          return <DevicesSelectorCard {...device} />
        })}
      </DevicesSelector>
    )
  },
}

export const DeviceCard: StoryObj<typeof DevicesSelectorCard> = {
  name: "Device card - default",
  decorators: [
    (Story) => (
      <SingleItemDecorator>
        <Story />
      </SingleItemDecorator>
    ),
  ],
  argTypes: {
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
  render: (args) => (
    <DevicesSelectorCard
      {...args}
      image={{
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
  args: {
    status: DeviceStatus.Initialized,
  },
  render: (args) => (
    <DevicesSelectorCard
      {...args}
      image={{
        type: DeviceImageType.HarmonyMsc,
      }}
      name="Harmony"
      recoveryMode
    />
  ),
}
