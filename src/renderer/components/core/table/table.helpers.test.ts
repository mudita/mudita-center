import "@testing-library/jest-dom/extend-expect"
import {
  flattenRows,
  getRowChildren,
} from "Renderer/components/core/table/table.helpers"

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
