/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FilesManagerPanelTestIds } from "Core/files-manager/components/files-manager-panel/files-manager-panel-ids.enum"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  title: {
    id: "module.manageSounds.noFilesTitle",
  },
  description: {
    id: "module.manageSounds.noFilesDescription",
  },
  uploadButton: {
    id: "module.manageSounds.uploadButton",
  },
})

const Container = styled.div`
  height: 100%;
  max-width: 36.2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
`
const Title = styled(Text)`
  margin-bottom: 0.8rem;
`
const Description = styled(Text)`
  margin-bottom: 2.4rem;
`

const ManageSoundsNoFiles: FunctionComponent = () => {
  return (
    <Container>
      <Title
        displayStyle={TextDisplayStyle.Paragraph1}
        message={messages.title}
      />
      <Description
        displayStyle={TextDisplayStyle.Paragraph3}
        message={messages.description}
        color="secondary"
      />
      <Button
        data-testid={FilesManagerPanelTestIds.Button}
        displayStyle={DisplayStyle.Primary}
        labelMessage={messages.uploadButton}
        disabled={true}
      />
    </Container>
  )
}

export default ManageSoundsNoFiles
