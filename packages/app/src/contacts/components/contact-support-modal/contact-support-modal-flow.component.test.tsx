/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import ContactSupportModalFlow, {
  ContactSupportModalFlowState,
} from "App/contacts/components/contact-support-modal/contact-support-modal-flow.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { ContactSupportModalFlowTestIds } from "App/contacts/components/contact-support-modal/contact-support-modal-flow-test-ids.component"
import { waitFor } from "@testing-library/dom"
import { noop } from "Renderer/utils/noop"

type Props = ComponentProps<typeof ContactSupportModalFlow>

const defaultProps: Props = {
  files: [],
}
const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<ContactSupportModalFlow {...props} />)
  return {
    ...outcome,
  }
}

test("form renders properly", async () => {
  const { getByTestId, queryByTestId } = render()
  await waitFor(noop)

  expect(
    getByTestId(ContactSupportModalFlowTestIds.ContactSupportModal)
  ).toBeInTheDocument()
  expect(
    queryByTestId(ContactSupportModalFlowTestIds.ContactSupportModalSuccess)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(ContactSupportModalFlowTestIds.ContactSupportModalFail)
  ).not.toBeInTheDocument()
})

test("ContactSupportModalSuccess renders properly", async () => {
  const { getByTestId, queryByTestId } = render({
    openState: ContactSupportModalFlowState.Success,
  })
  await waitFor(noop)

  expect(
    getByTestId(ContactSupportModalFlowTestIds.ContactSupportModalSuccess)
  ).toBeInTheDocument()
  expect(
    queryByTestId(ContactSupportModalFlowTestIds.ContactSupportModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(ContactSupportModalFlowTestIds.ContactSupportModalFail)
  ).not.toBeInTheDocument()
})

test("ContactSupportModalFail renders properly", async () => {
  const { getByTestId, queryByTestId } = render({
    openState: ContactSupportModalFlowState.Fail,
  })
  await waitFor(noop)

  expect(
    getByTestId(ContactSupportModalFlowTestIds.ContactSupportModalFail)
  ).toBeInTheDocument()
  expect(
    queryByTestId(ContactSupportModalFlowTestIds.ContactSupportModal)
  ).not.toBeInTheDocument()
  expect(
    queryByTestId(ContactSupportModalFlowTestIds.ContactSupportModalSuccess)
  ).not.toBeInTheDocument()
})
