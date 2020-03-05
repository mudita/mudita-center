import { storiesOf } from "@storybook/react"
import React from "react"
import FilesManager from "Renderer/components/rest/overview/files-manager/files-manager.component"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { action } from "@storybook/addon-actions"

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

storiesOf("Overview|FilesManager", module).add("FilesManager", () => {
  return (
    <div style={{ maxWidth: "63rem" }}>
      <Part>
        <Text displayStyle={TextDisplayStyle.SmallText}>No space used</Text>
        <FilesManager
          usedSpace={0}
          onFilesOpen={action("open files manager")}
        />
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
        <FilesManager
          usedSpace={16}
          onFilesOpen={action("open files manager")}
        />
      </Part>
    </div>
  )
})
