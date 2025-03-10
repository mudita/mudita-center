/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as ReactDOM from "react-dom/client"
import App from "./app/app"
import { Providers } from "./providers"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Providers>
    <App />
  </Providers>
)
