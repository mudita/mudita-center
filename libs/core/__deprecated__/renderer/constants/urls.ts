/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const URL_MAIN = {
  root: "/",
  news: "/news",
  messages: "/messages",
  contacts: "/contacts",
  filesManager: "/files-manager",
  manageSounds: "/manage-sounds",
  settings: "/settings",
  help: "/help",
  error: "/error",
  license: "/license",
  termsOfService: "/terms-of-service",
  privacyPolicy: "/privacy-policy",
  overviewDemo: "/overview-demo",
  apiConnectionDemo: "/api-connection-demo",
} as const

export const URL_TABS = {
  templates: "/templates",
  connection: "/connection",
  about: "/about",
} as const

export const URL_ONBOARDING = {
  root: "/onboarding",
  welcome: "/onboarding/welcome",
  troubleshooting: "/onboarding/troubleshooting",
} as const

export const URL_DISCOVERY_DEVICE = {
  root: "/discovery-device",
  deviceConnecting: "/discovery-device/device-connecting",
  availableDeviceListModal: "/discovery-device/available-device-list-modal",
}

export const URL_DEVICE_INITIALIZATION = {
  root: "/device-initialization",
}

export const URL_OVERVIEW = {
  root: "/overview",
  pureSystem: "/overview/pure-system",
  sar: "/overview/pure-system/sar",
} as const
