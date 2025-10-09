/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSql } from "app-sql/renderer"
import { Harmony } from "devices/harmony/models"
import { Quotation } from "devices/common/ui"
import { initializeDatabaseFromBackup } from "./initialize-database-from-backup"

const DB_FILE_NAME = "quotes.db"
const DB_INSTANCE_ID = "quotes"
const QUOTES_SQL = "SELECT * FROM custom_quote_table;"

export enum QuotationsTable {
  Custom = "custom_quote_table",
}

export interface DBQueryResult<Columns, Value> {
  columns: Columns[]
  values: Value[]
}

export type Entity<Type> = {
  _id: string
} & Type

export type QuotationEntity = Entity<{
  quote_id: string
  quote: string
  author?: string
}>

export interface QuotationInput {
  [QuotationsTable.Custom]: DBQueryResult<keyof QuotationEntity, string[]>
}

export const normalizeToString = (value: unknown): string =>
  value === null || value === undefined ? "" : String(value).trim()

export const serializeRecord = <T = Record<string, string>>(
  values: unknown[][],
  columns: string[]
): T[] =>
  values.map((row) =>
    columns.reduce<Record<string, string>>((acc, col, i) => {
      acc[col.trim()] = normalizeToString((row as unknown[])[i])
      return acc
    }, {})
  ) as unknown as T[]

export const mapToQuotationObject = (data: QuotationInput): Quotation[] => {
  const table = data[QuotationsTable.Custom]
  if (!table) return []

  const quotations = serializeRecord<QuotationEntity>(
    table.values,
    table.columns
  )

  return quotations
    .map((quotation): Quotation | undefined => {
      if (!quotation.quote_id || !quotation.quote) return undefined

      return {
        id: quotation.quote_id,
        text: quotation.quote,
        author: quotation.author,
      }
    })
    .filter(
      (quotation): quotation is Quotation => typeof quotation !== "undefined"
    )
}

export const fetchQuotations = async (device: Harmony) => {
  await initializeDatabaseFromBackup({
    device,
    dbName: DB_FILE_NAME,
    dbInstanceName: DB_INSTANCE_ID,
  })

  const result = await AppSql.exec(DB_INSTANCE_ID, QUOTES_SQL)

  const first = result?.[0]
  if (!first || !first.columns?.length) {
    return []
  }

  return mapToQuotationObject({
    [QuotationsTable.Custom]: {
      columns: first.columns,
      values: first.values ?? [],
    },
  })
}
