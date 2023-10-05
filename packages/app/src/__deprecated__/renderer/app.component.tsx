/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { hot } from "react-hot-loader"

import history from "App/__deprecated__/renderer/routes/history"
import store from "App/__deprecated__/renderer/store"
// import { store } from "App/__deprecated__/renderer/store/test"
import RootWrapper from "App/__deprecated__/renderer/wrappers/root-wrapper"
import { Provider } from "react-redux"
import TestZZZ from "./test-zzz"

const TestYYY = () => {
  return <div>test yyy</div>
}

const App = () => (
  // <Provider store={store}>
  //   <>
  //     {/* <div>czy to widac?</div> */}
  //     {/* <RootWrapper history={history} /> */}
  //     <TestYYY />
  //   </>
  // </Provider>
  // <TestXXX />
  <Provider store={store}>
    <RootWrapper history={history} />
  </Provider>
)

export default hot(module)(App)
