import "@testing-library/jest-dom/extend-expect"
import {
  flattenRows,
  getRowChildren,
  groupRows,
} from "Renderer/components/core/table/table.helpers"

const basicRows = [
  {
    name: "Foo",
    label: "F",
  },
  {
    name: "Bar",
    label: "B",
  },
  {
    name: "Baz",
    label: "B",
  },
]

test("rows grouping works properly", () => {
  expect(groupRows(basicRows, "label")).toMatchObject({
    F: [{ name: "Foo", label: "F" }],
    B: [
      { name: "Bar", label: "B" },
      { name: "Baz", label: "B" },
    ],
  })
})

const nestedRows = [
  {
    path: "Foo",
    selected: false,
  },
  {
    path: "Bar",
    items: [
      {
        path: "Bar/Foo",
        selected: true,
      },
      {
        path: "Bar/Bar",
        selected: true,
      },
      {
        path: "Bar/Baz",
        selected: false,
      },
    ],
  },
  {
    path: "Baz",
    items: [
      {
        path: "Baz/Foo",
        selected: true,
      },
    ],
  },
]

test("getting row children works properly", () => {
  expect(getRowChildren(nestedRows[1], "items")).toMatchObject([
    { path: "Bar/Foo", selected: true },
    { path: "Bar/Bar", selected: true },
    { path: "Bar/Baz", selected: false },
  ])
})

test("flatting sub-rows of given rows works properly", () => {
  expect(flattenRows(nestedRows, "items")).toMatchObject([
    { path: "Foo", selected: false },
    { path: "Bar/Foo", selected: true },
    { path: "Bar/Bar", selected: true },
    { path: "Bar/Baz", selected: false },
    { path: "Baz/Foo", selected: true },
  ])
})
