// Group rows by given key
export const groupRows = (rows: any[], key: string) => {
  return rows.reduce((groups, item) => {
    const group = item[key].toString()
    return {
      ...groups,
      [group]: [...(groups[group] || []), item],
    }
  }, {})
}
