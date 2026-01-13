/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { ContactSupportTestIds } from "contact-support/models"
import {
  ButtonTextModifier,
  ButtonType,
  IconSize,
  IconType,
  TypographyTransform,
} from "app-theme/models"
import { Button, Typography } from "app-theme/ui"

const FileButton = styled(Button)`
  justify-content: flex-start;
  width: fit-content;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`

interface Props {
  files: { name: string }[]
  onFileButtonClick: (fileName: string) => void
}

export const ContactSupportFileList: FunctionComponent<Props> = ({
  files,
  onFileButtonClick,
  ...props
}) => {
  return (
    <Container {...props}>
      {files.map((file, index) => {
        return (
          <FileButton
            key={index}
            data-testid={ContactSupportTestIds.FormModalFile}
            type={ButtonType.Text}
            modifiers={[ButtonTextModifier.HoverUnderline]}
            icon={IconType.FileCopy}
            iconSize={IconSize.Small}
            onClick={() => onFileButtonClick(file.name)}
          >
            <Typography.P3 textTransform={TypographyTransform.None}>
              {file.name}
            </Typography.P3>
          </FileButton>
        )
      })}
    </Container>
  )
}
