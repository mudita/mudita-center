/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import ThreadDetailsTextArea from "App/messages/components/thread-details-text-area.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ThreadDetailsTextAreaTestIds } from "App/messages/components/thread-details-text-area-tests-ids"
import { fireEvent } from "@testing-library/dom"

type Props = ComponentProps<typeof ThreadDetailsTextArea>

const defaultProps: Props = {
  value: "",
  onAttachContactClick: jest.fn(),
  onChange: jest.fn(),
  onSendClick: jest.fn(),
  onAttachTemplateClick: jest.fn(),
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<ThreadDetailsTextArea {...props} />)
}

describe("Thread Details Text Area Component", () => {
  test("component emit onChange event when value in input is changed", () => {
    const onChange = jest.fn()
    const { queryByTestId } = render({ onChange })
    fireEvent.change(
      queryByTestId(ThreadDetailsTextAreaTestIds.Input) as HTMLElement,
      { target: { value: "a" } }
    )
    expect(onChange).toHaveBeenCalled()
  })

  test("component no emit onChange event when enter value in input is pressed", () => {
    const onChange = jest.fn()
    const { queryByTestId } = render({ onChange })
    fireEvent.keyDown(
      queryByTestId(ThreadDetailsTextAreaTestIds.Input) as HTMLElement,
      {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
      }
    )
    expect(onChange).not.toHaveBeenCalled()
  })

  describe("when value passed is empty string", () => {
    const extraProps: Partial<Props> = { value: "" }

    test("Send Button isn't visible", () => {
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(ThreadDetailsTextAreaTestIds.SendButton)
      ).not.toBeInTheDocument()
    })

    test("component no emit onSendClick event when enter is pressed", () => {
      const onSendClick = jest.fn()
      const { queryByTestId } = render({ ...extraProps, onSendClick })
      fireEvent.keyDown(
        queryByTestId(ThreadDetailsTextAreaTestIds.Input) as HTMLElement,
        {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          charCode: 13,
        }
      )
      expect(onSendClick).not.toBeCalled()
    })
  })

  describe("when value has 1 char or more", () => {
    const extraProps: Partial<Props> = { value: "a" }

    test("Send Button is visible", () => {
      const { queryByTestId } = render(extraProps)
      expect(
        queryByTestId(ThreadDetailsTextAreaTestIds.SendButton)
      ).toBeInTheDocument()
    })

    test("component emit onSendClick event when Send Button is clicked", () => {
      const onSendClick = jest.fn()
      const { queryByTestId } = render({ ...extraProps, onSendClick })
      fireEvent.click(
        queryByTestId(ThreadDetailsTextAreaTestIds.SendButton) as HTMLElement
      )
      expect(onSendClick).toBeCalled()
    })

    test("component emit onSendClick event when enter is pressed", () => {
      const onSendClick = jest.fn()
      const { queryByTestId } = render({ ...extraProps, onSendClick })
      fireEvent.keyDown(
        queryByTestId(ThreadDetailsTextAreaTestIds.Input) as HTMLElement,
        {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          charCode: 13,
        }
      )
      expect(onSendClick).toBeCalled()
    })

    test("component no emit onSendClick event when enter is pressed with shiftKey", () => {
      const onSendClick = jest.fn()
      const { queryByTestId } = render({ ...extraProps, onSendClick })
      fireEvent.keyDown(
        queryByTestId(ThreadDetailsTextAreaTestIds.Input) as HTMLElement,
        {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          charCode: 13,
          shiftKey: true,
        }
      )
      expect(onSendClick).not.toBeCalled()
    })
  })
})
