import { noop } from "Renderer/utils/noop"

test("noop should return undefined", () => {
  expect(noop()).toBeUndefined()
})
