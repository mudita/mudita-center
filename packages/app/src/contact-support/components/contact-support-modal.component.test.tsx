/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { waitFor } from "@testing-library/dom"
import { fireEvent } from "@testing-library/react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ContactSupportModal from "App/contact-support/components/contact-support-modal.component"
import { ContactSupportModalTestIds } from "App/contact-support/components/contact-support-modal-test-ids.enum"
import { noop } from "Renderer/utils/noop"
import { FileListTestIds } from "Renderer/components/core/file-list/file-list-test-ids.enum"

type Props = ComponentProps<typeof ContactSupportModal>
const defaultProps: Props = {
  open: true,
  files: [],
}
const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<ContactSupportModal {...props} />)
  return {
    ...outcome,
    emailInput: outcome.getByTestId(ContactSupportModalTestIds.EmailInput),
    descriptionInput: outcome.getByTestId(
      ContactSupportModalTestIds.DescriptionInput
    ),
    fileList: outcome.getByTestId(ContactSupportModalTestIds.FileList),
    submitButton: outcome.getByTestId(ContactSupportModalTestIds.SubmitButton),
  }
}

// This is hack to buggy useForm dependency from react-hook-form
const renderWithWaitFor = async (extraProps?: Partial<Props>) => {
  const outcome = render(extraProps)
  await waitFor(noop)

  return outcome
}

test("form renders properly", async () => {
  const { emailInput, descriptionInput, fileList, queryByTestId } =
    await renderWithWaitFor()

  expect(emailInput).toBeInTheDocument()
  expect(descriptionInput).toBeInTheDocument()
  expect(fileList).toBeInTheDocument()
  expect(queryByTestId(FileListTestIds.File)).not.toBeInTheDocument()
})

test("validation works properly when email field empty", async () => {
  const onSubmit = jest.fn()
  const { submitButton } = await renderWithWaitFor({
    onSubmit,
  })

  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(onSubmit).not.toBeCalled()
  })
})

test("validation works properly when email is wrong", async () => {
  const onSubmit = jest.fn()
  const { emailInput, submitButton } = await renderWithWaitFor({
    onSubmit,
  })

  fireEvent.change(emailInput, {
    target: { value: "wrongEmail" },
  })
  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(onSubmit).not.toBeCalled()
  })
})

test("form trigger onSubmit when form is valid", async () => {
  const onSubmit = jest.fn()
  const { emailInput, submitButton } = await renderWithWaitFor({
    onSubmit,
  })

  fireEvent.change(emailInput, {
    target: { value: "mudita@center.com" },
  })
  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(onSubmit).toBeCalledWith({
      email: "mudita@center.com",
      description: "",
    })
  })
})
