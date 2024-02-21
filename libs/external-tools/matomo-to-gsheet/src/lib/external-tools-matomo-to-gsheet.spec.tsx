import { render } from "@testing-library/react"

import ExternalToolsMatomoToGsheet from "./external-tools-matomo-to-gsheet"

describe("ExternalToolsMatomoToGsheet", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ExternalToolsMatomoToGsheet />)
    expect(baseElement).toBeTruthy()
  })
})
