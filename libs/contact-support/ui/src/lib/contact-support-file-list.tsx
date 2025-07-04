/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { IconSize, IconType } from "app-theme/models"
import { Icon, Typography } from "app-theme/ui"
import { ContactSupportTestIds } from "contact-support/models"

const File = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`

interface Props {
  files: { name: string }[]
}

export const ContactSupportFileList: FunctionComponent<Props> = ({
  files,
  ...props
}) => {
  return (
    <Container {...props}>
      {files.map((file, index) => {
        return (
          <File key={index} data-testid={ContactSupportTestIds.FormModalFile}>
            <Icon type={IconType.FileCopy} size={IconSize.Small} />
            <Typography.P3>{file.name}</Typography.P3>
          </File>
        )
      })}
    </Container>
  )
}
