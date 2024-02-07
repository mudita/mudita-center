/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

module.exports = {
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
    listen: () => jest.fn(),
    location: { pathname: "" },
  }),
}
