/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDeviceSubtype,
  SerialPortDeviceType,
} from "app-serialport/models"
import {
  Device,
  DeviceImageColor,
  DeviceImageType,
} from "devices/common/models"
import { useDeviceMetadataQuery } from "./use-device-metadata.query"

jest.mock("./use-device-config.query", () => ({
  useDeviceConfigQuery: jest.fn(),
}))

jest.mock("app-localize/utils", () => ({
  defineMessages: <T>(messages: T) => messages,
  formatMessage: ({ id }: { id: string }) => id,
}))

type Config = Parameters<typeof useDeviceMetadataQuery.queryFn>[1]

const createApiDevice = (deviceSubtype?: SerialPortDeviceSubtype) =>
  ({
    id: "device-id",
    path: "/dev/test",
    deviceType: SerialPortDeviceType.ApiDevice,
    deviceSubtype,
    serialNumber: "usb-serial",
    vendorId: "3310",
    productId: "2012",
  }) as Device

const createConfig = (variant?: string) =>
  ({
    apiVersion: "1.0.0",
    osVersion: "1.0.0",
    productId: "0x2012",
    vendorId: "0x3310",
    features: ["mc-overview"],
    serialNumber: "0043A1F21C",
    variant,
  }) as unknown as Config

describe("useDeviceMetadataQuery", () => {
  describe("queryFn", () => {
    it("returns Device N metadata for DeviceN subtype", () => {
      const result = useDeviceMetadataQuery.queryFn(
        createApiDevice(SerialPortDeviceSubtype.DeviceN),
        createConfig("black")
      )

      expect(result).toEqual({
        id: "device-id",
        name: "general.devices.deviceN.name",
        image: {
          type: DeviceImageType.DeviceN,
          color: DeviceImageColor.Black,
        },
        serialNumber: "0043A1F21C",
      })
    })

    it("returns Kompakt metadata for Kompakt subtype", () => {
      const result = useDeviceMetadataQuery.queryFn(
        createApiDevice(SerialPortDeviceSubtype.Kompakt),
        createConfig("black")
      )

      expect(result).toEqual({
        id: "device-id",
        name: "general.devices.kompakt.name",
        image: {
          type: DeviceImageType.Kompakt,
          color: DeviceImageColor.Black,
        },
        serialNumber: "0043A1F21C",
      })
    })

    it.each([
      ["black", DeviceImageColor.Black],
      ["white", DeviceImageColor.White],
      ["gray", DeviceImageColor.Gray],
      ["unknown", DeviceImageColor.Black],
      [undefined, DeviceImageColor.Black],
    ])("maps variant %s to image color %s", (variant, color) => {
      const result = useDeviceMetadataQuery.queryFn(
        createApiDevice(SerialPortDeviceSubtype.DeviceN),
        createConfig(variant)
      )

      expect(result?.image.color).toBe(color)
    })

    it("returns null for API device without a known subtype", () => {
      expect(
        useDeviceMetadataQuery.queryFn(createApiDevice(), createConfig())
      ).toBeNull()
    })

    it("returns null when config is missing", () => {
      expect(
        useDeviceMetadataQuery.queryFn(
          createApiDevice(SerialPortDeviceSubtype.DeviceN),
          undefined
        )
      ).toBeNull()
    })
  })

  describe("placeholderData", () => {
    it("returns Device N placeholder for DeviceN subtype", () => {
      expect(
        useDeviceMetadataQuery.placeholderData(
          createApiDevice(SerialPortDeviceSubtype.DeviceN)
        )
      ).toEqual({
        id: "device-id",
        name: "general.devices.deviceN.name",
        image: {
          type: DeviceImageType.DeviceN,
        },
        serialNumber: "usb-serial",
      })
    })

    it("returns Kompakt placeholder for Kompakt subtype", () => {
      expect(
        useDeviceMetadataQuery.placeholderData(
          createApiDevice(SerialPortDeviceSubtype.Kompakt)
        )
      ).toMatchObject({
        name: "general.devices.kompakt.name",
        image: { type: DeviceImageType.Kompakt },
      })
    })
  })
})
