/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { render } from "@testing-library/react"

import App from "./app"

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
