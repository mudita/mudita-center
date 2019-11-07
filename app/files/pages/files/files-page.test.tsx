import { shallow, ShallowWrapper } from "enzyme"
import "jest-styled-components"
import * as React from "react"
import FilesPage from "./files.page"

let wrapper: ShallowWrapper
const FilesPageAny = FilesPage as any

beforeEach(() => {
  wrapper = shallow(<FilesPageAny />)
})

test("matches snapshot", () => {
  expect(wrapper.dive()).toMatchSnapshot()
})
