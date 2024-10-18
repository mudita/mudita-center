/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

export class OverviewPage extends Page {
  public get currentDeviceVersion() {
    return $("p*=MuditaOS")
  }

  public get checkingForUpdateLoader() {
    return $("h4*=Checking for MuditaOS update...")
  }

  public get downloadUpdateLoader() {
    return $("*=Downloading update...")
  }

  public get updateStatusLoader() {
    return $("p*=Updating MuditaOS…")
  }

  public get updateCompletedStatus() {
    return $("p*=Update completed!")
  }

  public get checkForUpdateButton() {
    return $("button*=Check for updates")
  }

  public get downloadUpdateNowButton() {
    return $('[data-testid="modal-action-button"]*=Download now')
  }

  public get updateNowButton() {
    return $('[data-testid="modal-action-button"]*=Update now')
  }

  public get aboutYourPureButton() {
    return $("p*=About your Pure")
  }

  public get checkSARInformationButton() {
    return $("p*=Check SAR information")
  }

  public get sarWrapper() {
    return $('[data-testid="sar-wrapper"]')
  }

  public get backToOverviewButton() {
    return $("p*=Back to Overview")
  }

  public get createBackupButton() {
    return $('[data-testid="primary-button-backupcreate-backup-button"]')
  }

  public get restoreBackupButton() {
    return $("p*=Restore last backup")
  }

  public get locationTextLabel() {
    return $('[data-testid="location"]')
  }

  public get batteryLevel() {
    return $('[data-testid="battery-level"]')
  }

  public get fullBatteryIcon() {
    return $('[data-testid="icon-FullBattery"]')
  }

  public get veryHighBatteryIcon() {
    return $('[data-testid="icon-VeryHighBattery"]')
  }

  public get highBatteryIcon() {
    return $('[data-testid="icon-HighBattery"]')
  }

  public get mediumBatteryIcon() {
    return $('[data-testid="icon-MediumBattery"]')
  }

  public get lowBatteryIcon() {
    return $('[data-testid="icon-LowBattery"]')
  }
  public get veryLowBatteryIcon() {
    return $('[data-testid="icon-VeryLowBattery"]')
  }

  public get noRangeIcon() {
    return $('[data-testid="icon-NoRange"]')
  }

  public get LowRangeIcon() {
    return $('[data-testid="icon-LowRange"]')
  }

  public get MediumRangeIcon() {
    return $('[data-testid="icon-MediumRange"]')
  }

  public get HighRangeIcon() {
    return $('[data-testid="icon-HighRange"]')
  }

  public get VeryHighRangeIcon() {
    return $('[data-testid="icon-VeryHighRange"]')
  }

  public get disconnectButton() {
    return $('[data-testid="disconnect-button"]')
  }

  public get networkName() {
    return $('[data-testid="network-name"]')
  }

  public get pureGrayImage() {
    return $('[data-testid="pure-gray"]')
  }

  public get pureBlackImage() {
    return $('[data-testid="pure-black"]')
  }

  public get aboutYourPureSerialNumber() {
    return $('[data-testid="serial-number-value"]')
  }

  public get overviewSerialNumber() {
    return $('[data-testid="device-serial-number"]')
  }

  public get muditaOSVersion() {
    return $('[data-testid="os-version"]')
  }

  public get selectConnectedDevices() {
    return $('[data-testid="icon-DotsInBox"]')
  }
}

export default new OverviewPage()
