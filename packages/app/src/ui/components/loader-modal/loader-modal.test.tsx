/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import LoaderModal from "App/ui/components/loader-modal/loader-modal.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { LoaderModalTestIds } from "App/ui/components/loader-modal/loader-modal-test-ids.enum"

type Props = ComponentProps<typeof LoaderModal>

const renderModal = (extraProps?: Partial<Props>) => {
  const props = {
    title: "Title",
    open: true,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<LoaderModal {...props} />)
}

describe("LoaderModal Modal", () => {
  test("should render loader properly", () => {
    const { getByTestId } = renderModal()
    expect(getByTestId(LoaderModalTestIds.Loader)).toBeInTheDocument()
  })

  test("subtitle is passed to modal properly", () => {
    const { getByText } = renderModal({ subtitle: "Subtitle" })
    expect(getByText("Subtitle")).toBeInTheDocument()
  })

  test("Title is passed to modal properly", () => {
    const { getByText } = renderModal()
    expect(getByText("Title")).toBeInTheDocument()
  })
  test("Body is passed to modal properly", () => {
    const { getByText } = renderModal({ body: "Body" })
    expect(getByText("Body")).toBeInTheDocument()
  })
})
