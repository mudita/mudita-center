/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SystemUpdateText } from "App/overview/components/system-update-text/system-update-text.component"
import { SystemUpdateTextProps } from "App/overview/components/system-update-text/system-update-text.interface"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import { Provider } from "react-redux"
import store, { ReduxRootState } from "App/__deprecated__/renderer/store"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { initialState as update } from "App/update/reducers"
import { OsRelease } from "App/update/dto"
import { OsReleaseType, Product } from "App/update/constants"

const defaultProps: SystemUpdateTextProps = {
  checkForUpdateFailed: false,
  checkForUpdateInProgress: false,
  checkForUpdatePerformed: false,
}

const mockedRelease: OsRelease = {
  date: "2021-02-02",
  file: {
    name: "test file",
    size: 123,
    url: "some-url",
  },
  product: Product.PurePhone,
  type: OsReleaseType.Daily,
  version: "1.1.0",
  mandatoryVersions: [],
}

const render = (
  extraProps?: Partial<SystemUpdateTextProps>,
  state?: Partial<ReduxRootState>
) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(
    <Provider store={state ? createMockStore([thunk])(state) : store}>
      <SystemUpdateText {...props} />
    </Provider>
  )
}

test("renders nothing for update in progress state", () => {
  const { container } = render({
    checkForUpdateInProgress: true,
  })

  expect(container).toBeEmptyDOMElement()
})

test("renders update check failed", () => {
  const { queryByText } = render({
    checkForUpdateFailed: true,
  })

  expect(
    queryByText("[value] module.overview.systemUpdateCheckFailed")
  ).toBeInTheDocument()
})

test("renders update available info", () => {
  const { queryByText } = render(
    {
      checkForUpdatePerformed: true,
    },
    {
      update: {
        ...update,
        data: {
          ...update.data,
          availableReleasesForUpdate: [mockedRelease],
        },
      },
    }
  )

  expect(
    queryByText("[value] module.overview.systemUpdateAvailable")
  ).toBeInTheDocument()
})

test("renders system up to date info", () => {
  const { queryByText } = render({
    checkForUpdatePerformed: true,
    checkForUpdateFailed: false,
    checkForUpdateInProgress: false,
  })

  expect(
    queryByText("[value] module.overview.systemUpdateUpToDate")
  ).toBeInTheDocument()
})
