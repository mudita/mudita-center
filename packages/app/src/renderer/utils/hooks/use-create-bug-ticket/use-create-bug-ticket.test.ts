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
import mockCreateFreshdeskTicket from "App/renderer/utils/create-freshdesk-ticket/mock-create-freshdesk-ticket"
import { DependencyUseCreateBugTicket } from "Renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket"
import { FreshdeskTicketData } from "App/renderer/utils/create-freshdesk-ticket/create-freshdesk-ticket"

const defaultDependency = ({
  getAppLogs: jest.fn().mockReturnValue(Promise.resolve("")),
  archiveFiles: jest.fn().mockReturnValue(new Buffer("")),
  getDeviceLogFiles: jest
    .fn()
    .mockReturnValue(
      Promise.resolve({ status: DeviceResponseStatus.Ok, data: [] })
    ),
  createFreshdeskTicket: mockCreateFreshdeskTicket,
} as unknown) as DependencyUseCreateBugTicket

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
  const useCreateBugTicket = build({
    createFreshdeskTicket: jest.fn().mockReturnValue(Promise.reject()),
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
        "message": "Create Bug Ticket - Bad Request",
      },
      "status": "error",
    }
  `)
  expect(response.error).toMatchObject(result.current[ResultKey.Error] || {})
  expect(result.current[ResultKey.Load]).toBeFalsy()
})

test("request return properly error in archiveFiles error", async () => {
  let pendingResponse = Promise.resolve({} as CreateBugTicketResponse)
  const useCreateBugTicket = build({
    archiveFiles: jest.fn().mockReturnValue(Promise.resolve(undefined)),
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
        "message": "Create Bug Ticket - ArchiveFiles error",
      },
      "status": "error",
    }
  `)
  expect(response.error).toMatchObject(result.current[ResultKey.Error] || {})
  expect(result.current[ResultKey.Load]).toBeFalsy()
})
