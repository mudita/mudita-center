/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { waitFor } from "@testing-library/dom"
import { fireEvent } from "@testing-library/react"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import {
  renderWithThemeAndIntl,
  constructWrapper,
} from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { Templates } from "App/templates/components/templates/templates.component"
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

type Props = ComponentProps<typeof Templates>

const defaultProps: Props = {
  templates: [],
  selectedItems: [],
  allItemsSelected: false,
  resetAllItems: jest.fn(),
  selectAllItems: jest.fn(),
  createTemplate: createTemplateMock,
  deleteTemplates: deleteTemplatesMock,
  updateTemplate: updateTemplateMock,
  loading: false,
  loaded: false,
  error: null,
}

const defaultState: ReduxRootState = {
  templates: {
    data: [],
  },
} as unknown as ReduxRootState

const render = (
  extraProps?: Partial<Props>,
  state: ReduxRootState = defaultState
) => {
  const props: Props = {
    ...defaultProps,
    ...extraProps,
  }
  const store = createMockStore([thunk])(state)

  const result = renderWithThemeAndIntl(
    <Provider store={store}>
      <Templates {...props} />
    </Provider>
  )
  return {
    ...result,
    rerender: (extraNewProps?: Partial<Props>) => {
      const newProps: Props = {
        ...defaultProps,
        ...extraNewProps,
      }

      return result.rerender(
        constructWrapper(
          <Provider store={store}>
            <Templates {...newProps} />
          </Provider>
        )
      )
    },
  }
}

