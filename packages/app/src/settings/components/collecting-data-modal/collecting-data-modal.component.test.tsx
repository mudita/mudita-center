/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { CollectingDataModal } from "App/settings/components/collecting-data-modal/collecting-data-modal.component"
import { CollectingDataModalTestIds } from "App/settings/components/collecting-data-modal/collecting-data-modal-test-ids.enum"
import { noop } from "App/__deprecated__/renderer/utils/noop"

type Props = ComponentProps<typeof CollectingDataModal>

const defaultProps: Props = {
  open: false,
  toggleCollectionData: noop,
  closeModal: noop,
}
const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<CollectingDataModal {...props} />)
}

describe("`CollectingDataModal` component", () => {
  describe("when component is render with default props", () => {
    test("`CollectingDataModal` isn't visible", () => {
      const { queryByTestId } = render()
      expect(
        queryByTestId(CollectingDataModalTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })

  describe("when component`open` is set to `true`", () => {
    test("`CollectingDataModal` is visible", () => {
      const { queryByTestId } = render({ open: true })
      expect(
        queryByTestId(CollectingDataModalTestIds.Container)
      ).toBeInTheDocument()
    })
  })
})
