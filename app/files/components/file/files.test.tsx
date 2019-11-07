import { mount } from "enzyme"
import "jest-styled-components"
import * as React from "react"
import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"
import { getInitialState } from "../../reducers/files.reducer"
import Files, { FilesIntro, FilesTitle } from "./files.component"

const mockStore = configureMockStore()
let store: any
let wrapper: any

beforeEach(() => {
  store = mockStore({ files: getInitialState() })
  wrapper = mount(
    <Provider store={store}>
      <Files />
    </Provider>
  )
})

test("shows files intro", () => {
  const intro = wrapper.find(FilesIntro)
  expect(intro.text()).toEqual("File list below")
})

test("title state be empty", () => {
  const title = wrapper.find(FilesTitle)
  expect(title.text()).toEqual("")
})
