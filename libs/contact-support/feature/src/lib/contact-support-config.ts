/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const contactSupportConfig = {
  apiUrl: import.meta.env.VITE_FRESHDESK_API_URL ?? "",
  apiToken: import.meta.env.VITE_FRESHDESK_API_TOKEN ?? "",
  tmpLogsScopeRelativePath: "tmp-customer-support-logs",
}
