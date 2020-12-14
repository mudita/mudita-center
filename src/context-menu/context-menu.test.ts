import { fireEvent } from "@testing-library/react"
import ContextMenu from "App/context-menu/context-menu"

const menuPopupMock = jest.fn()
const menuAppendMock = jest.fn()

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: menuPopupMock,
      append: menuAppendMock,
    }),
    MenuItem: () => jest.fn(),
  },
}))

test("contextmenu event listener is added on ContextMenu init", () => {
  const menu = new ContextMenu()
  menu.init()
  fireEvent.contextMenu(window)
  expect(menuAppendMock).toHaveBeenCalled()
  expect(menuPopupMock).toHaveBeenCalled()
})
