import { defineMessages } from "react-intl"

export const mockDefineMessages = (id = "view.name.news") => {
  const messages = defineMessages({
    exampleMessage: { id },
  })
  return messages.exampleMessage
}
