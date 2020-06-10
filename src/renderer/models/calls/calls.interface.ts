export enum VisibilityFilter {
  All = "all",
  Received = "received",
  Missed = "missed",
}

export type StateProps = Readonly<{
  calls?: any[]
  visibilityFilter?: VisibilityFilter
}>

export type ComponentProps = StateProps &
  Readonly<{
    changeVisibilityFilter?: (filter: VisibilityFilter) => void
    list: any[]
  }>
