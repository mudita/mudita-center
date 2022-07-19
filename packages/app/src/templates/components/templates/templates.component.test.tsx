/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { waitFor } from "@testing-library/dom"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { fireEvent } from "@testing-library/react"
import {
  renderWithThemeAndIntl,
  constructWrapper,
} from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { Templates } from "App/templates/components/templates/templates.component"
import { TemplatesProps } from "App/templates/components/templates/templates.interface"
import { TemplatesPanelTestIds } from "App/templates/components/templates-panel/templates-panel-ids.enum"
import { TemplateFormTestIds } from "App/templates/components/template-form/template-form-ids.enum"
import { Template } from "App/templates/dto"
import { TemplateOptionsTestIds } from "App/templates/components/template-options/template-options-test-ids.enum"
import { DeletingTemplateModalsTestIds } from "App/templates/components/deleting-template-modals/deleting-template-modals-test-ids.enum"
import { CreatingTemplateModalsTestIds } from "App/templates/components/creating-template-modals/creating-template-modals-test-ids.enum"
import { UpdatingTemplateModalsTestIds } from "App/templates/components/updating-template-modals/updating-template-modals-test-ids.enum"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"

const templateMock: Template = {
  id: "1",
  text: "Hello world!",
  lastUsedAt: "2",
  order: 1,
}

const createTemplateMock = jest
  .fn()
  .mockResolvedValue({ payload: templateMock })

const updateTemplateMock = jest
  .fn()
  .mockResolvedValue({ payload: templateMock })

const deleteTemplatesMock = jest.fn()

const updateTemplateOrderMock = jest
  .fn()
  .mockResolvedValue({ payload: templateMock })

const render = async (props: TemplatesProps) => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const result = await renderWithThemeAndIntl(<Templates {...props} />)
  return {
    ...result,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    rerender: async (newProps: TemplatesProps) =>
      result.rerender(constructWrapper(<Templates {...newProps} />)),
  }
}

