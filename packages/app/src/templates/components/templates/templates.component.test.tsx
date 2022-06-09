/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { waitFor } from "@testing-library/dom"
import { fireEvent } from "@testing-library/react"
import { noop } from "Renderer/utils/noop"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { Templates } from "App/templates/components/templates/templates.component"
import { TemplatesProps } from "App/templates/components/templates/templates.interface"
import { TemplatesPanelTestIds } from "App/templates/components/templates-panel/templates-panel-ids.enum"
import { TemplateFormTestIds } from "App/templates/components/template-form/template-form-ids.enum"
import { Template } from "App/templates/dto"
import { TemplatesTestIds } from "App/templates/components/templates/templates-test-ids.enum"

const templateMock: Template = {
  id: "1",
  text: "Hello world!",
  lastUsedAt: "2",
}

const createTemplateMock = jest
  .fn()
  .mockResolvedValue({ payload: templateMock })

const deleteTemplatesMock = jest.fn()
const hideDeleteModalMock = jest.fn()

const render = async (props: TemplatesProps) => {
  const outcome = renderWithThemeAndIntl(<Templates {...props} />)
  await waitFor(noop)

  return outcome
}

describe("`Templates` component", () => {
  describe("Open/Close functionality", () => {
    test("open/close template form", async () => {
      const { getByTestId, queryByTestId } = await render({
        templates: [],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        loading: false,
        loaded: false,
        error: null,
        deleting: false,
        hideDeleteModal: hideDeleteModalMock,
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
        loading: false,
        loaded: false,
        error: null,
        deleting: false,
        hideDeleteModal: hideDeleteModalMock,
      })

      expect(getByText(templateMock.text)).toBeInTheDocument()
    })

    test("renders empty message if templates array is empty", async () => {
      const { getByText } = await render({
        templates: [],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        loading: false,
        loaded: false,
        error: null,
        deleting: false,
        hideDeleteModal: hideDeleteModalMock,
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
    test("calls `createTemplate` when clicks on `Save` button", async () => {
      const { getByTestId } = await render({
        templates: [],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        loading: false,
        loaded: false,
        error: null,
        deleting: false,
        hideDeleteModal: hideDeleteModalMock,
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

    test("close form if `createTemplate` callback returns value", async () => {
      const successCreateTemplateMock = jest
        .fn()
        .mockResolvedValue({ payload: templateMock })

      const { getByTestId } = await render({
        templates: [],
        createTemplate: successCreateTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        loading: false,
        loaded: false,
        error: null,
        deleting: false,
        hideDeleteModal: hideDeleteModalMock,
      })

      const openFormButton = getByTestId(TemplatesPanelTestIds.Button)
      fireEvent.click(openFormButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)
      const templateForm = getByTestId(TemplateFormTestIds.Container)

      fireEvent.change(textField, {
        target: { value: "Hello world!" },
      })
      expect(templateForm).toBeInTheDocument()
      fireEvent.click(saveButton)
      await waitFor(() => {
        expect(templateForm).not.toBeInTheDocument()
      })
    })

    test("show top level error in form", async () => {
      const { getByTestId, getByText } = await render({
        templates: [],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        loading: false,
        loaded: false,
        error: "Some error",
        deleting: false,
        hideDeleteModal: hideDeleteModalMock,
      })

      const openFormButton = getByTestId(TemplatesPanelTestIds.Button)
      fireEvent.click(openFormButton)

      expect(getByText("Some error")).toBeInTheDocument()
    })
  })
  describe("`deleteTemplate` functionality", () => {
    test("Clicking on dropdown delete opens delete confirmation modal", async () => {
      const { getByTestId } = await render({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        loading: false,
        loaded: false,
        error: null,
        deleting: false,
        hideDeleteModal: hideDeleteModalMock,
      })
      const deleteButton = getByTestId("dropdown-delete")
      fireEvent.click(deleteButton)
      expect(
        getByTestId(TemplatesTestIds.DeleteConfirmationModal)
      ).toBeInTheDocument()
    })
  })

  test("show deleting loader, when deletingState is Deleting", async () => {
    const { getByTestId } = await render({
      templates: [templateMock],
      createTemplate: createTemplateMock,
      deleteTemplates: deleteTemplatesMock,
      loading: true,
      error: null,
      deleting: true,
      loaded: false,
      hideDeleteModal: hideDeleteModalMock,
    })

    expect(
      getByTestId(TemplatesTestIds.DeletingTemplateModal)
    ).toBeInTheDocument()
  })
  test("show InfoPopup with deleted template number message, when deletingState is Success", async () => {
    const { getByText } = await render({
      templates: [templateMock],
      createTemplate: createTemplateMock,
      deleteTemplates: deleteTemplatesMock,
      loading: false,
      error: null,
      deleting: true,
      loaded: true,
      hideDeleteModal: hideDeleteModalMock,
    })

    expect(
      getByText("[value] module.templates.templateDelete")
    ).toBeInTheDocument()
  })

  test("show deleting error modal, when deletingState is Fail", async () => {
    const { getByTestId } = await render({
      templates: [templateMock],
      createTemplate: createTemplateMock,
      deleteTemplates: deleteTemplatesMock,
      loading: false,
      error: "I'm error",
      deleting: true,
      loaded: false,
      hideDeleteModal: hideDeleteModalMock,
    })
    expect(
      getByTestId(TemplatesTestIds.DeleteTemplateError)
    ).toBeInTheDocument()
  })
})
