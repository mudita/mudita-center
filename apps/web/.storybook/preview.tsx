/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Preview } from "@storybook/react"
import { AppThemeProvider } from "app-theme/feature"

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
    },
    viewport: {
      viewports: [],
    },
    actions: { argTypesRegex: "^on.*" },
  },
  decorators: [
    (Story) => (
      <AppThemeProvider>
        <Story />
      </AppThemeProvider>
    ),
  ],
}

export default preview
