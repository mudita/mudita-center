/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Provider } from "react-redux"
import history from "Core/core/routes/history"
import store from "Core/__deprecated__/renderer/store"
import RootWrapper from "Core/core/components/root-wrapper"

const App = () => (
  <Provider store={store}>
    <RootWrapper history={history} />
  </Provider>
)

export default App
