/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import Arrow from "Renderer/svg/arrow.svg"
import ArrowLongLeft from "Renderer/svg/arrow-long-left.svg"
import ArrowLongRight from "Renderer/svg/arrow-long-right.svg"
import AttachContact from "Renderer/svg/attach-contact.svg"
import BackupFolder from "Renderer/svg/backup-folder.svg"
import Battery from "Renderer/svg/battery.svg"
import BorderCheck from "Renderer/svg/border-check-icon.svg"
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
import Calendar from "Renderer/svg/menu-calendar.svg"
import MediumBattery from "Renderer/svg/medium-battery.svg"
import MediumRange from "Renderer/svg/medium-range.svg"
import MenuFilesManager from "Renderer/svg/menu-files-manager.svg"
import MenuHelp from "Renderer/svg/menu-help.svg"
import MenuMeditation from "Renderer/svg/menu-meditation.svg"
import Message from "Renderer/svg/menu-messages.svg"
import MenuMusic from "Renderer/svg/menu-music.svg"
import MenuNews from "Renderer/svg/menu-news.svg"
import MenuOverview from "Renderer/svg/menu-overview.svg"
import MenuPhone from "Renderer/svg/menu-phone.svg"
import MenuSettings from "Renderer/svg/menu-settings.svg"
import MenuTethering from "Renderer/svg/menu-tethering.svg"
import MenuTools from "Renderer/svg/menu-tools.svg"
import ExternalLink from "Renderer/svg/external-link.svg"
import MuditaLogo from "Renderer/svg/mudita.svg"
import MuditaLogoWithText from "Renderer/svg/mudita_logo.svg"
import NoBattery from "Renderer/svg/no-battery.svg"
import NoRange from "Renderer/svg/no-range.svg"
import Refresh from "Renderer/svg/refresh.svg"
import Send from "Renderer/svg/send.svg"
import Sim from "Renderer/svg/sim.svg"
import Template from "Renderer/svg/template.svg"
import Upload from "Renderer/svg/upload.svg"
import UploadDark from "Renderer/svg/upload-dark.svg"
import Download from "Renderer/svg/download.svg"
import DownloadWhite from "Renderer/svg/download-white.svg"
import Calls from "Renderer/svg/phone.svg"
import Connection from "Renderer/svg/connection.svg"
import Contact from "Renderer/svg/contact.svg"
import NewContact from "Renderer/svg/new-contact.svg"
import Notes from "Renderer/svg/notes.svg"
import Notifications from "Renderer/svg/notifications.svg"
import Dial from "Renderer/svg/dial.svg"
import Playlist from "Renderer/svg/playlist.svg"
import PlusSign from "Renderer/svg/plus-sign.svg"
import Reload from "Renderer/svg/circle-arrow.svg"
import VoiceRecorder from "Renderer/svg/voice-recorder.svg"
import VeryHighBattery from "Renderer/svg/very-high-battery.svg"
import Pure from "Renderer/svg/pure.svg"
import Fail from "Renderer/svg/fail.svg"
import FailRed from "Renderer/svg/fail-red.svg"
import VeryHighRange from "Renderer/svg/very-high-range.svg"
import VeryLowBattery from "Renderer/svg/very-low-battery.svg"
import Info from "Renderer/svg/info.svg"
import More from "Renderer/svg/more.svg"
import Blocked from "Renderer/svg/blocked.svg"
import Forward from "Renderer/svg/forward.svg"
import Edit from "Renderer/svg/edit.svg"
import Favourites from "Renderer/svg/favourites.svg"
import Ice from "Renderer/svg/ice.svg"
import ArrowDown from "Renderer/svg/arrow-down.svg"
import DeleteBig from "Renderer/svg/delete-big.svg"
import Attachment from "Renderer/svg/attachment.svg"
import Remove from "Renderer/svg/remove.svg"
import SendButton from "Renderer/svg/send-button.svg"
import MenuContacts from "Renderer/svg/menu-contacts.svg"
import Backup from "Renderer/svg/backup.svg"
import Tooltip from "Renderer/svg/tooltip.svg"
import TetheringStatus from "Renderer/svg/tethering-status.svg"
import Templates from "Renderer/svg/templates.svg"
import MissedCall from "Renderer/svg/missed-call.svg"
import ConferenceCall from "Renderer/svg/conference-call.svg"
import IncomingCall from "Renderer/svg/incoming-call.svg"
import OutgoingCall from "Renderer/svg/outgoing-call.svg"
import AppleLogo from "Renderer/svg/apple.svg"
import GoogleLogo from "Renderer/svg/google.svg"
import SynchronizeContacts from "Renderer/svg/synchronize-contacts.svg"
import MusicGrey from "Renderer/svg/music-grey.svg"
import VoiceRecorderGrey from "Renderer/svg/voice-recorder-gray.svg"
import FullBattery from "Renderer/svg/full-battery.svg"
import VeryLowRange from "Renderer/svg/very-low-range.svg"
import VeryHighRangeWithRoaming from "Renderer/svg/very-high-range-roaming.svg"
import HighRangeWithRoaming from "Renderer/svg/high-range-roaming.svg"
import MediumRangeWithRoaming from "Renderer/svg/medium-range-roaming.svg"
import LowRangeWithRoaming from "Renderer/svg/low-range-roaming.svg"
import VeryLowRangeWithRoaming from "Renderer/svg/very-low-range-roaming.svg"
import CalendarIcon from "Renderer/svg/calendar.svg"
import ThinCheck from "Renderer/svg/thin-check.svg"
import LongArrow from "Renderer/svg/long-arrow.svg"
import MarkAsRead from "Renderer/svg/mark-as-read.svg"
import RecoveryBackup from "Renderer/svg/recovery-backup.svg"
import RebootOs from "Renderer/svg/reboot-os.svg"
import FactoryReset from "Renderer/svg/factory-reset.svg"
import MuditaFlower from "Renderer/svg/mudita-flower.svg"
import MuditaDarkLogo from "Renderer/svg/mudita-dark-logo.svg"
import ContactGoogle from "Renderer/svg/contact-google.svg"
import Manage from "Renderer/svg/manage.svg"
import MuditaLogoBg from "Renderer/svg/muditalogo-bg.svg"
import Outlook from "Renderer/svg/outlook.svg"
import { FunctionComponent } from "Renderer/types/function-component.interface"

