/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import FilesManagerSearchInput from "App/files-manager/components/files-manager-search-input/files-manager-search-input"
import { fireEvent } from "@testing-library/dom"

type Props = ComponentProps<typeof FilesManagerSearchInput>

const defaultProps: Props = {
  onSearchValueChange: jest.fn(),
  searchValue: "",
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<FilesManagerSearchInput {...props} />)
  return {
    ...outcome,
    input: () => outcome.container.querySelector("input"),
    label: () => outcome.container.querySelector("label"),
  }
}

afterEach(() => {
  jest.clearAllMocks()
})

describe("`FilesManagerSearchInput` component", () => {
  test("passed `searchValue` to component set properly initial state", () => {
    const { input } = render({ searchValue: "example initial" })
    expect(input()).toHaveValue("example initial")
  })

  test("`onSearchValueChange` is triggered properly", () => {
    const { input } = render()
    fireEvent.change(input() as HTMLInputElement, { target: { value: "test" } })
    expect(defaultProps.onSearchValueChange).toBeCalledWith("test")
  })
})
