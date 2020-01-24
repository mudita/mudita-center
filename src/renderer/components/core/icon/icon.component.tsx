import * as React from "react"
import { getIconType } from "Renderer/components/core/icon/icon.config"
import Svg from "Renderer/components/core/svg/svg.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

export enum Type {
  Arrow,
  Battery,
  Calendar,
  Check,
  CheckIndeterminate,
  Delete,
  FilesManager,
  Magnifier,
  MenuFilesManager,
  MenuMeditation,
  MenuMusic,
  MenuNews,
  MenuOverview,
  MenuPhone,
  MenuSettings,
  MenuTethering,
  MenuTools,
  Message,
  MuditaLogo,
  MuditaLogoWithText,
  Music,
  Signal,
  Sim,
  Upload,
  VoiceRecorder,
}

interface Props {
  type: Type
  badge?: boolean
}

const badgeStyles = css`
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: -0.2rem;
    right: -0.3rem;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    background-color: ${backgroundColor("blue")};
  }
`

const Wrapper = styled.div<{ badge?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  position: relative;

  svg {
    max-height: 100%;
    max-width: 100%;
  }

  ${({ badge }) => badge && badgeStyles};
`

const Icon: FunctionComponent<Props> = ({ type, badge = false }) => {
  return (
    <Wrapper data-testid="icon-wrapper" badge={badge}>
      <Svg Image={getIconType(type)} />
    </Wrapper>
  )
}

export default Icon
