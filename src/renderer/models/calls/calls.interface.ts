export enum VisibilityFilter {
  All = "all",
  Received = "received",
  Missed = "missed",
}

export interface StateProps {
  calls?: any[]
  visibilityFilter?: VisibilityFilter
}
