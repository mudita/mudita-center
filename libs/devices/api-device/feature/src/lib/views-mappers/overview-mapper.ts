/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  McOverview,
  McOverviewConfigResponse,
  McOverviewDataResponse,
} from "devices/api-device/models"
import { IconType } from "app-theme/models"

export const mapOverviewFeature = (
  data: McOverviewDataResponse,
  config: McOverviewConfigResponse
): McOverview => {
  return {
    title: config.title,
    summary: {
      ...(config.summary.showImg && {
        imgVariant: config.summary.imgVariant,
      }),
      ...(config.summary.showSerialNumber && {
        serialNumber: {
          label: config.summary.serialNumberLabel,
          value: data.summary?.about?.serialNumber.text as string,
        },
      }),
      ...(config.summary.showDeviceVersion && {
        deviceVersion: {
          label: config.summary.deviceVersionLabel,
          value: data.summary?.about?.deviceVersion.text as string,
        },
      }),
      ...(config.summary.showAbout && {
        about: {
          button: {
            icon: config.summary.aboutIcon as IconType,
            text: config.summary.aboutTitle as string,
          },
        },
      }),
    },
    ...config.sections?.reduce((acc, section) => {
      if (section.type === "tile-list") {
        acc["status"] = {
          title: section.title,
          badgeText: data.sections?.[section.dataKey]?.badgeText,
          fields: section.fields
            .filter((field) => {
              return data.sections?.[field.dataKey]?.show
            })
            .map((field) => {
              if (field.type === "icon-text") {
                const item = data.sections?.[field.dataKey]
                return {
                  icon: item?.icon,
                  text: item?.text,
                  subText: item?.subText,
                }
              }
              return null
            })
            .filter(Boolean) as NonNullable<McOverview["status"]>["fields"],
        }
      }
      if (section.type === "mc-overview-backup") {
        acc["backup"] = {
          title: section.title,
          backupFeatures: section.backupFeatures,
          restoreFeatures: section.restoreFeatures,
        }
      }
      if (section.type === "mc-overview-update") {
        acc["update"] = {
          title: section.title,
          version: {
            label: section.versionLabel,
            value: data.sections?.[section.dataKey]?.text,
          },
          ...(section.showBadge && {
            badgeText: data.sections?.[section.dataKey]?.badgeText,
          }),
        }
      }
      return acc
    }, {} as McOverview),
    about: config.summary.showAbout
      ? {
          title: config.summary.aboutTitle as string,
          subTitle: config.summary.aboutSubtitle,
          fields: (config.summary.aboutFields
            ?.map((field) => {
              if (field.type === "detail-list-text") {
                return {
                  type: "text",
                  title: field.title,
                  value: data.summary?.about?.[field.dataKey]?.text,
                }
              }
              if (field.type === "detail-list-modal") {
                return {
                  type: "modal",
                  title: field.title,
                  buttonText: field.buttonText,
                  value: data.summary?.about?.[field.dataKey]?.text,
                }
              }
              return null
            })
            .filter(Boolean) || []) as NonNullable<
            McOverview["about"]
          >["fields"],
        }
      : undefined,
  }
}