describe("`Templates` component", () => {
  describe("Open/Close functionality", () => {
    test("open/close template form", async () => {
      const { getByTestId, queryByTestId } = await render({
        templates: [],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })
      const openFormButton = getByTestId(TemplatesPanelTestIds.Button)
      let cancelFormButton = queryByTestId(TemplateFormTestIds.CancelButton)
      let templateForm = queryByTestId(TemplateFormTestIds.Container)

      expect(templateForm).not.toBeInTheDocument()
      expect(cancelFormButton).not.toBeInTheDocument()
      fireEvent.click(openFormButton)

      cancelFormButton = getByTestId(TemplateFormTestIds.CancelButton)
      templateForm = queryByTestId(TemplateFormTestIds.Container)
      expect(templateForm).toBeInTheDocument()

      fireEvent.click(cancelFormButton)
      templateForm = queryByTestId(TemplateFormTestIds.Container)
      expect(templateForm).not.toBeInTheDocument()
    })
  })

  describe("template list functionality", () => {
    test("renders list of templates", async () => {
      const { getByText } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      expect(getByText(templateMock.text)).toBeInTheDocument()
    })

    test("renders empty message if templates array is empty", async () => {
      const { getByText } = await render({
        templates: [],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      expect(
        getByText("[value] module.templates.emptyList.title")
      ).toBeInTheDocument()
      expect(
        getByText("[value] module.templates.emptyList.description")
      ).toBeInTheDocument()
    })
  })

  describe("`createTemplate` functionality", () => {
    test("Calls `createTemplate` when clicks on `Save` button", async () => {
      const { getByTestId } = await render({
        templates: [],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const openFormButton = getByTestId(TemplatesPanelTestIds.Button)
      fireEvent.click(openFormButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello world!" },
      })
      expect(createTemplateMock).toHaveBeenCalledTimes(0)
      fireEvent.click(saveButton)
      await waitFor(() => {
        expect(createTemplateMock).toHaveBeenCalledTimes(1)
      })
    })

    test("Shows creating template loader after click on save button", async () => {
      const { getByTestId } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const openFormButton = getByTestId(TemplatesPanelTestIds.Button)
      fireEvent.click(openFormButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello world!" },
      })

      fireEvent.click(saveButton)

      await waitFor(() => {
        expect(
          getByTestId(CreatingTemplateModalsTestIds.LoadingModal)
        ).toBeInTheDocument()
      })
    })

    test("Shows creation templates info after state changed to `loaded: true`", async () => {
      const { getByTestId, rerender } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const openFormButton = getByTestId(TemplatesPanelTestIds.Button)
      fireEvent.click(openFormButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello world!" },
      })

      fireEvent.click(saveButton)

      await waitFor(noop)

      await rerender({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: true,
        error: null,
      })

      await waitFor(() => {
        expect(
          getByTestId(CreatingTemplateModalsTestIds.CreatedPopUp)
        ).toBeInTheDocument()
      })
    })

    test("Shows creating template error if error isn't empty", async () => {
      const { getByTestId, rerender } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const openFormButton = getByTestId(TemplatesPanelTestIds.Button)
      fireEvent.click(openFormButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello world!" },
      })

      fireEvent.click(saveButton)

      await waitFor(noop)

      await rerender({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: true,
        error: "Luke, I'm your error",
      })

      await waitFor(() => {
        expect(
          getByTestId(CreatingTemplateModalsTestIds.ErrorModal)
        ).toBeInTheDocument()
      })
    })
  })

  describe("`updateTemplate` functionality", () => {
    test("Calls `updateTemplate` when clicks on `Save` button", async () => {
      const { getByTestId } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const dropdownButton = getByTestId(
        TemplateOptionsTestIds.OptionsDropDown
      ).querySelector("button")
      dropdownButton?.click()

      const editButton = getByTestId(TemplateOptionsTestIds.EditButton)
      fireEvent.click(editButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello updated world!" },
      })

      expect(updateTemplateMock).toHaveBeenCalledTimes(0)

      await waitFor(noop)

      fireEvent.click(saveButton)

      await waitFor(() => {
        expect(updateTemplateMock).toHaveBeenCalledWith({
          ...templateMock,
          text: "Hello updated world!",
        })
      })
    })

    test("Shows updating template loader after click on save button", async () => {
      const { getByTestId } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const dropdownButton = getByTestId(
        TemplateOptionsTestIds.OptionsDropDown
      ).querySelector("button")
      dropdownButton?.click()

      const editButton = getByTestId(TemplateOptionsTestIds.EditButton)
      fireEvent.click(editButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello updated world!" },
      })

      await waitFor(noop)

      fireEvent.click(saveButton)

      await waitFor(() => {
        expect(
          getByTestId(UpdatingTemplateModalsTestIds.LoadingModal)
        ).toBeInTheDocument()
      })
    })

    test("Shows updating templates info after state changed to `loaded: true`", async () => {
      const { getByTestId, rerender } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const dropdownButton = getByTestId(
        TemplateOptionsTestIds.OptionsDropDown
      ).querySelector("button")
      dropdownButton?.click()

      const editButton = getByTestId(TemplateOptionsTestIds.EditButton)
      fireEvent.click(editButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello updated world!" },
      })

      await waitFor(noop)

      fireEvent.click(saveButton)

      await waitFor(noop)

      await rerender({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: true,
        error: null,
      })

      await waitFor(() => {
        expect(
          getByTestId(UpdatingTemplateModalsTestIds.UpdatedPopUp)
        ).toBeInTheDocument()
      })
    })

    test("Shows updating template error if error isn't empty", async () => {
      const { getByTestId, rerender } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const dropdownButton = getByTestId(
        TemplateOptionsTestIds.OptionsDropDown
      ).querySelector("button")
      dropdownButton?.click()

      const editButton = getByTestId(TemplateOptionsTestIds.EditButton)
      fireEvent.click(editButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello updated world!" },
      })

      await waitFor(noop)

      fireEvent.click(saveButton)

      await waitFor(noop)

      await rerender({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: true,
        error: "Luke, I'm your error",
      })

      await waitFor(() => {
        expect(
          getByTestId(UpdatingTemplateModalsTestIds.ErrorModal)
        ).toBeInTheDocument()
      })
    })
  })

  describe("`deleteTemplates` functionality", () => {
    test("Clicking on dropdown delete opens delete confirmation modal", async () => {
      const { getByTestId } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: true,
        error: null,
      })

      const dropdownButton = getByTestId(
        TemplateOptionsTestIds.OptionsDropDown
      ).querySelector("button")
      dropdownButton?.click()

      const deleteButton = getByTestId(TemplateOptionsTestIds.DeleteButton)
      fireEvent.click(deleteButton)

      expect(
        getByTestId(DeletingTemplateModalsTestIds.ConfirmationModal)
      ).toBeInTheDocument()
    })

    test("Clicking on confirmation delete triggers `deleteTemplates` action", async () => {
      const { getByTestId } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const dropdownButton = getByTestId(
        TemplateOptionsTestIds.OptionsDropDown
      ).querySelector("button")
      dropdownButton?.click()

      const deleteButton = getByTestId(TemplateOptionsTestIds.DeleteButton)
      fireEvent.click(deleteButton)

      expect(deleteTemplatesMock).toHaveBeenCalledTimes(0)

      const modalConfirmButton = getByTestId(ModalTestIds.ModalActionButton)
      fireEvent.click(modalConfirmButton)

      expect(deleteTemplatesMock).toHaveBeenCalledTimes(1)
    })

    test("Shows deleted templates loader after click on delete confirmation button", async () => {
      const { getByTestId } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const dropdownButton = getByTestId(
        TemplateOptionsTestIds.OptionsDropDown
      ).querySelector("button")
      dropdownButton?.click()

      const deleteButton = getByTestId(TemplateOptionsTestIds.DeleteButton)
      fireEvent.click(deleteButton)

      const modalConfirmButton = getByTestId(ModalTestIds.ModalActionButton)
      fireEvent.click(modalConfirmButton)

      await waitFor(() => {
        expect(
          getByTestId(DeletingTemplateModalsTestIds.LoadingModal)
        ).toBeInTheDocument()
      })
    })

    test("Shows deleted templates info after state changed to `loaded: true`", async () => {
      const { getByTestId, rerender } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const dropdownButton = getByTestId(
        TemplateOptionsTestIds.OptionsDropDown
      ).querySelector("button")
      dropdownButton?.click()

      const deleteButton = getByTestId(TemplateOptionsTestIds.DeleteButton)
      fireEvent.click(deleteButton)

      const modalConfirmButton = getByTestId(ModalTestIds.ModalActionButton)
      fireEvent.click(modalConfirmButton)

      await rerender({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: true,
        error: null,
      })

      await waitFor(() => {
        expect(
          getByTestId(DeletingTemplateModalsTestIds.DeletedPopUp)
        ).toBeInTheDocument()
      })
    })

    test("Shows deleted templates error if error isn't empty", async () => {
      const { getByTestId, rerender } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: false,
        error: null,
      })

      const dropdownButton = getByTestId(
        TemplateOptionsTestIds.OptionsDropDown
      ).querySelector("button")
      dropdownButton?.click()

      const deleteButton = getByTestId(TemplateOptionsTestIds.DeleteButton)
      fireEvent.click(deleteButton)

      const modalConfirmButton = getByTestId(ModalTestIds.ModalActionButton)
      fireEvent.click(modalConfirmButton)

      await rerender({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        updateTemplateOrder: updateTemplateOrderMock,
        loading: false,
        loaded: true,
        error: "Luke, I'm your error",
      })

      await waitFor(() => {
        expect(
          getByTestId(DeletingTemplateModalsTestIds.ErrorModal)
        ).toBeInTheDocument()
      })
    })
  })
  test("Remove checkboxes and selection manager when opening template details", async () => {
    const { getByTestId, queryAllByTestId, queryByTestId } = await render({
      templates: [templateMock],
      createTemplate: createTemplateMock,
      deleteTemplates: deleteTemplatesMock,
      updateTemplate: updateTemplateMock,
      updateTemplateOrder: updateTemplateOrderMock,
      loading: false,
      loaded: false,
      error: null,
    })
    const checkboxes = queryAllByTestId("template-checkbox")
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeVisible())
    fireEvent.click(checkboxes[0])
    checkboxes.forEach((checkbox) => expect(checkbox).toBeVisible())
    expect(
      queryByTestId(TemplatesPanelTestIds.SelectionManager)
    ).toBeInTheDocument()

    const dropdownButton = getByTestId(
      TemplateOptionsTestIds.OptionsDropDown
    ).querySelector("button")
    dropdownButton?.click()

    const editButton = getByTestId(TemplateOptionsTestIds.EditButton)
    fireEvent.click(editButton)

    expect(queryByTestId(TemplateFormTestIds.Container)).toBeInTheDocument()
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeVisible())
    expect(
      queryByTestId(TemplatesPanelTestIds.SelectionManager)
    ).not.toBeInTheDocument()
  })
})
