/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "app-theme/models"
import { BackupSectionConfig } from "../endpoints/feature/mc-overview-config"

export interface McOverview {
  title: string
  summary: {
    imgVariant?: string
    serialNumber?: {
      label?: string
      value: string
    }
    deviceVersion?: {
      label?: string
      value: string
    }
    about?: {
      button: {
        icon: IconType
        text: string
      }
    }
  }
  status?: {
    title: string
    badgeText?: string
    fields: {
      icon: IconType
      text: string
      subText?: string
    }[]
  }
  backup?: {
    title: string
    backupFeatures: BackupSectionConfig["backupFeatures"]
    restoreFeatures: BackupSectionConfig["restoreFeatures"]
  }
  update?: {
    title: string
    version: {
      label: string
      value?: string
    }
    badgeText?: string
  }
  about?: {
    title: string
    subTitle?: string
    fields: (
      | {
          type: "text"
          title: string
          value: string
        }
      | {
          type: "modal"
          title: string
          value: string
          buttonText: string
        }
    )[]
  }
}
