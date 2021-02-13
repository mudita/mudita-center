import { storiesOf } from "@storybook/react"
import * as React from "react"
import { Router } from "react-router"
import {
  fakeDataWithoutUrl,
  fakeDataWithUrl,
} from "Renderer/modules/filesManager/components/fake-data"
import FilesSummaryItem from "Renderer/modules/filesManager/components/files-summary-item.component"
import history from "Renderer/routes/history"

storiesOf("Components/FilesSummaryItem", module)
  .add("With url provided", () => {
    return (
      <Router history={history}>
        <FilesSummaryItem {...fakeDataWithUrl} />
      </Router>
    )
  })
  .add("Without url provided", () => {
    return (
      <Router history={history}>
        <FilesSummaryItem {...fakeDataWithoutUrl} />
      </Router>
    )
  })
