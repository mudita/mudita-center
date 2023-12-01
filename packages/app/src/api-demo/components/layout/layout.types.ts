/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type PrimitiveValue = string | number

export interface GridLayout {
  rows: PrimitiveValue[]
  columns: PrimitiveValue[]
  rowGap?: PrimitiveValue
  columnGap?: PrimitiveValue
}

export interface GridPlacement {
  row: number
  column: number
  width: number
  height: number
}

export interface FlexLayout {
  direction: "row" | "column" | "row-reverse" | "column-reverse"
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
  alignContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
  wrap?: "wrap" | "nowrap" | "wrap-reverse"
  rowGap?: PrimitiveValue
  columnGap?: PrimitiveValue
}

export interface FlexPlacement {
  grow?: PrimitiveValue
  shrink?: PrimitiveValue
  basis?: PrimitiveValue
  order?: PrimitiveValue
  alignSelf?: "flex-start" | "flex-end" | "center" | "stretch"
}

interface GridLayoutBase {
  gridLayout?: GridLayout
  flexLayout?: undefined
}

interface FlexLayoutBase {
  flexLayout?: FlexLayout
  gridLayout?: undefined
}

type LayoutBase = GridLayoutBase | FlexLayoutBase

export type Layout = {
  gridPlacement?: GridPlacement
  flexPlacement?: FlexPlacement
  margin?: string
  padding?: string
} & LayoutBase
