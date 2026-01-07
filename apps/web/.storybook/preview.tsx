/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Preview } from "@storybook/react"
// @ts-expect-error module cannot be found
import { AppThemeProvider } from "app-theme/feature"
// @ts-expect-error module cannot be found
import { AppRoutingProvider } from "app-routing/feature"

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
    },
    viewport: {
      options: [],
    },
    actions: { argTypesRegex: "^on.*" },
  },
  decorators: [
    (Story) => {
      return (
        <AppRoutingProvider>
          <AppThemeProvider>
            <Story />
          </AppThemeProvider>
        </AppRoutingProvider>
      )
    },
  ],
}

export default preview
