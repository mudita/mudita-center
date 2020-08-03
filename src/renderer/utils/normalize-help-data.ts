export const normalizeHelpData = (data: any) => {
  const items = data.items.map(({ sys, fields }: any) => {
    return {
      [sys.id]: {
        question: fields.question,
      },
    }
  })
  const collection = data.items.map(({ sys }: any) => sys.id)
  return {
    collection,
    items,
  }
}
