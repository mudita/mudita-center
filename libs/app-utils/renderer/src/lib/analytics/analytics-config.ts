/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const analyticsConfig = {
  enabled: import.meta.env.VITE_ANALYTICS_ENABLED === "1",
  apiUrl: import.meta.env.VITE_ANALYTICS_API_URL ?? "",
  siteId: Number(import.meta.env.VITE_ANALYTICS_API_SITE_ID),
}
