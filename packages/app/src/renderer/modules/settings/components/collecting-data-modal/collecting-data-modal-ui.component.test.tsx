/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import CollectingDataModalUi from "Renderer/modules/settings/components/collecting-data-modal/collecting-data-modal-ui.component"
import { CollectingDataModalTestIds } from "Renderer/modules/settings/components/collecting-data-modal/collecting-data-modal-test-ids.enum"
import { noop } from "Renderer/utils/noop"

type Props = ComponentProps<typeof CollectingDataModalUi>

const defaultProps: Props = {
  open: false,
  onActionButtonClick: noop,
  closeModal: noop,
  onFullAgreementButtonClick: noop,
}
const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<CollectingDataModalUi {...props} />)
}

describe("`CollectingDataModalUi` component", () => {
  describe("when component is render with default props", () => {
    test("`CollectingDataModalUi` isn't visible", () => {
      const { queryByTestId } = render()
      expect(
        queryByTestId(CollectingDataModalTestIds.Container)
      ).not.toBeInTheDocument()
    })
  })

  describe("when component`open` is set to `true`", () => {
    test("`CollectingDataModalUi` is visible", () => {
      const { queryByTestId } = render({ open: true })
      expect(
        queryByTestId(CollectingDataModalTestIds.Container)
      ).toBeInTheDocument()
    })
  })
})
