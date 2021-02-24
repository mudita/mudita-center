/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import {
  backgroundColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import Table from "Renderer/components/core/table/table.component"
import StackedBarChart from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Type } from "Renderer/components/core/icon/icon.config"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"

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

export const ModalIcon = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 100%;
  margin: auto auto 2rem auto;
  background: ${backgroundColor("icon")};
  position: relative;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
  Partial<ModalProps> & { icon?: Type }
> = ({
  icon = Type.FilesManager,
  size = ModalSize.Small,
  children,
  ...props
}) => (
  <Modal size={size} {...props}>
    <ModalContent>
      <ModalIcon>
        <Icon type={icon} width={5} />
      </ModalIcon>
      {children}
    </ModalContent>
  </Modal>
)
