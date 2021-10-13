/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum Feature {
  LoggerEnabled = "logger-enabled",
  LogsScrubbed = "logs-scrubbed",
  DeveloperModeHidden = "developer-mode-hidden",
  DisabledOnProduction = "disabled-on-production",
  OsProductionReleaseAvailable = "os-production-release-available",
  OsTestProductionReleaseAvailable = "os-test-production-release-available",
  OsProductionAlphaReleaseAvailable = "os-production-alpha-release-available",
  OsTestProductionAlphaReleaseAvailable = "os-test-production-alpha-release-available",
  McPrereleaseAvailable = "mc-prerelease-available",
  PhoneLockTimer = "phone-lock-timer",
  MessagesHidden = "messages-hidden",
  PhoneColour = "phone-colour",
  PureSystem = "pure-system-button",
  MCVersion = "mc-version",
  DevelopOnly = "development-only",
  Backup = "backup",
  ProductionAndAlpha = "production-and-alpha",
}
