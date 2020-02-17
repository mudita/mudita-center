import { storiesOf } from "@storybook/react"
import React from "react"
import Overview from "Renderer/modules/overview/overview.container"
import { Provider } from "react-redux"
import store from "Renderer/store"

storiesOf("Views|Overview", module).add("Overview", () => (
  <div style={{ maxWidth: "63rem" }}>
    <Provider store={store}>
      <Overview />
    </Provider>
  </div>
))
