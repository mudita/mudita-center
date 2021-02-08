/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export const URL_MAIN = {
  root: "/",
  news: "/news",
  overview: "/overview",
  messages: "/messages",
  phone: "/phone",
  contacts: "/contacts",
  music: "/music",
  calendar: "/calendar",
  tools: "/tools",
  meditation: "/meditation",
  filesManager: "/files-manager",
  tethering: "/tethering",
  settings: "/settings",
  help: "/help",
  error: "/error",
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
  backup: "/backup",
} as const

export const URL_ONBOARDING = {
  root: "/onboarding",
  welcome: "/onboarding/welcome",
  connecting: "/onboarding/connecting",
  troubleshooting: "/onboarding/troubleshooting",
} as const

export const URL_RECOVERY_MODE = {
  root: "/recovery-mode",
} as const