export enum Type {
  Arrow,
  ArrowLongLeft,
  ArrowLongRight,
  AttachContact,
  BackupFolder,
  Battery,
  BorderCheckIcon,
  Calendar,
  CalendarIcon,
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
  MenuContacts,
  MenuMeditation,
  MenuMusic,
  MenuNews,
  MenuOverview,
  MenuPhone,
  MenuSettings,
  MenuTethering,
  MenuTools,
  MenuRange,
  MenuBattery,
  Message,
  ExternalLink,
  MuditaLogo,
  MuditaLogoWithText,
  MediumBattery,
  MediumRange,
  NoBattery,
  NoRange,
  Refresh,
  Send,
  Sim,
  Template,
  Calls,
  Connection,
  Contact,
  NewContact,
  Dial,
  Notes,
  Notifications,
  Playlist,
  PlusSign,
  Reload,
  Upload,
  UploadDark,
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
  FailRed,
  More,
  Blocked,
  Forward,
  Edit,
  Favourites,
  Ice,
  ArrowDown,
  DeleteBig,
  Attachment,
  Remove,
  SendButton,
  Backup,
  Tooltip,
  TetheringStatus,
  Apple,
  Google,
  SynchronizeContacts,
  Templates,
  MissedCall,
  ConferenceCall,
  IncomingCall,
  OutgoingCall,
  MusicGrey,
  VoiceRecorderGrey,
  FullBattery,
  VeryHighRangeWithRoaming,
  HighRangeWithRoaming,
  MediumRangeWithRoaming,
  LowRangeWithRoaming,
  VeryLowRangeWithRoaming,
  ThinCheck,
  LongArrow,
  MarkAsRead,
  RecoveryBackup,
  RebootOs,
  FactoryReset,
  MuditaFlower,
  MuditaDarkLogo,
  ContactGoogle,
  Manage,
  MuditaLogoBg,
  Outlook,
}

