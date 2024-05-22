/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType, View } from "generic-view/utils"
import { z } from "zod"

export interface DetailListTextData {
  text: string
}

export interface DetailListModalData {
  text: string
}

type DetailListFieldData = DetailListTextData | DetailListModalData

interface UpdateTileData {
  version: string
  text: string
}

interface IconTextRowData {
  icon: IconType
  text: string
  subText?: string
}

type TileListFieldData = IconTextRowData

export type TileListData = Record<string, TileListFieldData>

type OverviewSectionsData = TileListData | UpdateTileData

export type AboutData = Record<string, DetailListFieldData>

const keyToCheckForBaseOverview = [
  "icon-text",
  "overview-os-version",
  "block-box",
]
const keyToCheckForAboutOverview = ["about-data-box", "text-formatted"]
const keyToCheckForOverview = [
  ...keyToCheckForBaseOverview,
  ...keyToCheckForAboutOverview,
]

const getValidatorByComponentName = (component: string) => {
  switch (component) {
    case "about-data-box":
      return z.object({
        text: z.string().optional(),
      })
    case "text-formatted":
      return z.object({
        text: z.string().optional(),
      })
    case "icon-text":
      return z.object({
        icon: z.nativeEnum(IconType),
        text: z.string(),
        subText: z.string().optional(),
      })
    case "overview-os-version":
      return z.object({
        text: z.string(),
        version: z.string(),
      })
    case "block-box":
      return z
        .object({
          badgeText: z.string(),
        })
        .optional()
    default:
      return null
  }
}
const fixKeyName = (key: string) => {
  return key.replace("modal-content", "").replace("updateversion", "update")
}

export const OverviewDataBaseValidator = (config: View) => {
  const keys = Object.entries(config)
    .map(([key, value]) => {
      if (keyToCheckForOverview.includes(value.component)) {
        return { key, component: value.component }
      }
      return null
    })
    .filter(Boolean)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const validator = keys.reduce((acc, item) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (!item) return acc
    const { key, component } = item

    const cleanKey = fixKeyName(key)
    const validator = getValidatorByComponentName(component)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      ...acc,
      ...(validator ? { [cleanKey]: validator } : undefined),
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as any)
  return z.object(validator)
}

export const OverviewDataValidator = (
  overviewConfig: View,
  aboutConfig: View
) => {
  const baseShape = OverviewDataBaseValidator(overviewConfig)
  const aboutShape = OverviewDataBaseValidator(aboutConfig)

  return z.object({
    summary: z
      .object({
        about: aboutShape.optional(),
      })
      .optional(),
    sections: baseShape.optional(),
  })
}

export interface OverviewData {
  summary?: {
    about?: AboutData
  }
  sections?: Record<string, OverviewSectionsData>
}
