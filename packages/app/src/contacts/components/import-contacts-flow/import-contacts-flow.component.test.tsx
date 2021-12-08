/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ImportContactsFlow, {
  ImportContactsFlowState,
} from "App/contacts/components/import-contacts-flow/import-contacts-flow.component"
import { NewContact } from "App/contacts/store/contacts.type"
import { ImportContactsFlowTestIds } from "App/contacts/components/import-contacts-flow/import-contacts-flow-test-ids.component"

type Props = ComponentProps<typeof ImportContactsFlow>

const contacts: NewContact[] = [
  {
    firstName: "Alek",
    lastName: "Boligłowa",
    primaryPhoneNumber: "500400300",
    secondaryPhoneNumber: "",
    email: "",
    note: "",
    firstAddressLine: "6 Czeczota St.",
    secondAddressLine: "02600 Warsaw",
    favourite: true,
    blocked: false,
    ice: false,
  },
]

const defaultProps: Props = {
  contacts: contacts,
  authorizeAtGoogle: jest.fn(),
  authorizeAtOutLook: jest.fn(),
  importFromFile: jest.fn(),
  sendContactsToPhone: jest.fn(),
  closeModal: jest.fn(),
  retryImport: jest.fn(),
  addedContactsCount: 1,
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<ImportContactsFlow {...props} />)
  return {
    ...outcome,
  }
}

describe("`ImportContactsFlow` component", () => {
  describe("when component is render with default props", () => {
    test("should be displayed `SyncContactsModal`", () => {
      const { queryByTestId } = render()

      expect(queryByTestId(ImportContactsFlowTestIds.Start)).toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Downloading)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.DownloadingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.SelectingEmpty)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Selecting)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.ParsingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.AuthorizationError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Importing)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Success)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Failed)
      ).not.toBeInTheDocument()
    })
  })

  describe("when downloading contacts", () => {
    const extraProps: Partial<Props> = {
      openState: ImportContactsFlowState.Downloading,
    }
    test("DownloadContactsModal should be displayed", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(ImportContactsFlowTestIds.Downloading)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Start)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.DownloadingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.SelectingEmpty)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Selecting)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.ParsingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.AuthorizationError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Importing)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Success)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Failed)
      ).not.toBeInTheDocument()
    })
  })

  describe("when selecting contacts", () => {
    test("ContactImportModal should be displayed if there are some contacts", () => {
      const extraProps: Partial<Props> = {
        openState: ImportContactsFlowState.Selecting,
      }
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(ImportContactsFlowTestIds.Selecting)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Start)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Downloading)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.DownloadingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.SelectingEmpty)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.ParsingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.AuthorizationError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Importing)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Success)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Failed)
      ).not.toBeInTheDocument()
    })

    test("InfoModal should be displayed if there are no contacts", () => {
      const extraProps: Partial<Props> = {
        openState: ImportContactsFlowState.Selecting,
        contacts: [],
      }
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(ImportContactsFlowTestIds.SelectingEmpty)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Start)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Downloading)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.DownloadingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Selecting)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.ParsingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.AuthorizationError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Importing)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Success)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Failed)
      ).not.toBeInTheDocument()
    })
  })

  describe("when finish import", () => {
    test("with success", () => {
      const extraProps: Partial<Props> = {
        openState: ImportContactsFlowState.Success,
      }
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(ImportContactsFlowTestIds.Success)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Start)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Downloading)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.DownloadingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.SelectingEmpty)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Selecting)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.ParsingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.AuthorizationError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Importing)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Failed)
      ).not.toBeInTheDocument()
    })
    test("failed", () => {
      const extraProps: Partial<Props> = {
        openState: ImportContactsFlowState.Failed,
      }
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(ImportContactsFlowTestIds.Failed)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Start)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Downloading)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.DownloadingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.SelectingEmpty)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Selecting)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.ParsingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.AuthorizationError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Importing)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Success)
      ).not.toBeInTheDocument()
    })
  })
  describe("when error occured", () => {
    test("while parsing", () => {
      const extraProps: Partial<Props> = {
        openState: ImportContactsFlowState.ParsingError,
      }
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(ImportContactsFlowTestIds.ParsingError)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Start)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Downloading)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.DownloadingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.SelectingEmpty)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Selecting)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.AuthorizationError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Importing)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Success)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Failed)
      ).not.toBeInTheDocument()
    })
    test("while downloading", () => {
      const extraProps: Partial<Props> = {
        openState: ImportContactsFlowState.DownloadingError,
      }
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(ImportContactsFlowTestIds.DownloadingError)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Start)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Downloading)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.SelectingEmpty)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Selecting)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.ParsingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.AuthorizationError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Importing)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Success)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Failed)
      ).not.toBeInTheDocument()
    })
    test("while authorization", () => {
      const extraProps: Partial<Props> = {
        openState: ImportContactsFlowState.AuthorizationError,
      }
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(ImportContactsFlowTestIds.AuthorizationError)
      ).toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Start)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Downloading)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.DownloadingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.SelectingEmpty)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Selecting)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.ParsingError)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Importing)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Success)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(ImportContactsFlowTestIds.Failed)
      ).not.toBeInTheDocument()
    })
  })
})
