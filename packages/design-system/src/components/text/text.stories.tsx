import { paths } from "Storybook/paths"
import { storyCreator } from "Components/storybook/typography/typography.helpers"
import typographyStory from "Components/storybook/typography/advanced-typography.stories"
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks"
import React from "react"

const description = `
\`<Text>\` component allows to easily implement the Mudita style typography. Examples of usage can be found in \`STYLE\` \\ \`Typography\` section.
`

export default {
  ...typographyStory,
  title: `${paths.atoms}/Text`,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Text</Title>
          <Subtitle>Atomic component</Subtitle>
          <Description markdown={description} />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
  },
}

export const Default = storyCreator({})
Default.parameters = {
  docs: {
    source: {
      code: " ",
    },
  },
}
