/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import styled from "styled-components"
import { textColor } from "Renderer/styles/theming/theme-getters"
import Table from "Renderer/components/core/table/table.component"
import StackedBarChart from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Type } from "Renderer/components/core/icon/icon.config"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalIcon } from "Renderer/components/core/modal-shared/modal-shared"

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    line-height: 1.4;
    white-space: pre-wrap;
  }

  p + p {
    margin-top: 1.2rem;
  }

  strong {
    color: ${textColor("primary")};
  }
`

export const FileList = styled(Table)`
  --columnsTemplate: 3fr 1fr;

  width: 100%;
  max-height: 30rem;
  overflow: scroll;
  margin-top: 1.2rem;
`

export const LoadingBar = styled(StackedBarChart)`
  margin: 3.2rem auto auto;
  max-width: 22rem;
  width: 100%;
`

export const PureBackupModal: FunctionComponent<
  ComponentProps<typeof ModalDialog> & { icon?: Type }
> = ({
  open,
  icon = Type.FilesManager,
  size = ModalSize.Small,
  children,
  ...props
}) => (
  <ModalDialog open={open} size={size} {...props}>
    <ModalContent>
      <ModalIcon>
        <Icon type={icon} width={5} />
      </ModalIcon>
      {children}
    </ModalContent>
  </ModalDialog>
)
