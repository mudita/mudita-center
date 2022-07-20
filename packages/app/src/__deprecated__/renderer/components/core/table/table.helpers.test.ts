/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import { getRowChildren } from "App/__deprecated__/renderer/components/core/table/table.helpers"

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
  expect(getRowChildren(nestedRows[1], "items")).toMatchInlineSnapshot(`
    Array [
      Object {
        "path": "Bar/Foo",
        "selected": true,
      },
      Object {
        "path": "Bar/Bar",
        "selected": true,
      },
      Object {
        "path": "Bar/Baz",
        "selected": false,
      },
    ]
  `)
})
