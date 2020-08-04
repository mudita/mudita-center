import { Entry } from "contentful"

interface HelpEntry {
  question: string
  answer: string
  slug: string
}

export const normalizeHelpData = (data: any) => {
  const items = data.items.reduce(
    (
      acc: Record<string, Partial<HelpEntry>>,
      currentValue: Entry<HelpEntry>
    ) => {
      return {
        ...acc,
        [currentValue.sys.id]: {
          question: currentValue.fields.question,
          answer: "lala",
        },
      }
    },
    {}
  )
  const collection = data.items.map(({ sys }: any) => sys.id)
  return {
    collection,
    items,
  }
}
