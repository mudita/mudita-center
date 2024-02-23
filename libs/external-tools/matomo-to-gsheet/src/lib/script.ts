/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import 'dotenv/config';
import MatomoService from "./matomo/matomo.service"
import GoogleSheetFactory from "./google-sheet/google-sheet.factory"
import StatsSheetService from "./google-sheet/stats-sheet.service"
import getYesterdayDateString from "./utils/get-yesterday-date"

const matomoService = new MatomoService()
const statsSheetService = new StatsSheetService(
  GoogleSheetFactory.makeGoogleSheet()
)

const endDate = getYesterdayDateString()

async function script() {
  try {
    const muditaHarmonySheetLastDate = await statsSheetService.getLastDate(
      "Mudita Harmony - MD"
    )

    const muditaHarmonyMatomoData = await matomoService.fetchMatomoData({
      label: "Harmony Update - download",
      startDate: muditaHarmonySheetLastDate,
      endDate,
    })

    await statsSheetService.updateStats(
      muditaHarmonyMatomoData,
      "Mudita Harmony - MD"
    )

    const muditaPureSheetLastDate = await statsSheetService.getLastDate(
      "Mudita Pure - MD"
    )

    const muditaPureMatomoData = await matomoService.fetchMatomoData({
      label: "Pure Update - download",
      startDate: muditaPureSheetLastDate,
      endDate,
    })

    await statsSheetService.updateStats(
      muditaPureMatomoData,
      "Mudita Pure - MD"
    )

  } catch (error) {
    console.error(error)
    return
  }
}

void script()
