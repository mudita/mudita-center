/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { render } from "@testing-library/react"
import App from "./app"

jest.mock("app-serialport/renderer", () => {
  class AppSerialPort {
    static onDevicesChanged = jest.fn()
    static request = jest.fn()
    static isCompatible = jest.fn().mockResolvedValue(true)
  }
  return {
    AppSerialPort,
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
