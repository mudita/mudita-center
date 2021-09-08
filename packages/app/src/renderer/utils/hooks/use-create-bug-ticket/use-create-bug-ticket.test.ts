/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook, act } from "@testing-library/react-hooks"
import useCreateBugTicketBuilder, {
  CreateBugTicket,
  CreateBugTicketResponse,
} from "Renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket-builder"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import mockCreateFreshdeskTicket, {
  errorResponse,
} from "App/renderer/utils/create-freshdesk-ticket/mock-create-freshdesk-ticket"
import { DependencyUseCreateBugTicket } from "Renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket"
import { FreshdeskTicketData } from "App/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"

const defaultDependency = {
  writeFile: jest.fn().mockReturnValue(Promise.resolve(true)),
  writeGzip: jest.fn().mockReturnValue(Promise.resolve(true)),
  getAppPath: jest.fn().mockReturnValue(""),
  getAppLogs: jest.fn().mockReturnValue(Promise.resolve("")),
  getDeviceLogFiles: jest
    .fn()
    .mockReturnValue(
      Promise.resolve({ status: DeviceResponseStatus.Ok, data: [] })
    ),
  createFile: jest.fn().mockReturnValue({} as File),
  rmdir: jest.fn().mockReturnValue(Promise.resolve(true)),
  createFreshdeskTicket: mockCreateFreshdeskTicket,
} as unknown as DependencyUseCreateBugTicket

const data: Omit<FreshdeskTicketData, "type" | "attachments"> = {
  email: "mudita@center.com",
  subject: "Error - UpdateOS_1000",
  description: "description",
}

enum ResultKey {
  SendRequest,
  Load,
  Error,
}

const build = (extraDependency?: Partial<DependencyUseCreateBugTicket>) => {
  return useCreateBugTicketBuilder({ ...defaultDependency, ...extraDependency })
}

test("request works properly", async () => {
  let pendingResponse = Promise.resolve({} as CreateBugTicketResponse)
  const useCreateBugTicket = build()
  const { result, waitForNextUpdate } = renderHook<undefined, CreateBugTicket>(
    () => useCreateBugTicket()
  )

  act(() => {
    pendingResponse = result.current[ResultKey.SendRequest](data)
  })
  expect(result.current[ResultKey.Load]).toBeTruthy()
  await waitForNextUpdate()
  const response = await pendingResponse

  expect(result.current[ResultKey.Load]).toBeFalsy()
  expect(response).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
})

test("request works properly even getDeviceLogs throw error", async () => {
  let pendingResponse = Promise.resolve({} as CreateBugTicketResponse)
  const useCreateBugTicket = build({
    getDeviceLogFiles: jest
      .fn()
      .mockReturnValue(Promise.resolve({ status: DeviceResponseStatus.Error })),
  })

  const { result, waitForNextUpdate } = renderHook<undefined, CreateBugTicket>(
    () => useCreateBugTicket()
  )
  act(() => {
    pendingResponse = result.current[ResultKey.SendRequest](data)
  })
  await waitForNextUpdate()
  const response = await pendingResponse

  expect(response).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
  expect(result.current[ResultKey.Load]).toBeFalsy()
})

test("request return error when createFreshdeskTicket throw error", async () => {
  let pendingResponse = Promise.resolve({} as CreateBugTicketResponse)
  const rmdir = jest.fn()
  const useCreateBugTicket = build({
    rmdir,
    createFreshdeskTicket: jest
      .fn()
      .mockReturnValue(Promise.reject({ response: errorResponse })),
  })

  const { result, waitForNextUpdate } = renderHook<undefined, CreateBugTicket>(
    () => useCreateBugTicket()
  )
  act(() => {
    pendingResponse = result.current[ResultKey.SendRequest](data)
  })
  await waitForNextUpdate()
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
  expect(response.error).toMatchObject(result.current[ResultKey.Error] || {})
  expect(rmdir).toBeCalledTimes(2)
  expect(result.current[ResultKey.Load]).toBeFalsy()
})

test("request return properly error in WriteFileSync error", async () => {
  let pendingResponse = Promise.resolve({} as CreateBugTicketResponse)
  const useCreateBugTicket = build({
    writeFile: jest.fn().mockReturnValue(Promise.resolve(false)),
  })

  const { result, waitForNextUpdate } = renderHook<undefined, CreateBugTicket>(
    () => useCreateBugTicket()
  )
  act(() => {
    pendingResponse = result.current[ResultKey.SendRequest](data)
  })
  await waitForNextUpdate()
  const response = await pendingResponse

  expect(response).toMatchInlineSnapshot(`
    Object {
      "error": Object {
        "message": "Create Bug Ticket - WriteFileSync error",
      },
      "status": "error",
    }
  `)
  expect(response.error).toMatchObject(result.current[ResultKey.Error] || {})
  expect(result.current[ResultKey.Load]).toBeFalsy()
})

test("request return properly error when createFile throw error", async () => {
  let pendingResponse = Promise.resolve({} as CreateBugTicketResponse)
  const rmdir = jest.fn()
  const useCreateBugTicket = build({
    rmdir,
    createFile: jest.fn().mockImplementation(() => {
      throw new Error()
    }),
  })

  const { result, waitForNextUpdate } = renderHook<undefined, CreateBugTicket>(
    () => useCreateBugTicket()
  )
  act(() => {
    pendingResponse = result.current[ResultKey.SendRequest](data)
  })
  await waitForNextUpdate()
  const response = await pendingResponse

  expect(response).toMatchInlineSnapshot(`
    Object {
      "error": Object {
        "message": "Create Bug Ticket - bug in creates attachments",
      },
      "status": "error",
    }
  `)
  expect(response.error).toMatchObject(result.current[ResultKey.Error] || {})
  expect(rmdir).toBeCalledTimes(2)
  expect(result.current[ResultKey.Load]).toBeFalsy()
})

test("request return properly error in writeGzip error", async () => {
  let pendingResponse = Promise.resolve({} as CreateBugTicketResponse)
  const rmdir = jest.fn()
  const useCreateBugTicket = build({
    rmdir,
    writeGzip: jest.fn().mockReturnValue(Promise.resolve(false)),
  })

  const { result, waitForNextUpdate } = renderHook<undefined, CreateBugTicket>(
    () => useCreateBugTicket()
  )
  act(() => {
    pendingResponse = result.current[ResultKey.SendRequest](data)
  })
  await waitForNextUpdate()
  const response = await pendingResponse

  expect(response).toMatchInlineSnapshot(`
    Object {
      "error": Object {
        "message": "Create Bug Ticket - writeGzip error",
      },
      "status": "error",
    }
  `)
  expect(response.error).toMatchObject(result.current[ResultKey.Error] || {})
  expect(rmdir).toBeCalledTimes(1)
  expect(result.current[ResultKey.Load]).toBeFalsy()
})
