import { paths } from "../../../.storybook/paths"
import { storyCreator } from "../storybook/typography/typography.helpers"
import advancedTypographyStory from "../storybook/typography/advanced-typography.stories"
import {
  ArgsTable,
  Description,
  Primary,
  PRIMARY_STORY,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks"
import React from "react"
import { Meta } from "@storybook/react"

const description = `
\`<Text>\` component allows to easily implement the Mudita style typography. Examples of usage can be found in \`STYLE\` \\ \`Typography\` section.
`

export default {
  ...advancedTypographyStory,
  title: `${paths.atoms}/Text`,
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <>
          <Title>Text</Title>
          <Subtitle>Atom component</Subtitle>
          <Description markdown={description} />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
  },
} as Meta

export const Default = storyCreator({})
