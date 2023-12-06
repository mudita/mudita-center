/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"

import history from "Core/__deprecated__/renderer/routes/history"
import store from "Core/__deprecated__/renderer/store"
import RootWrapper from "Core/__deprecated__/renderer/wrappers/root-wrapper"
import { Provider } from "react-redux"
const App = () => (
  <Provider store={store}>
    <RootWrapper history={history} />
  </Provider>
)

export default App
