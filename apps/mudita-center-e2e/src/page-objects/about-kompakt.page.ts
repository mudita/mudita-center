/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class AboutKompaktPage extends Page {
  public get aboutHeader() {
    return $("h3*=About your device")
  }

  public get aboutSubtitle() {
    return $("p*=Device details")
  }

  public get backToOverviewIcon() {
    return $('[data-testid="icon-ArrowLongLeft"]')
  }

  public get backToOverviewLabel() {
    return $('[data-testid="location"]')
  }

  public get serialNumberLabel() {
    return $('[data-testid="about-data-box-label-serial-number"]')
  }

  public get serialNumberValue() {
    return $('[data-testid="about-data-box-value-serial-number"]')
  }

  public get imei1Label() {
    return $('[data-testid="about-data-box-label-imei-(sim-slot-1)"]')
  }

  public get imei1Value() {
    return $('[data-testid="about-data-box-value-imei-(sim-slot-1)"]')
  }

  public get imei2Label() {
    return $('[data-testid="about-data-box-label-imei-(sim-slot-2)"]')
  }

  public get imei2Value() {
    return $('[data-testid="about-data-box-value-imei-(sim-slot-2)"]')
  }

  public get sarLabel() {
    return $('[data-testid="about-data-box-label-sar"]')
  }

  public get sarButton() {
    return $('[data-testid="button-text_sarmodal-button"]')
  }

  public get sarHeader() {
    return $("h3*=SAR")
  }
}
export default new AboutKompaktPage()
