/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React, { ComponentProps } from "react"
import AboutUI from "./about-ui.component"
import { noop } from "App/renderer/utils/noop"
import { AboutTestIds } from "./about.enum"
import { fireEvent } from "@testing-library/dom"

type Properties = ComponentProps<typeof AboutUI>
const defaultProps = {
  openLicense: noop,
  openTermsOfService: noop,
  openPrivacyPolicy: noop,
  appLatestVersion: "0.20.2",
  appCurrentVersion: "0.19.0",
  appUpdateAvailable: false,
  appUpdateStepModalShow: true,
  click: noop,
  closeUpToDateModal: noop,
}
const renderer = (extraProps?: {}) => {
  const props: Properties = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<>
  <div id="react-modal"></div>
  <AboutUI {...props} /></>)
  return {
    ...outcome,
  }
}

test("renders wrapper properly", () => {
  const { queryByTestId } = renderer()
  expect(queryByTestId(AboutTestIds.Wrapper)).toBeInTheDocument()
})

test("renders at least one table row", () => {
  const { queryAllByTestId } = renderer()
  expect(queryAllByTestId(AboutTestIds.TableRow).length).toBeGreaterThanOrEqual(
    1
  )
})

describe("Opens update modal properly", () => {
  test("when app update is not available", () => {

    const { container } = renderer({
      appLatestVersion: "0.20.2",
      appCurrentVersion: "0.20.2",
      appUpdateStepModalShow: true,
      appUpdateAvailable: false,
    })
    console.log("container", container.innerHTML)
    expect(container).not.toBeInTheDocument()
  })
})

test("Calls AppUpdateAvailableCheck when clicked", () => {
  const click = jest.fn()
  const { queryByTestId } = renderer({click})
  fireEvent.click(
    queryByTestId(AboutTestIds.UpdateButton) as HTMLElement
  )
  expect(click).toHaveBeenCalledTimes(1)
})