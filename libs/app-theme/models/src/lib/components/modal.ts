/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ModalSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum ModalLayer {
  Default = 9999,
  CrashDump,
  UpdateOS,
  ContactSupport,
  Passcode,
  EULA,
  LinuxSerialPortGroup,
  UpdateApp,
  PrivacyPolicy,
  Drawer,
  ConnectingLoader,
  DisconnectedDeviceError,
}

export enum ModalTestId {
  Modal = "modal",
  CloseButton = "modal-close-button",
  Title = "modal-title",
  TitleIcon = "modal-title-icon",
  Overlay = "modal-overlay",
  Buttons = "modal-buttons",
}
