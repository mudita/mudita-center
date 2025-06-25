/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook, waitFor } from "@testing-library/react"
import { useDevices } from "./use-devices"
import { AppSerialPort } from "app-serialport/renderer"
import { FunctionComponent, PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SerialPortDeviceType } from "app-serialport/models"

const HookWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

jest.mock("app-serialport/renderer", () => ({
  AppSerialPort: {
    getCurrentDevices: jest.fn(),
  },
}))

describe("useDevices", () => {
  it("should return list of devices in correct order", async () => {
    ;(AppSerialPort.getCurrentDevices as jest.Mock).mockResolvedValue([
      // first connected device
      {
        path: "/device1",
        deviceType: SerialPortDeviceType.Harmony,
        serialNumber: "654321",
        productId: "product1",
      },
      // second connected device
      {
        path: "/device2",
        deviceType: SerialPortDeviceType.ApiDevice,
        serialNumber: "123456",
        productId: "product2",
        deviceSubtype: "subtype2",
      },
      // third connected device
      {
        path: "/device3",
        deviceType: SerialPortDeviceType.Pure,
        serialNumber: "789012",
        productId: "product3",
      },
    ])

    const { result } = renderHook(() => useDevices(), { wrapper: HookWrapper })

    await waitFor(() =>
      expect(result.current.data).toStrictEqual([
        {
          deviceSubtype: "subtype2",
          deviceType: "ApiDevice",
          path: "/device2",
          productId: "product2",
          serialNumber: "123456",
        },
        {
          deviceType: "MuditaPure",
          path: "/device3",
          productId: "product3",
          serialNumber: "789012",
          deviceSubtype: undefined,
        },
        {
          deviceType: "MuditaHarmony",
          path: "/device1",
          productId: "product1",
          serialNumber: "654321",
          deviceSubtype: undefined,
        },
      ])
    )
  })

  it("should filter out duplicates", async () => {
    ;(AppSerialPort.getCurrentDevices as jest.Mock).mockResolvedValue([
      {
        path: "/device1",
        deviceType: SerialPortDeviceType.Harmony,
        serialNumber: "654321",
        productId: "product1",
      },
      {
        path: "/device1",
        deviceType: SerialPortDeviceType.Pure,
        serialNumber: "123456",
        productId: "product2",
      },
    ])

    const { result } = renderHook(() => useDevices(), { wrapper: HookWrapper })

    await waitFor(() =>
      expect(result.current.data).toStrictEqual([
        {
          path: "/device1",
          deviceType: SerialPortDeviceType.Harmony,
          serialNumber: "654321",
          productId: "product1",
          deviceSubtype: undefined,
        },
      ])
    )
  })

  it("should return empty list when no devices are found", async () => {
    ;(AppSerialPort.getCurrentDevices as jest.Mock).mockResolvedValue([])

    const { result } = renderHook(() => useDevices(), { wrapper: HookWrapper })

    await waitFor(() => expect(result.current.data).toStrictEqual([]))
  })
})
