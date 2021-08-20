/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import FilesManager from "App/overview/components/files-manager/files-manager.component"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { action } from "@storybook/addon-actions"
import { MemoryRouter } from "react-router"
import { storiesOf } from "@storybook/react"

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

storiesOf("Views|Overview/FilesManager", module)
  .addDecorator((story) => (
    <MemoryRouter initialEntries={["/phone"]}>
      <div style={{ maxWidth: "97.5rem" }}>{story()}</div>
    </MemoryRouter>
  ))
  .add("FilesManager", () => {
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
          <Text displayStyle={TextDisplayStyle.SmallText}>
            Custom parameters
          </Text>
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
