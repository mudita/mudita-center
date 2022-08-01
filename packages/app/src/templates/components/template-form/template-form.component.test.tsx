/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { waitFor } from "@testing-library/dom"
import { fireEvent } from "@testing-library/react"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { TemplateForm } from "App/templates/components/template-form/template-form.component"
import { TemplateFormProps } from "App/templates/components/template-form/template-form.interface"
import { TemplateFormTestIds } from "App/templates/components/template-form/template-form-ids.enum"

const onCloseMock = jest.fn()
const onSaveMock = jest.fn()
const textMock = "Luke, I'm your father"
const longTextMock =
  "Duis tincidunt dui ut condimentum sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis neque eget mi posuere porta ut ut felis. Fusce ultrices cursus interdum. Nulla nibh eros, egestas eu felis vel, posuere pretium elit. Nullam vitae luctus eros, eu lobortis augue. Vestibulum in felis pharetra, lacinia nibh vitae, vehicula velit. Quisque massa est, placerat sed urna vitae, eleifend blandit sapien. Donec a efficitur nunc, et euismod tellus."

const render = (props: TemplateFormProps) => {
  return renderWithThemeAndIntl(<TemplateForm {...props} />)
}

const renderWithWaitForm = async (props: TemplateFormProps) => {
  const outcome = render(props)
  await waitFor(noop)

  return outcome
}

describe("`TemplateForm` component", () => {
  describe("Close functionality", () => {
    test("close the form when click on `Close` button", async () => {
      const { getByTestId } = await renderWithWaitForm({
        onClose: onCloseMock,
        onSave: onSaveMock,
        error: null,
        template: undefined,
        saving: false,
      })
      const closeButton = getByTestId(TemplateFormTestIds.CancelButton)

      expect(onCloseMock).toHaveBeenCalledTimes(0)
      fireEvent.click(closeButton)
      expect(onCloseMock).toHaveBeenCalledTimes(1)
    })
  })

  describe("Save functionality", () => {
    test("`Save` button is disabled when no template text", async () => {
      const { getByTestId, queryByTestId } = await renderWithWaitForm({
        onClose: onCloseMock,
        onSave: onSaveMock,
        error: null,
        template: undefined,
        saving: false,
      })
      const saveButton = queryByTestId(
        TemplateFormTestIds.SaveButton
      ) as HTMLInputElement
      const textField = getByTestId(TemplateFormTestIds.TextFiled)

      fireEvent.change(textField, {
        target: { value: "" },
      })

      await waitFor(() => {
        expect(saveButton).toBeDisabled()
        fireEvent.click(saveButton)
        expect(onSaveMock).toHaveBeenCalledTimes(0)
      })
    })
    test("`Save` button is not disabled when added template text", async () => {
      const { getByTestId, queryByTestId } = await renderWithWaitForm({
        onClose: onCloseMock,
        onSave: onSaveMock,
        error: null,
        template: undefined,
        saving: false,
      })
      const saveButton = queryByTestId(
        TemplateFormTestIds.SaveButton
      ) as HTMLInputElement
      const textField = getByTestId(TemplateFormTestIds.TextFiled)

      fireEvent.change(textField, {
        target: { value: textMock },
      })

      await waitFor(() => {
        expect(saveButton).not.toBeDisabled()
        fireEvent.click(saveButton)
        expect(onSaveMock).toHaveBeenCalledTimes(0)
      })
    })
    test("`onSave` callback called with provided string when click on `Save` button", async () => {
      const { getByTestId } = await renderWithWaitForm({
        onClose: onCloseMock,
        onSave: onSaveMock,
        error: null,
        template: undefined,
        saving: false,
      })
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)
      const textField = getByTestId(TemplateFormTestIds.TextFiled)

      fireEvent.change(textField, {
        target: { value: textMock },
      })
      await waitFor(() => {
        expect(onSaveMock).toHaveBeenCalledTimes(0)
      })
      fireEvent.click(saveButton)

      await waitFor(() => {
        expect(onSaveMock).toHaveBeenCalledWith({ text: textMock })
      })
    })

    test("`onSave` triggers error if the string isn't provided", async () => {
      const { getByTestId, queryByText } = await renderWithWaitForm({
        onClose: onCloseMock,
        onSave: onSaveMock,
        error: null,
        template: undefined,
        saving: false,
      })
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)
      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      fireEvent.change(textField, {
        target: { value: "test" },
      })
      await waitFor(() => {
        expect(
          queryByText("[value] module.templates.required")
        ).not.toBeInTheDocument()
      })

      fireEvent.change(textField, {
        target: { value: "" },
      })
      fireEvent.click(saveButton)
      await waitFor(() => {
        expect(
          queryByText("[value] module.templates.required")
        ).toBeInTheDocument()
      })
    })

    test("`onSave` triggers error if text longer then 469 bytes", async () => {
      const { getByTestId, queryByText } = await renderWithWaitForm({
        onClose: onCloseMock,
        onSave: onSaveMock,
        error: null,
        template: undefined,
        saving: false,
      })
      const textField = getByTestId(TemplateFormTestIds.TextFiled)

      expect(
        queryByText("[value] module.templates.tooLong")
      ).not.toBeInTheDocument()
      fireEvent.change(textField, {
        target: { value: longTextMock },
      })
      await waitFor(() => {
        expect(
          queryByText("[value] module.templates.tooLong")
        ).toBeInTheDocument()
      })
    })

    test("show spinner if `saving` prop have been provided", async () => {
      const { getByTestId } = await renderWithWaitForm({
        onClose: onCloseMock,
        onSave: onSaveMock,
        error: null,
        template: undefined,
        saving: true,
      })

      expect(getByTestId(TemplateFormTestIds.Spinner)).toBeInTheDocument()
    })
  })

  describe("Top level error functionality", () => {
    test("displays error message if prop `error` have been provided", async () => {
      const { queryByText } = await renderWithWaitForm({
        onClose: onCloseMock,
        onSave: onSaveMock,
        error: "Luke, I'm your error",
        template: undefined,
        saving: false,
      })

      await waitFor(() => {
        expect(queryByText("Luke, I'm your error")).toBeInTheDocument()
      })
    })
  })
})
