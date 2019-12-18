import { ReactElement } from "react"
import { FlattenSimpleInterpolation } from "styled-components"

type Label = string

type Row = any

export type LabelsLayout = FlattenSimpleInterpolation

export enum RowSize {
  Tiny = 4,
  Small = 4.8,
  Medium = 6.4,
  Big = 9,
}

export interface TableProps {
  rows: Row[]
  labels?: Label[]
  sidebar?: ReactElement
  labelsLayout?: LabelsLayout
}
