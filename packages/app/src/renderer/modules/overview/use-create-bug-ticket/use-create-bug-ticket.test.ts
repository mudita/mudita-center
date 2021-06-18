/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook } from "@testing-library/react-hooks"
import { act } from "react-dom/test-utils"
import useCreateBugTicketBuilder, {
  CreateBugTicket,
} from "Renderer/modules/overview/use-create-bug-ticket/use-create-bug-ticket-builder"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import mockCreateFreshdeskTicket, {
  errorResponse,
} from "Renderer/modules/overview/create-freshdesk-ticket/mock-create-freshdesk-ticket"
import { DependencyUseCreateBugTicket } from "Renderer/modules/overview/use-create-bug-ticket/use-create-bug-ticket"

const defaultDependency = ({
  writeFile: jest.fn().mockReturnValue(Promise.resolve(true)),
  getAppPath: jest.fn().mockReturnValue(""),
  getAppLogs: jest.fn().mockReturnValue(Promise.resolve("")),
  getDeviceLogs: jest
    .fn()
    .mockReturnValue(
      Promise.resolve({ status: DeviceResponseStatus.Ok, data: "" })
    ),
  createFile: jest.fn().mockReturnValue({} as File),
  createFreshdeskTicket: mockCreateFreshdeskTicket,
} as unknown) as DependencyUseCreateBugTicket

const build = (extraDependency?: Partial<DependencyUseCreateBugTicket>) => {
  return useCreateBugTicketBuilder({ ...defaultDependency, ...extraDependency })
}

test("request works properly", async () => {
  const useCreateBugTicket = build()

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

test("request works properly - error", async () => {
  const useCreateBugTicket = build({
    createFreshdeskTicket: jest
      .fn()
      .mockReturnValue(Promise.reject({ response: errorResponse })),
  })

  const {
    result: { current },
    waitForNextUpdate,
  } = renderHook<undefined, CreateBugTicket>(() => useCreateBugTicket())
  const pendingResponse = current.sendRequest({
    email: "mudita@center.com",
    subject: "Error - UpdateOS_1000",
    description: "description",
  })
  await act(waitForNextUpdate)
  const response = await pendingResponse

  expect(response).toMatchInlineSnapshot(`
    Object {
      "error": Object {
        "data": Array [
          Object {
            "code": "invalid_value",
            "field": "type",
            "message": "It should be one of these values: 'Question,Incident,Problem,Feature Request,Refund,Service Task'",
          },
        ],
        "message": "Validation failed",
      },
      "status": "error",
    }
  `)
  expect(response).toMatchObject(current.error || {})
})
