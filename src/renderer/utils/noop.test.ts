import { noop } from "Renderer/utils/noop"

const testArr = [1, 2, 3]

test("noop should return undefined", () => {
  expect(noop()).toBeUndefined()
})

test("passed arg returns undefined", () => {
  expect(noop(testArr)).toBeUndefined()
})

test("apply/bind/call return undefined", () => {
  expect(noop.apply({}, testArr)).toBeUndefined()
  expect(noop.bind({}, ...testArr)()).toBeUndefined()
  expect(noop.call({}, ...testArr)).toBeUndefined()
})
