/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppFileSystemGuardOptions,
  AppHttpRequestConfig,
} from "app-utils/models"
import { AppHttp } from "app-utils/renderer"
import { contactSupportConfig } from "../contact-support-config"

export interface CreateTicketRequestPayload extends Pick<
  AppHttpRequestConfig,
  "data" | "files"
> {
  data: Record<string, string>
  files?: Record<string, AppFileSystemGuardOptions>
}

export const createTicketRequest = async ({
  data,
  files,
}: CreateTicketRequestPayload) => {
  const config: Omit<AppHttpRequestConfig, "rid"> = {
    method: "POST",
    url: `${contactSupportConfig.apiUrl}/api/v2/tickets`,
    headers: {
      Authorization: `Basic ${contactSupportConfig.apiToken}`,
    },
    data,
  }
  if (files) {
    config["files"] = files
  }
  return AppHttp.request(config)
}
