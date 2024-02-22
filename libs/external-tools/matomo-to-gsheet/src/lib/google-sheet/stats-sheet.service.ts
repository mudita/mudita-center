/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sheets_v4 } from "googleapis"
import isValidDateFormat from "../utils/is-valid-date-format"

type MatomoData = { [date: string]: { label: string; nb_events: number }[] }

const SPREADSHEET_ID = process.env.MATOMO_TO_GSHEET_SPREADSHEET_ID!
const defaultStartDate = "2023-07-30"

export default class StatsSheetService {
  constructor(private sheets: sheets_v4.Sheets) {}

  public async getLastDate(sheetName: string): Promise<string> {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:A`,
    })
    const rows: string[][] = response.data.values ?? []

    if (rows.length === 0) {
      return defaultStartDate
    }

    const date = rows[rows.length - 1][0]

    if (!isValidDateFormat(date)) {
      throw new Error(
        "dateString is in another format than YYYY-MM-DD while retrieving data from the sheet"
      )
    }

    return date
  }

  public async updateStats(data: MatomoData, sheetName: string): Promise<void> {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A2:ZZ`,
    })

    const existingData = response.data.values || []

    const existingHeaders = existingData.length > 0 ? existingData[0] : []
    const allVersions = new Set<string>(existingHeaders.slice(1)) // Removing "Dzień" from the headers

    // Adding new versions from current data
    Object.values(data).forEach((events) =>
      events.forEach((event) =>
        allVersions.add(event.label.replace("latest - ", ""))
      )
    )

    const updatedHeaders = ["Dzień", ...Array.from(allVersions)]
    const headersToUpdate =
      existingHeaders.length < updatedHeaders.length ||
      !updatedHeaders.every(
        (header, index) => existingHeaders[index] === header
      )

    // Updating headers if necessary
    if (headersToUpdate) {
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A2`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [updatedHeaders] },
      })
    }

    // Preparing new data rows according to current headers
    const rows = Object.entries(data).map(([date, events]) => {
      const row = new Array(updatedHeaders.length).fill(0)
      row[0] = date // Date set

      events.forEach((event) => {
        const versionIndex = updatedHeaders.indexOf(
          event.label.replace("latest - ", "")
        )
        if (versionIndex !== -1) {
          row[versionIndex] = event.nb_events // Setting the number of events for the respective version
        }
      })

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return row
    })

    // Finding the first empty row after existing data
    const startRow = existingData.length + 2 // +2 because headers are in the second row

    // Adding new data
    await this.sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A${startRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: rows },
    })
  }
}
