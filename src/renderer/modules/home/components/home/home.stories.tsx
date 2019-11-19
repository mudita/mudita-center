import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import * as React from "react"
import HomeView from "./home-view.component"

storiesOf("Home|Home", module).add("default", () => {
  return <HomeView onTitleClick={action("Click")} count={10} />
})
