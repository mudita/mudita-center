/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class OverviewPage extends Page {
  public get currentDeviceVersion(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=MuditaOS")
  }

  public get checkingForUpdateLoader(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Checking for MuditaOS update...")
  }

  public get downloadUpdateLoader(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("*=Downloading update...")
  }

  public get updateStatusLoader(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Updating MuditaOS…")
  }

  public get updateCompletedStatus(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Update completed!")
  }

  public get checkForUpdateButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("button*=Check for updates")
  }

  public get downloadUpdateNowButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="modal-action-button"]*=Download now')
  }

  public get updateNowButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="modal-action-button"]*=Update now')
  }

  public get aboutYourPureButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=About your Pure")
  }

  public get checkSARInformationButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Check SAR information")
  }

  public get sarWrapper(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="sar-wrapper"]')
  }

  public get backToOverviewButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Back to Overview")
  }

  public get createBackupButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Create backup")
  }

  public get restoreBackupButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Restore last backup")
  }

  public get locationTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="location"]')
  }

  public get batteryLevel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="battery-level"]')
  }

  public get fullBatteryIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-FullBattery"]')
  }

  public get veryHighBatteryIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-VeryHighBattery"]')
  }

  public get highBatteryIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-HighBattery"]')
  }

  public get mediumBatteryIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MediumBattery"]')
  }

  public get lowBatteryIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-LowBattery"]')
  }
  public get veryLowBatteryIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-VeryLowBattery"]')
  }

  public get noRangeIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-NoRange"]')
  }

  public get LowRangeIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-LowRange"]')
  }

  public get MediumRangeIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MediumRange"]')
  }

  public get HighRangeIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-HighRange"]')
  }

  public get VeryHighRangeIcon(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-VeryHighRange"]')
  }

  public get disconnectButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="disconnect-button"]')
  }

  public get networkName(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="network-name"]')
  }

  public get pureGrayImage(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="pure-gray"]')
  }

  public get pureBlackImage(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="pure-black"]')
  }

  public get aboutYourPureSerialNumber(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="serial-number-value"]')
  }

  public get overviewSerialNumber(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="device-serial-number"]')
  }

  public get muditaOSVersion(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="os-version"]')
  }
}

export default new OverviewPage()
