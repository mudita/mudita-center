import { Dictionary } from "Renderer/utils/hooks/use-sort/use-sort.helpers"

export enum SortDirection {
  Ascending,
  Descending,
}

export interface SortState<T> {
  data: T[]
  sortDirection: Dictionary
}

export interface SortAction<T> {
  data: T[]
  sortKey: string
}

export interface UseSort<T> {
  data: T[]
  sort: (term: string) => void
  sortDirection: Dictionary
}
