/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const PRIMARY_BUTTON_TEST_ID = "primary-button"

export const getPrimaryButtonTestId = (componentId: string) => {
  return `${PRIMARY_BUTTON_TEST_ID}-${componentId}`
}
