/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import {
  renderWithThemeAndIntl,
  constructWrapper,
} from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { AgreementModal } from "App/eula-agreement/components/agreement-modal/agreement-modal.component"
import { AgreementModalProps } from "App/eula-agreement/components/agreement-modal/agreement-modal.interface"
import { AgreementModalIds } from "App/eula-agreement/components/agreement-modal/agreement-modal-test-ids.enum"

const defaultProps: AgreementModalProps = {
  open: false,
}

const render = (extraProps?: Partial<AgreementModalProps>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(<AgreementModal {...props} />)

  return {
    ...outcome,

    rerender: (newExtraProps: Partial<AgreementModalProps>) => {
      const newProps = {
        ...defaultProps,
        ...newExtraProps,
      }
      outcome.rerender(constructWrapper(<AgreementModal {...newProps} />))
    },
  }
}

beforeEach(() => {
  jest.clearAllMocks()
})

test("Modal isn't visible on page if `open` flag equal to `false`", () => {
  const { queryByTestId } = render({
    open: false,
  })

  expect(queryByTestId(AgreementModalIds.Modal)).not.toBeInTheDocument()
})

test("Modal become visible is `open` flag changed state to `true`", () => {
  const { queryByTestId, rerender } = render({
    open: false,
  })

  expect(queryByTestId(AgreementModalIds.Modal)).not.toBeInTheDocument()

  rerender({
    open: true,
  })

  expect(queryByTestId(AgreementModalIds.Modal)).toBeInTheDocument()
})