describe("`Templates` component", () => {
  describe("Open/Close functionality", () => {
    test("open/close template form", async () => {
      const { getByTestId, queryByTestId } = render()
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
      const { getByText } = render(
        {
          templates: [templateMock],
        },
        {
          templates: {
            data: [templateMock],
          },
        } as ReduxRootState
      )

      expect(getByText(templateMock.text)).toBeInTheDocument()
    })

    test("renders empty message if templates array is empty", async () => {
      const { getByText } = render()

      expect(
        getByText("[value] module.templates.emptyList.title")
      ).toBeInTheDocument()
      expect(
        getByText("[value] module.templates.emptyList.description")
      ).toBeInTheDocument()
    })
  })

  describe("`createTemplate` functionality", () => {
    test.skip("Calls `createTemplate` when clicks on `Save` button", async () => {
      const { getByTestId } = render({
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
      })

      const openFormButton = getByTestId(TemplatesPanelTestIds.Button)
      fireEvent.click(openFormButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.input(textField, {
        target: { value: "Hello world!" },
      })
      await waitFor(() => {
        expect(createTemplateMock).toHaveBeenCalledTimes(0)
      })
      fireEvent.click(saveButton)
      await waitFor(() => {
        expect(createTemplateMock).toHaveBeenCalledTimes(1)
      })
    })

    test.skip("Shows creating template loader after click on save button", async () => {
      const { getByTestId } = render(
        {
          templates: [templateMock],
          createTemplate: createTemplateMock,
          deleteTemplates: deleteTemplatesMock,
          updateTemplate: updateTemplateMock,
        },
        {
          templates: {
            data: [templateMock],
          },
        } as unknown as ReduxRootState
      )

      const openFormButton = getByTestId(TemplatesPanelTestIds.Button)
      fireEvent.click(openFormButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello world!" },
      })

      await waitFor(noop)

      fireEvent.click(saveButton)

      await waitFor(() => {
        expect(
          getByTestId(CreatingTemplateModalsTestIds.LoadingModal)
        ).toBeInTheDocument()
      })
    })

    test.skip("Shows creation templates info after state changed to `loaded: true`", async () => {
      const { getByTestId, rerender } = render(
        {
          templates: [templateMock],
          createTemplate: createTemplateMock,
          deleteTemplates: deleteTemplatesMock,
          updateTemplate: updateTemplateMock,
        },
        {
          templates: {
            data: [templateMock],
          },
        } as unknown as ReduxRootState
      )

      const openFormButton = getByTestId(TemplatesPanelTestIds.Button)
      fireEvent.click(openFormButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello world!" },
      })
      await waitFor(noop)

      fireEvent.click(saveButton)

      await waitFor(noop)

       rerender({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        loading: false,
        loaded: true,
      })

      await waitFor(() => {
        expect(
          getByTestId(CreatingTemplateModalsTestIds.CreatedPopUp)
        ).toBeInTheDocument()
      })
    })

    test.skip("Shows creating template error if error isn't empty", async () => {
      const { getByTestId, rerender } = render(
        {
          templates: [templateMock],
          createTemplate: createTemplateMock,
          deleteTemplates: deleteTemplatesMock,
          updateTemplate: updateTemplateMock,
        },
        {
          templates: {
            data: [templateMock],
          },
        } as unknown as ReduxRootState
      )

      const openFormButton = getByTestId(TemplatesPanelTestIds.Button)
      fireEvent.click(openFormButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello world!" },
      })
      await waitFor(noop)

      fireEvent.click(saveButton)

      await waitFor(noop)

       rerender({
        templates: [templateMock],
        allItemsSelected: false,
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
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
    test.skip("Calls `updateTemplate` when clicks on `Save` button", async () => {
      const { getByTestId, findByTestId } = render(
        {
          templates: [templateMock],
          createTemplate: createTemplateMock,
          deleteTemplates: deleteTemplatesMock,
          updateTemplate: updateTemplateMock,
        },
        {
          templates: {
            data: [templateMock],
          },
        } as unknown as ReduxRootState
      )

      const dropdownButton = await findByTestId(
        TemplateOptionsTestIds.DropdownToggler
      )
      dropdownButton?.click()

      const editButton = await findByTestId(TemplateOptionsTestIds.EditButton)
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

    test.skip("Shows updating template loader after click on save button", async () => {
      const { getByTestId, findByTestId } = render(
        {
          templates: [templateMock],
          createTemplate: createTemplateMock,
          deleteTemplates: deleteTemplatesMock,
          updateTemplate: updateTemplateMock,
        },
        {
          templates: {
            data: [templateMock],
          },
        } as unknown as ReduxRootState
      )

      const dropdownButton = getByTestId(TemplateOptionsTestIds.DropdownToggler)
      dropdownButton?.click()

      const editButton = await findByTestId(TemplateOptionsTestIds.EditButton)
      fireEvent.click(editButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello updated world!" },
      })

      await waitFor(noop)

      fireEvent.click(saveButton)

      expect(
        getByTestId(UpdatingTemplateModalsTestIds.LoadingModal)
      ).toBeInTheDocument()
    })

    test.skip("Shows updating templates info after state changed to `loaded: true`", async () => {
      const { getByTestId, findByTestId, rerender } = render(
        {
          templates: [templateMock],
          createTemplate: createTemplateMock,
          deleteTemplates: deleteTemplatesMock,
          updateTemplate: updateTemplateMock,
        },
        {
          templates: {
            data: [templateMock],
          },
        } as unknown as ReduxRootState
      )

      const dropdownButton = getByTestId(TemplateOptionsTestIds.DropdownToggler)
      dropdownButton?.click()

      const editButton = await findByTestId(TemplateOptionsTestIds.EditButton)
      fireEvent.click(editButton)

      const textField = getByTestId(TemplateFormTestIds.TextFiled)
      const saveButton = getByTestId(TemplateFormTestIds.SaveButton)

      fireEvent.change(textField, {
        target: { value: "Hello updated world!" },
      })

      await waitFor(noop)

      fireEvent.click(saveButton)

      await waitFor(noop)

       rerender({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        loading: false,
        loaded: true,
      })

      await waitFor(() => {
        expect(
          getByTestId(UpdatingTemplateModalsTestIds.UpdatedPopUp)
        ).toBeInTheDocument()
      })
    })

    test.skip("Shows updating template error if error isn't empty", async () => {
      const { getByTestId, rerender } = render(
        {
          templates: [templateMock],
          createTemplate: createTemplateMock,
          deleteTemplates: deleteTemplatesMock,
          updateTemplate: updateTemplateMock,
        },
        {
          templates: {
            data: [templateMock],
          },
        } as unknown as ReduxRootState
      )

      const dropdownButton = getByTestId(TemplateOptionsTestIds.DropdownToggler)
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

       rerender({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
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
      const { getByTestId, findByTestId } = render(
        {
          templates: [templateMock],
          loading: false,
          loaded: true,
        },
        {
          templates: {
            data: [templateMock],
          },
        } as ReduxRootState
      )

      const dropdownButton = getByTestId(TemplateOptionsTestIds.DropdownToggler)
      dropdownButton?.click()

      const deleteButton = await findByTestId(
        TemplateOptionsTestIds.DeleteButton
      )
      fireEvent.click(deleteButton)

      expect(
        getByTestId(DeletingTemplateModalsTestIds.ConfirmationModal)
      ).toBeInTheDocument()
    })

    test("Clicking on confirmation delete triggers `deleteTemplates` action", async () => {
      const { getByTestId, findByTestId } = render(
        {
          templates: [templateMock],
        },
        {
          templates: {
            data: [templateMock],
          },
        } as ReduxRootState
      )

      const dropdownButton = getByTestId(TemplateOptionsTestIds.DropdownToggler)
      dropdownButton?.click()

      const deleteButton = await findByTestId(
        TemplateOptionsTestIds.DeleteButton
      )
      fireEvent.click(deleteButton)

      expect(deleteTemplatesMock).toHaveBeenCalledTimes(0)

      const modalConfirmButton = getByTestId(ModalTestIds.ModalActionButton)
      fireEvent.click(modalConfirmButton)

      expect(deleteTemplatesMock).toHaveBeenCalledTimes(1)
    })

    test("Shows deleted templates loader after click on delete confirmation button", async () => {
      const { getByTestId, findByTestId } = render(
        {
          templates: [templateMock],
        },
        {
          templates: {
            data: [templateMock],
          },
        } as ReduxRootState
      )

      const dropdownButton = getByTestId(TemplateOptionsTestIds.DropdownToggler)
      dropdownButton?.click()

      const deleteButton = await findByTestId(
        TemplateOptionsTestIds.DeleteButton
      )
      fireEvent.click(deleteButton)

      const modalConfirmButton = getByTestId(ModalTestIds.ModalActionButton)
      fireEvent.click(modalConfirmButton)

      await waitFor(() => {
        expect(
          getByTestId(DeletingTemplateModalsTestIds.LoadingModal)
        ).toBeInTheDocument()
      })
    })

    test.skip("Shows deleted templates info after state changed to `loaded: true`", async () => {
      const { getByTestId, rerender, findByTestId } = render(
        {
          templates: [templateMock],
        },
        {
          templates: {
            data: [templateMock],
          },
        } as ReduxRootState
      )

      const dropdownButton = getByTestId(TemplateOptionsTestIds.DropdownToggler)
      dropdownButton?.click()

      const deleteButton = await findByTestId(
        TemplateOptionsTestIds.DeleteButton
      )
      fireEvent.click(deleteButton)

      const modalConfirmButton = getByTestId(ModalTestIds.ModalActionButton)
      fireEvent.click(modalConfirmButton)

       rerender({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
        loading: false,
        loaded: true,
      })

      await waitFor(() => {
        expect(
          getByTestId(DeletingTemplateModalsTestIds.DeletedPopUp)
        ).toBeInTheDocument()
      })
    })

    test("Shows deleted templates error if error isn't empty", async () => {
      const { getByTestId, findByTestId, rerender } = render(
        {
          templates: [templateMock],
        },
        {
          templates: {
            data: [templateMock],
          },
        } as ReduxRootState
      )

      const dropdownButton = getByTestId(TemplateOptionsTestIds.DropdownToggler)
      dropdownButton?.click()

      const deleteButton = await findByTestId(
        TemplateOptionsTestIds.DeleteButton
      )
      fireEvent.click(deleteButton)

      const modalConfirmButton = getByTestId(ModalTestIds.ModalActionButton)
      fireEvent.click(modalConfirmButton)

       rerender({
        templates: [templateMock],
        createTemplate: createTemplateMock,
        deleteTemplates: deleteTemplatesMock,
        updateTemplate: updateTemplateMock,
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
})
