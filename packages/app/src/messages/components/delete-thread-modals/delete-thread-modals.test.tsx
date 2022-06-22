/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeleteThreadModals from "App/messages/components/delete-thread-modals/delete-thread-modals.component"
import { DeleteThreadModalsTestIds } from "App/messages/components/delete-thread-modals/delete-thread-modals.enum"
import { ThreadDeletingState } from "App/messages/constants"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React, { ComponentProps } from "react"

type Props = ComponentProps<typeof DeleteThreadModals>

const renderer = (extraProps?: Partial<Props>) => {
  const props: Props = {
    deletedThreads: ["thread one"],
    hideDeleteModal: noop,
    threadDeletingState: null,
    ...extraProps,
  }

  return renderWithThemeAndIntl(<DeleteThreadModals {...props} />)
}

describe("when thread deleting state is null", () => {
  test("deleting modals are not showed", () => {
    const { queryByTestId } = renderer()

    expect(
      queryByTestId(DeleteThreadModalsTestIds.SuccessThreadDelete)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.ThreadDeleting)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.FailThreadDelete)
    ).not.toBeInTheDocument()
  })
})

describe("when thread deleting state equals to success", () => {
  test("only success popup is shown", () => {
    const { queryByTestId } = renderer({
      threadDeletingState: ThreadDeletingState.Success,
    })

    expect(
      queryByTestId(DeleteThreadModalsTestIds.SuccessThreadDelete)
    ).toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.ThreadDeleting)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.FailThreadDelete)
    ).not.toBeInTheDocument()
  })

  test("sets 'singular' info message when only one thread is deleted", () => {
    const { getByText } = renderer({
      threadDeletingState: ThreadDeletingState.Success,
      deletedThreads: ["thread one"],
    })

    expect(
      getByText("[value] module.messages.conversationDelete")
    ).toBeInTheDocument()
  })

  test("sets 'plural' info message when only one thread is deleted", () => {
    const { getByText } = renderer({
      threadDeletingState: ThreadDeletingState.Success,
      deletedThreads: ["thread one", "thread two"],
    })

    expect(
      getByText("[value] module.messages.conversationsDelete")
    ).toBeInTheDocument()
  })
})

describe("when thread deleting state equals to loading state", () => {
  test("only loading modal is shown", () => {
    const { queryByTestId } = renderer({
      threadDeletingState: ThreadDeletingState.Deleting,
    })

    expect(
      queryByTestId(DeleteThreadModalsTestIds.SuccessThreadDelete)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.ThreadDeleting)
    ).toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.FailThreadDelete)
    ).not.toBeInTheDocument()
  })
})

describe("when thread deleting state equals to failure", () => {
  test("only failure modal is shown", () => {
    const { queryByTestId } = renderer({
      threadDeletingState: ThreadDeletingState.Fail,
    })

    expect(
      queryByTestId(DeleteThreadModalsTestIds.SuccessThreadDelete)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.ThreadDeleting)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(DeleteThreadModalsTestIds.FailThreadDelete)
    ).toBeInTheDocument()
  })
})
