/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PureV1Formatter } from "./pure-v1.formatter"
import { Endpoint, Method, RequestConfig, ResponseStatus } from "../device"

const contact = {
  address: "6 Czeczota St.02600 Warsaw",
  altName: "Boligłowa",
  blocked: false,
  favourite: true,
  id: 19,
  numbers: ["123123213123"],
  priName: "Alek",
}

const getResponse = {
  status: ResponseStatus.Ok,
  body: {
    entries: [contact, contact],
    totalCount: 2,
  },
  endpoint: Endpoint.Contacts,
  uuid: 3227,
}

const postOrPutResponse = {
  status: ResponseStatus.Ok,
  body: contact,
  endpoint: Endpoint.Contacts,
  uuid: 3227,
}

const updateErrorResponse = {
  status: ResponseStatus.BadRequest,
  endpoint: Endpoint.Update,
  error: {
    code: 12,
    message:
      "prepareRoot ff_deltree on /sys/previous caused an error filesystem error: cannot remove all: Directory not empty [/sys/previous]",
  },
}

const requestConfig: RequestConfig = {
  body: {
    id: "123",
  },
  endpoint: Endpoint.Contacts,
  filePath: "/example/filepath",
  method: Method.Post,
}

let formatter: PureV1Formatter

beforeEach(() => (formatter = new PureV1Formatter()))

test("should  post", () => {
  const { body } = formatter.formatRequestConfig(requestConfig)
  expect(typeof body.id).toBe("number")
})

test("should delete ", () => {
  const { body } = formatter.formatRequestConfig({
    ...requestConfig,
    method: Method.Delete,
  })
  expect(typeof body.id).toBe("number")
})

test("should get ", () => {
  const { body } = formatter.formatRequestConfig({
    ...requestConfig,
    method: Method.Get,
  })
  expect(typeof body.id).toBe("string")
})

test("formatResponse handles response correctly", () => {
  const result = formatter.formatResponse(Method.Get, getResponse)
  expect(typeof result.body.entries[0].id).toBe("string")
})

test("body's id is returned as a string in POST method in format response", () => {
  const { body } = formatter.formatResponse(Method.Post, postOrPutResponse)
  expect(typeof body.id).toBe("string")
})

test("body's id is returned as a string in PUT method in format response", () => {
  const { body } = formatter.formatResponse(Method.Put, postOrPutResponse)
  expect(typeof body.id).toBe("string")
})

test("correct error is returned when formatting", () => {
  const result = formatter.formatResponse(Method.Post, updateErrorResponse)
  expect(result.error?.code).toEqual(1012)
})

test("entries id in get response is returned as a string", () => {
  const result = formatter.handleContactEndpointResponse(
    Method.Get,
    getResponse
  )
  expect(typeof result.body.entries[0].id).toBe("string")
})

test("body's id is returned as a string in POST method", () => {
  const { body } = formatter.handleContactEndpointResponse(
    Method.Post,
    postOrPutResponse
  )
  expect(typeof body.id).toBe("string")
})

test("body's id is returned as a string in PUT method ", () => {
  const { body } = formatter.handleContactEndpointResponse(
    Method.Put,
    postOrPutResponse
  )
  expect(typeof body.id).toBe("string")
})

test("correct error is returned when input is directly passed to the handler", () => {
  const result = formatter.handleUpdateEndpointResponse(
    Method.Post,
    updateErrorResponse
  )
  expect(result.error?.code).toEqual(1012)
})
