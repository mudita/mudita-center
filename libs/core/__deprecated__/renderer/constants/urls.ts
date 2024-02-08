/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const URL_MAIN = {
  root: "/",
  news: "/news",
  messages: "/messages",
  phone: "/phone",
  contacts: "/contacts",
  music: "/music",
  tools: "/tools",
  meditation: "/meditation",
  filesManager: "/files-manager",
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
  calls: "/calls",
  dial: "/dial",
  playlist: "/playlist",
  voiceRecorder: "/voice-recorder",
  notes: "/notes",
  connection: "/connection",
  notifications: "/notifications",
  audioConversion: "/audio-conversion",
  about: "/about",
} as const

export const URL_ONBOARDING = {
  root: "/onboarding",
  welcome: "/onboarding/welcome",
  connecting: "/onboarding/connecting",
  troubleshooting: "/onboarding/troubleshooting",
} as const

export const URL_DISCOVERY_DEVICE = {
  root: "/discovery-device",
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
