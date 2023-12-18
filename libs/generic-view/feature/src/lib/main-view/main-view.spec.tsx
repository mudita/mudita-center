/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { render } from "@testing-library/react"

import MainView from "./main-view"

describe("MainView", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MainView />)
    expect(baseElement).toBeTruthy()
  })
})
