/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { Meta, StoryObj } from "@storybook/react-vite"
import styled from "styled-components"
import { DeviceImage } from "./device-image"
import { storybookHelper } from "app-theme/utils"
import {
  DeviceImageColor,
  DeviceImageSize,
  DeviceImageType,
} from "devices/common/models"
import { devicesImages } from "./img"

const Decorator = styled.div`
  width: 50rem;
  height: 50rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const AllDevicesDecorator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
`

const meta: Meta<typeof DeviceImage> = {
  title: "App/Devices/Device image",
  component: DeviceImage,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DeviceImage>

export const Default: Story = {
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
  argTypes: {
    type: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the type of device:\n" +
          "- `Kompakt`\n" +
          "- `Harmony1`\n" +
          "- `Harmony2`\n" +
          "- `Pure`\n"
      )
      .generateEnumSelector(DeviceImageType, "DeviceImageType")
      .apply(),
    size: storybookHelper
      .assignCategory("Functional")
      .addDescription(
        "Defines the size of an image:\n" +
          "- `DeviceImageSize.Small` - 91x96px, standardized aspect ratio across all devices\n" +
          "- `DeviceImageSize.Big` - 100% of available space, custom aspect ratio for each device"
      )
      .generateEnumSelector(DeviceImageSize, "DeviceImageSize")
      .apply(),
    color: storybookHelper
      .assignCategory("Styles")
      .addDescription(
        "Defines the color of an image:\n" +
          "- `DeviceImageColor.Black`\n" +
          "- `DeviceImageColor.White`\n" +
          "If not provided or not supported, the default color will be used.\n"
      )
      .generateEnumSelector(DeviceImageColor, "DeviceImageColor")
      .apply(),
  },
  args: {
    type: DeviceImageType.Kompakt,
    size: DeviceImageSize.Big,
    color: DeviceImageColor.Black,
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `DeviceImage` component is used to display images of devices. It supports different device types, sizes, and colors.",
      },
      source: {
        code:
          'import { DeviceImage } from "devices/common/ui"\n\n' +
          "<DeviceImage device={DeviceImageType.Kompakt} size={DeviceImageSize.Big} color={DeviceImageColor.Black} />",
      },
    },
  },
}

export const AllDevices: Story = {
  name: "All devices",
  decorators: [
    (Story) => (
      <AllDevicesDecorator>
        <Story />
      </AllDevicesDecorator>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: Object.entries(devicesImages).reduce((acc, [name, device]) => {
          const enumName = Object.entries(DeviceImageType).find(
            ([_, value]) => value === name
          )?.[0]
          return (
            acc +
            Object.entries(device).reduce((acc, [color, size]) => {
              const enumColor = Object.entries(DeviceImageColor).find(
                ([_, value]) => value === color
              )?.[0]
              return (
                acc +
                Object.entries(size).reduce((acc, [sizeName]) => {
                  const enumSize = Object.entries(DeviceImageSize).find(
                    ([_, value]) => value === sizeName
                  )?.[0]
                  return (
                    acc +
                    `<DeviceImage device={DeviceImageType.${enumName}} size={DeviceImageSize.${enumSize}} color={DeviceImageColor.${enumColor}} />\n`
                  )
                }, "")
              )
            }, "")
          )
        }, ""),
      },
    },
  },
  render: () => (
    <>
      {Object.entries(devicesImages).map(([deviceName, device]) => {
        return (
          <DeviceGroup key={deviceName}>
            {Object.entries(device).map(([color, size]) => {
              return (
                <DeviceColor key={color}>
                  {Object.entries(size).map(([sizeName]) => {
                    return (
                      <Device key={sizeName}>
                        <DeviceImage
                          type={deviceName as DeviceImageType}
                          color={color as DeviceImageColor}
                          size={sizeName as DeviceImageSize}
                        />
                      </Device>
                    )
                  })}
                </DeviceColor>
              )
            })}
          </DeviceGroup>
        )
      })}
    </>
  ),
}

const DeviceGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`

const DeviceColor = styled.div`
  display: grid;
  grid-auto-columns: 20rem;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
`

const Device = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`
