import contextMenu from "App/context-menu/context-menu"
import { fireEvent } from "@testing-library/react"

const menuPopupMock = jest.fn()
const menuAppendMock = jest.fn()
const menuItemMock = jest.fn()

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: menuPopupMock,
      append: menuAppendMock,
    }),
    MenuItem: () => menuItemMock(),
  },
}))

test("contextmenu event listener is added on ContextMenu init", () => {
  fireEvent.contextMenu(window)
  expect(menuAppendMock).toHaveBeenCalledTimes(3)
  expect(menuPopupMock).toHaveBeenCalledTimes(1)
})

test("contextMenu registers new item properly", async () => {
  contextMenu.registerItem("Test", {
    label: "Test item 1",
  })
  expect(contextMenu["customMenu"]).toStrictEqual({
    Test: [
      {
        devModeOnly: true,
        label: "Test item 1",
      },
    ],
  })
})

test("contextMenu registers always visible item properly", async () => {
  contextMenu.registerItem("Always visible", {
    label: "Test item 1",
    devModeOnly: false,
  })
  expect(contextMenu["customMenu"]).toStrictEqual({
    "Always visible": [
      {
        devModeOnly: false,
        label: "Test item 1",
      },
    ],
    Test: [
      {
        devModeOnly: true,
        label: "Test item 1",
      },
    ],
  })
})

test("contextMenu registers multiple items properly", async () => {
  contextMenu.registerItems("Test 2", [
    {
      label: "Test item 1",
    },
    {
      label: "Test item 2",
    },
  ])

  expect(contextMenu["customMenu"]).toStrictEqual({
    "Always visible": [
      {
        devModeOnly: false,
        label: "Test item 1",
      },
    ],
    Test: [
      {
        devModeOnly: true,
        label: "Test item 1",
      },
    ],
    "Test 2": [
      {
        devModeOnly: true,
        label: "Test item 1",
      },
      {
        devModeOnly: true,
        label: "Test item 2",
      },
    ],
  })
})

test("contextMenu informs about duplicates when registering menu items", async () => {
  console.warn = jest.fn()

  contextMenu.registerItem("Test 3", {
    label: "Test item 1",
  })
  contextMenu.registerItem("Test 3", {
    label: "Test item 1",
  })

  expect(console.warn).toHaveBeenCalledWith(
    `Duplicate found during registering custom context menu items. "Test 3" > "Test item 1" already exists.`,
  )
})
