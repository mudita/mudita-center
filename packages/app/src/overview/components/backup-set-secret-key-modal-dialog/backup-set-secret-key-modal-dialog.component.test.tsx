/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { waitFor } from "@testing-library/dom"
import { fireEvent } from "@testing-library/react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { BackupSetSecretKeyModal } from "App/overview/components/backup-set-secret-key-modal-dialog/backup-set-secret-key-modal-dialog.component"
import { BackupSetSecretKeyModalTestIds } from "App/overview/components/backup-set-secret-key-modal-dialog/backup-set-secret-key-modal-dialog-test-ids.enum"
import { noop } from "Renderer/utils/noop"

type Props = ComponentProps<typeof BackupSetSecretKeyModal>
const defaultProps: Props = {
  onSecretKeySet: noop,
  open: true,
}
const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<BackupSetSecretKeyModal {...props} />)
  return {
    ...outcome,
    firstInput: outcome.getByTestId(BackupSetSecretKeyModalTestIds.FirstInput),
    secondInput: outcome.getByTestId(
      BackupSetSecretKeyModalTestIds.SecondInput
    ),
    submitButton: outcome.getByTestId(
      BackupSetSecretKeyModalTestIds.SubmitButton
    ),
  }
}

// This is hack to buggy useForm dependency from react-hook-form
const renderWithWaitFor = async (extraProps?: Partial<Props>) => {
  const outcome = render(extraProps)
  await waitFor(noop)

  return outcome
}

test("Modal renders properly", async () => {
  const { firstInput, secondInput, submitButton } = await renderWithWaitFor()

  expect(firstInput).toBeInTheDocument()
  expect(secondInput).toBeInTheDocument()
  expect(submitButton).toBeInTheDocument()
})

describe("validation works properly", () => {
  test("when both input fields are empty", async () => {
    const onSecretKeySet = jest.fn()
    const { submitButton } = await renderWithWaitFor({
      onSecretKeySet,
    })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(onSecretKeySet).not.toBeCalled()
    })
  })

  test("validation works properly when password is to short", async () => {
    const onSecretKeySet = jest.fn()
    const { firstInput, secondInput, submitButton, getByText } =
      await renderWithWaitFor({
        onSecretKeySet,
      })

    fireEvent.change(firstInput, {
      target: { value: "abcd" },
    })
    fireEvent.change(secondInput, {
      target: { value: "abcd" },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(
        getByText("[value] component.formErrorTooShort")
      ).toBeInTheDocument()
      expect(onSecretKeySet).not.toBeCalled()
    })
  })

  test("validation works properly when password doesn't contain number", async () => {
    const onSecretKeySet = jest.fn()
    const { firstInput, secondInput, submitButton, getByText } =
      await renderWithWaitFor({
        onSecretKeySet,
      })

    fireEvent.change(firstInput, {
      target: { value: "Abcdefgh" },
    })
    fireEvent.change(secondInput, {
      target: { value: "Abcdefgh" },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(
        getByText("[value] module.overview.backupSecretKeyNumber")
      ).toBeInTheDocument()
      expect(onSecretKeySet).not.toBeCalled()
    })
  })

  test("validation works properly when password doesn't contain at least one upper case", async () => {
    const onSecretKeySet = jest.fn()
    const { firstInput, secondInput, submitButton, getByText } =
      await renderWithWaitFor({
        onSecretKeySet,
      })

    fireEvent.change(firstInput, {
      target: { value: "abcdefgh" },
    })
    fireEvent.change(secondInput, {
      target: { value: "abcdefgh" },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(
        getByText("[value] module.overview.backupSecretKeyUppercase")
      ).toBeInTheDocument()
      expect(onSecretKeySet).not.toBeCalled()
    })
  })

  test("validation works properly when password doesn't contain at least one lower case", async () => {
    const onSecretKeySet = jest.fn()
    const { firstInput, secondInput, submitButton, getByText } =
      await renderWithWaitFor({
        onSecretKeySet,
      })

    fireEvent.change(firstInput, {
      target: { value: "ABCDEF1!" },
    })
    fireEvent.change(secondInput, {
      target: { value: "ABCDEF1!" },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(
        getByText("[value] module.overview.backupSecretKeyLowercase")
      ).toBeInTheDocument()
      expect(onSecretKeySet).not.toBeCalled()
    })
  })
})

test("form trigger onSubmit when form is valid", async () => {
  const onSecretKeySet = jest.fn()
  const { firstInput, secondInput, submitButton } = await renderWithWaitFor({
    onSecretKeySet,
  })

  fireEvent.change(firstInput, {
    target: { value: "Abcdef1!" },
  })
  fireEvent.change(secondInput, {
    target: { value: "Abcdef1!" },
  })
  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(onSecretKeySet).toBeCalledWith("Abcdef1!")
  })
})
