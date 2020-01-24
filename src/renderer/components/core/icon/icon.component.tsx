import * as React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Arrow from "Renderer/svg/arrow.svg"
import Battery from "Renderer/svg/battery.svg"
import Check from "Renderer/svg/check-icon.svg"
import CheckIndeterminate from "Renderer/svg/check-indeterminate.svg"
import Delete from "Renderer/svg/delete.svg"
import FilesManager from "Renderer/svg/files-manager.svg"
import Magnifier from "Renderer/svg/magnifier.svg"
import Calendar from "Renderer/svg/menu_calendar.svg"
import MenuFilesManager from "Renderer/svg/menu_filesManager.svg"
import MenuMeditation from "Renderer/svg/menu_meditation.svg"
import Message from "Renderer/svg/menu_messages.svg"
import MenuMusic from "Renderer/svg/menu_music.svg"
import MenuNews from "Renderer/svg/menu_news.svg"
import MenuOverview from "Renderer/svg/menu_overview.svg"
import MenuPhone from "Renderer/svg/menu_phone.svg"
import MenuSettings from "Renderer/svg/menu_settings.svg"
import MenuTethering from "Renderer/svg/menu_tethering.svg"
import MenuTools from "Renderer/svg/menu_tools.svg"
import MuditaLogo from "Renderer/svg/mudita.svg"
import MuditaLogoWithText from "Renderer/svg/mudita_logo.svg"
import Music from "Renderer/svg/music.svg"
import Signal from "Renderer/svg/signal.svg"
import Sim from "Renderer/svg/sim.svg"
import Upload from "Renderer/svg/upload.svg"
import VoiceRecorder from "Renderer/svg/voice-recorder.svg"
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

const getIconType = (icon: Type): FunctionComponent<ImageInterface> => {
  switch (icon) {
    case Type.Arrow:
      return Arrow
    case Type.Battery:
      return Battery
    case Type.Calendar:
      return Calendar
    case Type.Check:
      return Check
    case Type.CheckIndeterminate:
      return CheckIndeterminate
    case Type.Delete:
      return Delete
    case Type.FilesManager:
      return FilesManager
    case Type.Magnifier:
      return Magnifier
    case Type.MenuFilesManager:
      return MenuFilesManager
    case Type.MenuMeditation:
      return MenuMeditation
    case Type.MenuMusic:
      return MenuMusic
    case Type.MenuNews:
      return MenuNews
    case Type.MenuOverview:
      return MenuOverview
    case Type.MenuPhone:
      return MenuPhone
    case Type.MenuSettings:
      return MenuSettings
    case Type.MenuTethering:
      return MenuTethering
    case Type.MenuTools:
      return MenuTools
    case Type.Message:
      return Message
    case Type.MuditaLogo:
      return MuditaLogo
    case Type.MuditaLogoWithText:
      return MuditaLogoWithText
    case Type.Music:
      return Music
    case Type.Signal:
      return Signal
    case Type.Sim:
      return Sim
    case Type.Upload:
      return Upload
    case Type.VoiceRecorder:
      return VoiceRecorder
    default:
      return Message
  }
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
