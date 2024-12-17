/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "@serialport/bindings-interface"
import { render } from "@testing-library/react"
import App from "./app"

jest.mock("app-serialport/renderer", () => {
  return {
    AppSerialPort: {
      list: jest.fn().mockResolvedValue([
        {
          vendorId: "0e8d",
          productId: "2006",
          path: "/dev/ttyUSB0.KOM123456789",
        },
      ] as PortInfo[]),
      write: jest.fn(),
    },
  }
})

describe("App", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<App />)
    expect(baseElement).toBeTruthy()
  })

  it("should have a greeting as the title", () => {
    const { getByText } = render(<App />)
    expect(getByText(/Welcome frontend-app/i)).toBeTruthy()
  })
})
