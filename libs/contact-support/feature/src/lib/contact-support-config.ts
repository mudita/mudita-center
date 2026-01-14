/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const TMP_LOGS_SCOPE_PATH = "tmp-customer-support-logs"

export const contactSupportConfig = {
  apiUrl: import.meta.env.VITE_FRESHDESK_API_URL ?? "",
  apiToken: import.meta.env.VITE_FRESHDESK_API_TOKEN ?? "",
  tmpLogsScopePath: TMP_LOGS_SCOPE_PATH,
  tmpLogsDirScopePath: `${TMP_LOGS_SCOPE_PATH}/logs`,
}
