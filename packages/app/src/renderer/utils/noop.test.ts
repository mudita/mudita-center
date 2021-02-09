/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { asyncNoop, noop } from "Renderer/utils/noop"

const testArr = [1, 2, 3]

test("noop should return undefined", () => {
  expect(noop()).toBeUndefined()
})

test("passed arg returns undefined", () => {
  expect(noop(...testArr)).toBeUndefined()
})

test("apply/bind/call return undefined", () => {
  expect(noop.apply({}, testArr)).toBeUndefined()
  expect(noop.bind({}, ...testArr)()).toBeUndefined()
  expect(noop.call({}, ...testArr)).toBeUndefined()
})

test("async noop should return undefined", async () => {
  expect(await asyncNoop()).toBeUndefined()
})

test("passed arg returns undefined", async () => {
  expect(await asyncNoop(...testArr)).toBeUndefined()
})

test("apply/bind/call return undefined", async () => {
  expect(await asyncNoop.apply({}, testArr)).toBeUndefined()
  expect(await asyncNoop.bind({}, ...testArr)()).toBeUndefined()
  expect(await asyncNoop.call({}, ...testArr)).toBeUndefined()
})
