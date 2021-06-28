/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import {
  textColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { FileListTestIds } from "Renderer/components/core/file-list/file-list-test-ids.enum"

const File = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  overflow: hidden;
  width: calc(50% - 2rem);
  margin-bottom: 0.8rem;
  user-select: none;

  p {
    user-select: none;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${textColor("secondary")};
    margin: 0 2rem 0 0.5rem;
    white-space: nowrap;
  }
`

const Remove = styled.span`
  cursor: pointer;
  opacity: 0.6;
  transition: opacity ${transitionTime("quick")}
    ${transitionTimingFunction("smooth")};

  &:hover {
    opacity: 1;
  }
`

const Container = styled.ul`
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

interface Props {
  files: { name: string }[]
  onRemoveClick?: (index: number) => void
}

const FileList: FunctionComponent<Props> = ({
  files,
  onRemoveClick,
  ...props
}) => {
  return (
    <Container {...props}>
      {files.map((file, index) => {
        const onClick = onRemoveClick
          ? () => {
              onRemoveClick(index)
            }
          : undefined

        return (
          <File key={index} data-testid={FileListTestIds.File}>
            <Icon type={Type.Attachment} height={1.6} />
            <Text displayStyle={TextDisplayStyle.MediumFadedText}>
              {file.name}
            </Text>
            {onClick && (
              <Remove
                onClick={onClick}
                role="button"
                data-testid={FileListTestIds.RemoveFileButton}
              >
                <Icon type={Type.Remove} width={1.6} />
              </Remove>
            )}
          </File>
        )
      })}
    </Container>
  )
}

export default FileList
