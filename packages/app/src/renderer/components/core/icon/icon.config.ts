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
import CheckCircle from "Renderer/svg/check-circle.svg"
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
import MuditaLogoVertical from "Renderer/svg/mudita-logo-vertical.svg"
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
import ContactFilled from "Renderer/svg/contact-filled.svg"
import ThinFail from "Renderer/svg/thin-fail.svg"
import Support from "Renderer/svg/support.svg"
import Visible from "Renderer/svg/password-show.svg"
import Hidden from "Renderer/svg/password-hide.svg"
import Cloud from "Renderer/svg/cloud.svg"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { IconType } from "Renderer/components/core/icon/icon-type"

const typeToIcon: Partial<Record<IconType, typeof Arrow>> = {
  [IconType.Arrow]: Arrow,
  [IconType.ArrowLongLeft]: ArrowLongLeft,
  [IconType.ArrowLongRight]: ArrowLongRight,
  [IconType.AttachContact]: AttachContact,
  [IconType.BackupFolder]: BackupFolder,
  [IconType.Battery]: Battery,
  [IconType.BorderCheckIcon]: BorderCheck,
  [IconType.Calendar]: Calendar,
  [IconType.CalendarIcon]: CalendarIcon,
  [IconType.ChargingBattery]: ChargingBattery,
  [IconType.Check]: Check,
  [IconType.CheckCircle]: CheckCircle,
  [IconType.CheckIndeterminate]: CheckIndeterminate,
  [IconType.Close]: Close,
  [IconType.Cloud]: Cloud,
  [IconType.Delete]: Delete,
  [IconType.FilesManager]: FilesManager,
  [IconType.HighBattery]: HighBattery,
  [IconType.HighRange]: HighRange,
  [IconType.LowBattery]: LowBattery,
  [IconType.LowRange]: LowRange,
  [IconType.Magnifier]: Magnifier,
  [IconType.MediumBattery]: MediumBattery,
  [IconType.MenuContacts]: MenuContacts,
  [IconType.MediumRange]: MediumRange,
  [IconType.MenuFilesManager]: MenuFilesManager,
  [IconType.MenuHelp]: MenuHelp,
  [IconType.MenuMeditation]: MenuMeditation,
  [IconType.MenuMusic]: MenuMusic,
  [IconType.MenuNews]: MenuNews,
  [IconType.MenuOverview]: MenuOverview,
  [IconType.MenuPhone]: MenuPhone,
  [IconType.MenuSettings]: MenuSettings,
  [IconType.MenuTethering]: MenuTethering,
  [IconType.MenuTools]: MenuTools,
  [IconType.Message]: Message,
  [IconType.ExternalLink]: ExternalLink,
  [IconType.MuditaLogo]: MuditaLogo,
  [IconType.MuditaLogoWithText]: MuditaLogoWithText,
  [IconType.MuditaLogoVertical]: MuditaLogoVertical,
  [IconType.NoBattery]: NoBattery,
  [IconType.NoRange]: NoRange,
  [IconType.Refresh]: Refresh,
  [IconType.Send]: Send,
  [IconType.Sim]: Sim,
  [IconType.Support]: Support,
  [IconType.Template]: Template,
  [IconType.Tooltip]: Tooltip,
  [IconType.TetheringStatus]: TetheringStatus,
  [IconType.Templates]: Templates,
  [IconType.Calls]: Calls,
  [IconType.Connection]: Connection,
  [IconType.Contact]: Contact,
  [IconType.NewContact]: NewContact,
  [IconType.Dial]: Dial,
  [IconType.Notes]: Notes,
  [IconType.Notifications]: Notifications,
  [IconType.Playlist]: Playlist,
  [IconType.PlusSign]: PlusSign,
  [IconType.Reload]: Reload,
  [IconType.Upload]: Upload,
  [IconType.UploadDark]: UploadDark,
  [IconType.VeryHighBattery]: VeryHighBattery,
  [IconType.VeryHighRange]: VeryHighRange,
  [IconType.VeryLowBattery]: VeryLowBattery,
  [IconType.VoiceRecorder]: VoiceRecorder,
  [IconType.Info]: Info,
  [IconType.Download]: Download,
  [IconType.DownloadWhite]: DownloadWhite,
  [IconType.Pure]: Pure,
  [IconType.Fail]: Fail,
  [IconType.FailRed]: FailRed,
  [IconType.More]: More,
  [IconType.Blocked]: Blocked,
  [IconType.Forward]: Forward,
  [IconType.Edit]: Edit,
  [IconType.Favourites]: Favourites,
  [IconType.Ice]: Ice,
  [IconType.ArrowDown]: ArrowDown,
  [IconType.DeleteBig]: DeleteBig,
  [IconType.Attachment]: Attachment,
  [IconType.Remove]: Remove,
  [IconType.SendButton]: SendButton,
  [IconType.Backup]: Backup,
  [IconType.Apple]: AppleLogo,
  [IconType.Google]: GoogleLogo,
  [IconType.SynchronizeContacts]: SynchronizeContacts,
  [IconType.MissedCall]: MissedCall,
  [IconType.ConferenceCall]: ConferenceCall,
  [IconType.IncomingCall]: IncomingCall,
  [IconType.OutgoingCall]: OutgoingCall,
  [IconType.MusicGrey]: MusicGrey,
  [IconType.VoiceRecorderGrey]: VoiceRecorderGrey,
  [IconType.FullBattery]: FullBattery,
  [IconType.VeryLowRange]: VeryLowRange,
  [IconType.VeryHighRangeWithRoaming]: VeryHighRangeWithRoaming,
  [IconType.HighRangeWithRoaming]: HighRangeWithRoaming,
  [IconType.MediumRangeWithRoaming]: MediumRangeWithRoaming,
  [IconType.LowRangeWithRoaming]: LowRangeWithRoaming,
  [IconType.VeryLowRangeWithRoaming]: VeryLowRangeWithRoaming,
  [IconType.MarkAsRead]: MarkAsRead,
  [IconType.ThinCheck]: ThinCheck,
  [IconType.MuditaFlower]: MuditaFlower,
  [IconType.LongArrow]: LongArrow,
  [IconType.RecoveryBackup]: RecoveryBackup,
  [IconType.RebootOs]: RebootOs,
  [IconType.FactoryReset]: FactoryReset,
  [IconType.MuditaDarkLogo]: MuditaDarkLogo,
  [IconType.ContactGoogle]: ContactGoogle,
  [IconType.MuditaLogoBg]: MuditaLogoBg,
  [IconType.Manage]: Manage,
  [IconType.Outlook]: Outlook,
  [IconType.ContactFilled]: ContactFilled,
  [IconType.Visible]: Visible,
  [IconType.Hidden]: Hidden,
  [IconType.ThinFail]: ThinFail,
}

export const getIconType = (
  icon: IconType = IconType.Message
): FunctionComponent<ImageInterface> => typeToIcon[icon] || Message

export function getEnumName(type: IconType): string
export function getEnumName(type?: IconType): null
export function getEnumName(type?: IconType): string | null {
  return type !== undefined ? IconType[type] : null
}