const typeToIcon: Partial<Record<Type, typeof Arrow>> = {
  [Type.Arrow]: Arrow,
  [Type.ArrowLongLeft]: ArrowLongLeft,
  [Type.ArrowLongRight]: ArrowLongRight,
  [Type.AttachContact]: AttachContact,
  [Type.BackupFolder]: BackupFolder,
  [Type.Battery]: Battery,
  [Type.BorderCheckIcon]: BorderCheck,
  [Type.Calendar]: Calendar,
  [Type.CalendarIcon]: CalendarIcon,
  [Type.ChargingBattery]: ChargingBattery,
  [Type.Check]: Check,
  [Type.CheckIndeterminate]: CheckIndeterminate,
  [Type.Close]: Close,
  [Type.Delete]: Delete,
  [Type.FilesManager]: FilesManager,
  [Type.HighBattery]: HighBattery,
  [Type.HighRange]: HighRange,
  [Type.LowBattery]: LowBattery,
  [Type.LowRange]: LowRange,
  [Type.Magnifier]: Magnifier,
  [Type.MediumBattery]: MediumBattery,
  [Type.MenuContacts]: MenuContacts,
  [Type.MediumRange]: MediumRange,
  [Type.MenuFilesManager]: MenuFilesManager,
  [Type.MenuHelp]: MenuHelp,
  [Type.MenuMeditation]: MenuMeditation,
  [Type.MenuMusic]: MenuMusic,
  [Type.MenuNews]: MenuNews,
  [Type.MenuOverview]: MenuOverview,
  [Type.MenuPhone]: MenuPhone,
  [Type.MenuSettings]: MenuSettings,
  [Type.MenuTethering]: MenuTethering,
  [Type.MenuTools]: MenuTools,
  [Type.Message]: Message,
  [Type.ExternalLink]: ExternalLink,
  [Type.MuditaLogo]: MuditaLogo,
  [Type.MuditaLogoWithText]: MuditaLogoWithText,
  [Type.NoBattery]: NoBattery,
  [Type.NoRange]: NoRange,
  [Type.Refresh]: Refresh,
  [Type.Send]: Send,
  [Type.Sim]: Sim,
  [Type.Template]: Template,
  [Type.Tooltip]: Tooltip,
  [Type.TetheringStatus]: TetheringStatus,
  [Type.Templates]: Templates,
  [Type.Calls]: Calls,
  [Type.Connection]: Connection,
  [Type.Contact]: Contact,
  [Type.NewContact]: NewContact,
  [Type.Dial]: Dial,
  [Type.Notes]: Notes,
  [Type.Notifications]: Notifications,
  [Type.Playlist]: Playlist,
  [Type.PlusSign]: PlusSign,
  [Type.Reload]: Reload,
  [Type.Upload]: Upload,
  [Type.UploadDark]: UploadDark,
  [Type.VeryHighBattery]: VeryHighBattery,
  [Type.VeryHighRange]: VeryHighRange,
  [Type.VeryLowBattery]: VeryLowBattery,
  [Type.VoiceRecorder]: VoiceRecorder,
  [Type.Info]: Info,
  [Type.Download]: Download,
  [Type.DownloadWhite]: DownloadWhite,
  [Type.Pure]: Pure,
  [Type.Fail]: Fail,
  [Type.FailRed]: FailRed,
  [Type.More]: More,
  [Type.Blocked]: Blocked,
  [Type.Forward]: Forward,
  [Type.Edit]: Edit,
  [Type.Favourites]: Favourites,
  [Type.Ice]: Ice,
  [Type.ArrowDown]: ArrowDown,
  [Type.DeleteBig]: DeleteBig,
  [Type.Attachment]: Attachment,
  [Type.Remove]: Remove,
  [Type.SendButton]: SendButton,
  [Type.Backup]: Backup,
  [Type.Apple]: AppleLogo,
  [Type.Google]: GoogleLogo,
  [Type.SynchronizeContacts]: SynchronizeContacts,
  [Type.MissedCall]: MissedCall,
  [Type.ConferenceCall]: ConferenceCall,
  [Type.IncomingCall]: IncomingCall,
  [Type.OutgoingCall]: OutgoingCall,
  [Type.MusicGrey]: MusicGrey,
  [Type.VoiceRecorderGrey]: VoiceRecorderGrey,
  [Type.FullBattery]: FullBattery,
  [Type.VeryLowRange]: VeryLowRange,
  [Type.VeryHighRangeWithRoaming]: VeryHighRangeWithRoaming,
  [Type.HighRangeWithRoaming]: HighRangeWithRoaming,
  [Type.MediumRangeWithRoaming]: MediumRangeWithRoaming,
  [Type.LowRangeWithRoaming]: LowRangeWithRoaming,
  [Type.VeryLowRangeWithRoaming]: VeryLowRangeWithRoaming,
  [Type.MarkAsRead]: MarkAsRead,
  [Type.ThinCheck]: ThinCheck,
  [Type.MuditaFlower]: MuditaFlower,
  [Type.LongArrow]: LongArrow,
  [Type.RecoveryBackup]: RecoveryBackup,
  [Type.RebootOs]: RebootOs,
  [Type.FactoryReset]: FactoryReset,
  [Type.MuditaDarkLogo]: MuditaDarkLogo,
  [Type.ContactGoogle]: ContactGoogle,
  [Type.MuditaLogoBg]: MuditaLogoBg,
  [Type.Manage]: Manage,
  [Type.Outlook]: Outlook,
}

export const getIconType = (
  icon: Type = Type.Message
): FunctionComponent<ImageInterface> => typeToIcon[icon] || Message

export function getEnumName(type: Type): string
export function getEnumName(type?: Type): null
export function getEnumName(type?: Type): string | null {
  return type !== undefined ? Type[type] : null
}
