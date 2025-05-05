/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { IconType } from "generic-view/utils"
import { Typography } from "../../typography/typography"
import { Icon } from "../../icon/icon"

export const FilesManagerUploadProgressWarning: FunctionComponent = () => {
  return (
    <Wrapper>
      <Typography.P3
        className="modal-content-original-paragraph"
        config={{ color: "black" }}
      >
        Some apps slow down transfer, it’s better <TextAlignPlaceholder />{" "}
        <br /> to close them if you have them open. <ParagraphIcon />
      </Typography.P3>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.grey5};
  padding: 1.2rem 0 1.2rem 1.2rem;
  margin: -1rem 1.2rem 0 1.2rem;

  p {
    text-align: center;
    white-space: pre-line;
  }
`

const ParagraphIcon = styled(Icon).attrs({
  config: {
    type: IconType.Information2,
    size: "tiny",
  },
})`
  display: inline-block;
  position: relative;
  user-select: none;
  top: 0.3rem;
`

const TextAlignPlaceholder = styled(ParagraphIcon)`
  opacity: 0;
  user-select: none;
`
