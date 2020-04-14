import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import Arrow from "Renderer/svg/arrow.svg"
import BackupFolder from "Renderer/svg/backup-folder.svg"
import Battery from "Renderer/svg/battery.svg"
import ChargingBattery from "Renderer/svg/charging-battery.svg"
import Check from "Renderer/svg/check-icon.svg"
import CheckIndeterminate from "Renderer/svg/check-indeterminate.svg"
import Close from "Renderer/svg/close.svg"
import Delete from "Renderer/svg/delete.svg"
import FilesManager from "Renderer/svg/files-manager.svg"
import HighBattery from "Renderer/svg/high-battery.svg"
import HighRange from "Renderer/svg/high-range.svg"
import LowBattery from "Renderer/svg/low-battery.svg"
import LowRange from "Renderer/svg/low-range.svg"
import Magnifier from "Renderer/svg/magnifier.svg"
import Calendar from "Renderer/svg/menu_calendar.svg"
import MediumBattery from "Renderer/svg/medium-battery.svg"
import MediumRange from "Renderer/svg/medium-range.svg"
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
import ExternalLink from "Renderer/svg/external-link.svg"
import MuditaLogo from "Renderer/svg/mudita.svg"
import MuditaLogoWithText from "Renderer/svg/mudita_logo.svg"
import Music from "Renderer/svg/music.svg"
import NoBattery from "Renderer/svg/no-battery.svg"
import NoRange from "Renderer/svg/no-range.svg"
import Refresh from "Renderer/svg/refresh.svg"
import Sim from "Renderer/svg/sim.svg"
import Upload from "Renderer/svg/upload.svg"
import Download from "Renderer/svg/download.svg"
import DownloadWhite from "Renderer/svg/download-white.svg"
import Calls from "Renderer/svg/phone.svg"
import Connection from "Renderer/svg/connection.svg"
import Contacts from "Renderer/svg/contacts.svg"
import Notes from "Renderer/svg/notes.svg"
import Notification from "Renderer/svg/notifications.svg"
import Dial from "Renderer/svg/dial.svg"
import Playlist from "Renderer/svg/playlist.svg"
import Reload from "Renderer/svg/circle-arrow.svg"
import VoiceRecorder from "Renderer/svg/voice-recorder.svg"
import VeryHighBattery from "Renderer/svg/very-high-battery.svg"
import Pure from "Renderer/svg/pure.svg"
import Fail from "Renderer/svg/fail.svg"
import VeryHighRange from "Renderer/svg/very-high-range.svg"
import VeryLowBattery from "Renderer/svg/very-low-battery.svg"
import VeryLowRange from "Renderer/svg/very-low-range.svg"
import Info from "Renderer/svg/info.svg"
import More from "Renderer/svg/more.svg"
import Blocked from "Renderer/svg/blocked.svg"
import Forward from "Renderer/svg/forward.svg"
import Edit from "Renderer/svg/edit.svg"
import Favourites from "Renderer/svg/favourites.svg"
import FunctionComponent from "Renderer/types/function-component.interface"

export enum Type {
  Arrow,
  BackupFolder,
  Battery,
  Calendar,
  ChargingBattery,
  Check,
  CheckIndeterminate,
  Close,
  Delete,
  FilesManager,
  HighBattery,
  HighRange,
  LowBattery,
  LowRange,
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
  ExternalLink,
  MuditaLogo,
  MuditaLogoWithText,
  Music,
  MediumBattery,
  MediumRange,
  NoBattery,
  NoRange,
  Refresh,
  Sim,
  Calls,
  Connection,
  Contacts,
  Dial,
  Notes,
  Notification,
  Playlist,
  Reload,
  Upload,
  VeryHighBattery,
  VeryHighRange,
  VeryLowBattery,
  VeryLowRange,
  VoiceRecorder,
  Info,
  Download,
  DownloadWhite,
  Pure,
  Fail,
  More,
  Blocked,
  Forward,
  Edit,
  Favourites,
}

export const getIconType = (icon?: Type): FunctionComponent<ImageInterface> => {
  switch (icon) {
    case Type.Arrow:
      return Arrow
    case Type.BackupFolder:
      return BackupFolder
    case Type.Battery:
      return Battery
    case Type.Calendar:
      return Calendar
    case Type.ChargingBattery:
      return ChargingBattery
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
    case Type.HighBattery:
      return HighBattery
    case Type.HighRange:
      return HighRange
    case Type.LowBattery:
      return LowBattery
    case Type.LowRange:
      return LowRange
    case Type.Magnifier:
      return Magnifier
    case Type.MediumBattery:
      return MediumBattery
    case Type.MediumRange:
      return MediumRange
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
    case Type.ExternalLink:
      return ExternalLink
    case Type.MuditaLogo:
      return MuditaLogo
    case Type.MuditaLogoWithText:
      return MuditaLogoWithText
    case Type.Music:
      return Music
    case Type.NoBattery:
      return NoBattery
    case Type.NoRange:
      return NoRange
    case Type.Refresh:
      return Refresh
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
    case Type.Reload:
      return Reload
    case Type.Upload:
      return Upload
    case Type.VeryHighBattery:
      return VeryHighBattery
    case Type.VeryHighRange:
      return VeryHighRange
    case Type.VeryLowBattery:
      return VeryLowBattery
    case Type.VeryLowRange:
      return VeryLowRange
    case Type.VoiceRecorder:
      return VoiceRecorder
    case Type.Info:
      return Info
    case Type.Download:
      return Download
    case Type.DownloadWhite:
      return DownloadWhite
    case Type.Pure:
      return Pure
    case Type.Fail:
      return Fail
    case Type.More:
      return More
    case Type.Blocked:
      return Blocked
    case Type.Forward:
      return Forward
    case Type.Edit:
      return Edit
    case Type.Favourites:
      return Favourites
    default:
      return Message
  }
}

export const getEnumName = (type?: Type) => {
  return type !== undefined ? Type[type] : null
}
