import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import Arrow from "Renderer/svg/arrow.svg"
import Battery from "Renderer/svg/battery.svg"
import Check from "Renderer/svg/check-icon.svg"
import CheckIndeterminate from "Renderer/svg/check-indeterminate.svg"
import Close from "Renderer/svg/close.svg"
import Delete from "Renderer/svg/delete.svg"
import FilesManager from "Renderer/svg/files-manager.svg"
import Magnifier from "Renderer/svg/magnifier.svg"
import Calendar from "Renderer/svg/menu_calendar.svg"
import MenuFilesManager from "Renderer/svg/menu_filesManager.svg"
import MenuHelp from "Renderer/svg/menu_help.svg"
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
import Calls from "Renderer/svg/phone.svg"
import Connection from "Renderer/svg/connection.svg"
import Contacts from "Renderer/svg/contacts.svg"
import Notes from "Renderer/svg/notes.svg"
import Notification from "Renderer/svg/notifications.svg"
import Dial from "Renderer/svg/dial.svg"
import Playlist from "Renderer/svg/playlist.svg"
import VoiceRecorder from "Renderer/svg/voice-recorder.svg"
import FunctionComponent from "Renderer/types/function-component.interface"

export enum Type {
  Arrow,
  Battery,
  Calendar,
  Check,
  CheckIndeterminate,
  Close,
  Delete,
  FilesManager,
  Magnifier,
  MenuFilesManager,
  MenuHelp,
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
  Calls,
  Connection,
  Contacts,
  Dial,
  Notes,
  Notification,
  Playlist,
  Upload,
  VoiceRecorder,
}

export const getIconType = (icon: Type): FunctionComponent<ImageInterface> => {
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
    case Type.Close:
      return Close
    case Type.Delete:
      return Delete
    case Type.FilesManager:
      return FilesManager
    case Type.Magnifier:
      return Magnifier
    case Type.MenuFilesManager:
      return MenuFilesManager
    case Type.MenuHelp:
      return MenuHelp
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
    case Type.Calls:
      return Calls
    case Type.Connection:
      return Connection
    case Type.Contacts:
      return Contacts
    case Type.Dial:
      return Dial
    case Type.Notes:
      return Notes
    case Type.Notification:
      return Notification
    case Type.Playlist:
      return Playlist
    case Type.Upload:
      return Upload
    case Type.VoiceRecorder:
      return VoiceRecorder
    default:
      return Message
  }
}
