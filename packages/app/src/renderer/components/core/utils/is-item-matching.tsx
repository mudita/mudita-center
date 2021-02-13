export type IsItemMatching = (item: any, searchString: string) => boolean
export const isItemValueMatching: IsItemMatching = (
  itemValue: string,
  search
) => itemValue.toLowerCase().includes(search.toLowerCase())
