/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DeviceNProductID,
  KompaktProductID,
  KompaktVendorID,
  SerialPortDeviceSubtype,
} from "app-serialport/models"
import {
  deviceNProductIds,
  kompaktProductIds,
  SerialPortApiDevice,
} from "./serial-port-api-device"

describe("SerialPortApiDevice", () => {
  const originalPrototypeFlag = process.env.MC_DEVICE_N_PROTOTYPE

  afterEach(() => {
    if (originalPrototypeFlag === undefined) {
      delete process.env.MC_DEVICE_N_PROTOTYPE
    } else {
      process.env.MC_DEVICE_N_PROTOTYPE = originalPrototypeFlag
    }
  })

  describe("getSubtype", () => {
    beforeEach(() => {
      delete process.env.MC_DEVICE_N_PROTOTYPE
    })

    it.each(kompaktProductIds)(
      "returns Kompakt for Kompakt product ID %s",
      (productId) => {
        expect(
          SerialPortApiDevice.getSubtype(KompaktVendorID.Hex, productId)
        ).toBe(SerialPortDeviceSubtype.Kompakt)
      }
    )

    it.each(deviceNProductIds)(
      "returns DeviceN for Device N product ID %s",
      (productId) => {
        expect(
          SerialPortApiDevice.getSubtype(KompaktVendorID.Hex, productId)
        ).toBe(SerialPortDeviceSubtype.DeviceN)
      }
    )

    it("returns DeviceN for decimal vendor ID", () => {
      expect(
        SerialPortApiDevice.getSubtype(
          KompaktVendorID.Dec,
          DeviceNProductID.Dec
        )
      ).toBe(SerialPortDeviceSubtype.DeviceN)
    })

    it("returns undefined for unknown IDs", () => {
      expect(SerialPortApiDevice.getSubtype("1234", "5678")).toBeUndefined()
      expect(
        SerialPortApiDevice.getSubtype(KompaktVendorID.Hex, "ffff")
      ).toBeUndefined()
    })

    it("returns undefined when IDs are missing", () => {
      expect(SerialPortApiDevice.getSubtype()).toBeUndefined()
      expect(
        SerialPortApiDevice.getSubtype(KompaktVendorID.Hex)
      ).toBeUndefined()
    })

    describe("Device N prototype mode (temporary)", () => {
      it.each([KompaktProductID.NoDebugHex, KompaktProductID.NoDebugDec])(
        "returns Kompakt for %s when the flag is not set",
        (productId) => {
          expect(
            SerialPortApiDevice.getSubtype(KompaktVendorID.Hex, productId)
          ).toBe(SerialPortDeviceSubtype.Kompakt)
        }
      )

      it.each([KompaktProductID.NoDebugHex, KompaktProductID.NoDebugDec])(
        "returns DeviceN for %s when MC_DEVICE_N_PROTOTYPE=1",
        (productId) => {
          process.env.MC_DEVICE_N_PROTOTYPE = "1"
          expect(
            SerialPortApiDevice.getSubtype(KompaktVendorID.Hex, productId)
          ).toBe(SerialPortDeviceSubtype.DeviceN)
        }
      )

      it("keeps other Kompakt product IDs as Kompakt when MC_DEVICE_N_PROTOTYPE=1", () => {
        process.env.MC_DEVICE_N_PROTOTYPE = "1"
        expect(
          SerialPortApiDevice.getSubtype(
            KompaktVendorID.Hex,
            KompaktProductID.TransferHex
          )
        ).toBe(SerialPortDeviceSubtype.Kompakt)
        expect(
          SerialPortApiDevice.getSubtype(
            KompaktVendorID.Hex,
            KompaktProductID.ChargeHex
          )
        ).toBe(SerialPortDeviceSubtype.Kompakt)
      })
    })
  })

  describe("matchingProductIds", () => {
    it("matches both Kompakt and Device N product IDs", () => {
      expect(SerialPortApiDevice.matchingProductIds).toEqual(
        expect.arrayContaining([...kompaktProductIds, ...deviceNProductIds])
      )
    })
  })

  describe("getProductsGroups", () => {
    it("returns separate, non-overlapping groups for Kompakt and Device N", () => {
      const [kompaktGroup, deviceNGroup] =
        SerialPortApiDevice.getProductsGroups()

      expect(kompaktGroup.productIds).toEqual(kompaktProductIds)
      expect(deviceNGroup.productIds).toEqual(deviceNProductIds)
      expect(
        kompaktGroup.productIds.filter((id) =>
          deviceNGroup.productIds.includes(id)
        )
      ).toEqual([])
    })
  })
})
