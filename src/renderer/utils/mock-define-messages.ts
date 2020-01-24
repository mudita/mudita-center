import { defineMessages } from "react-intl"

export const mockDefineMessages = (id: string = "view.name.news") => {
  const messages = defineMessages({
    exampleMessage: { id },
  })
  return messages.exampleMessage
}
