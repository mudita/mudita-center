/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * @jest-environment jsdom
 */

import { type PropsWithChildren } from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { McOverviewUpdate } from "./mc-overview-update"

jest.mock("app-localize/utils", () => ({
  defineMessages: (messages: object) => messages,
  formatMessage: ({ id }: { id: string }) => id,
}))

jest.mock("app-theme/ui", () => {
  const React = require("react")
  const Text = ({ children }: PropsWithChildren) =>
    React.createElement("span", null, children)

  return {
    Button: ({
      children,
      onClick,
    }: PropsWithChildren<{ onClick: VoidFunction }>) =>
      React.createElement("button", { onClick }, children),
    Icon: () => null,
    Typography: { P1: Text, P3: Text },
  }
})

const version = { label: "Current version:", value: "1.0.0" }
const helpButtonLabel = "apiDevice.overview.updateSection.howToUpdateButton"

describe("McOverviewUpdate", () => {
  it("renders the version label and value", () => {
    render(<McOverviewUpdate version={version} />)

    expect(screen.getByText("Current version:")).toBeTruthy()
    expect(screen.getByText("1.0.0")).toBeTruthy()
  })

  it("renders the help button when a click handler is provided", () => {
    const onHelpButtonClick = jest.fn()
    render(
      <McOverviewUpdate
        version={version}
        onHelpButtonClick={onHelpButtonClick}
      />
    )

    fireEvent.click(screen.getByText(helpButtonLabel))

    expect(onHelpButtonClick).toHaveBeenCalledTimes(1)
  })

  it("does not render the help button without a click handler", () => {
    render(<McOverviewUpdate version={version} />)

    expect(screen.queryByText(helpButtonLabel)).toBeNull()
  })
})
