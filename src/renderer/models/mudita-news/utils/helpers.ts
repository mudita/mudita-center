export const sortDescending = (ids: { id?: string; createdAt: string }[]) => {
  return ids.sort((firstId, secondId) => {
    return (
      Number(new Date(secondId.createdAt)) - Number(new Date(firstId.createdAt))
    )
  })
}
