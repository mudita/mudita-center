/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook } from "@testing-library/react-hooks"
import useCreateBugTicket, {
  CreateBugTicket,
} from "Renderer/modules/overview/use-create-bug-ticket"

test("request works properly", async () => {
  const {
    result: { current },
  } = renderHook<undefined, CreateBugTicket>(() => useCreateBugTicket())
  const response = await current.sendRequest({
    email: "mudita@center.com",
    subject: "Error - UpdateOS_1000",
    description: "description",
  })

  expect(response).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
})
