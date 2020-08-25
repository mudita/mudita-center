import React from "react"
import FilesManager from "Renderer/components/rest/overview/files-manager/files-manager.component"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { action } from "@storybook/addon-actions"
import { Story, Meta } from "@storybook/react/types-6-0"
import { MemoryRouter } from "react-router"

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

export const DifferentSpaceUsed = () => (
  <>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>No space used</Text>
      <FilesManager usedSpace={0} onFilesOpen={action("open files manager")} />
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Custom parameters</Text>
      <FilesManager
        usedSpace={29}
        maxSpace={512}
        onFilesOpen={action("open files manager")}
      />
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Half space used</Text>
      <FilesManager
        usedSpace={7.99}
        onFilesOpen={action("open files manager")}
      />
    </Part>
    <Part>
      <Text displayStyle={TextDisplayStyle.SmallText}>Full space used</Text>
      <FilesManager usedSpace={16} onFilesOpen={action("open files manager")} />
    </Part>
  </>
)

export default {
  title: "Overview/FilesManager",
  component: DifferentSpaceUsed,
  decorators: [
    (Story: Story) => (
      <div style={{ maxWidth: "63rem" }}>
        <MemoryRouter initialEntries={["/phone"]}>
          <Story />
        </MemoryRouter>
      </div>
    ),
  ],
} as Meta
