import { render } from "@testing-library/react"

import MscFlashHarmony from "./msc-flash-harmony"

describe("MscFlashHarmony", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MscFlashHarmony />)
    expect(baseElement).toBeTruthy()
  })
})
