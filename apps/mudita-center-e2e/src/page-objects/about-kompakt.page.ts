/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class AboutKompaktPage extends Page {
  public get aboutHeader() {
    return $("h3*=About your device")
  }

  public get backToOverviewIcon() {
    return $('[data-testid="icon-ArrowLongLeft"]')
  }

  public get backToOverviewLabel() {
    return $('[data-testid="location"]')
  }

  public get serialNumberLabel() {
    return $("p*=Serial number")
  }

  public get serialNumberValue() {
    return $(`//div[@componentkey="details"]/div[1]/p[2]`)
  }

  public get imei1Label() {
    return $("p*=IMEI (sim slot 1)")
  }

  public get imei1Value() {
    return $(`//div[@componentkey="details"]/div[2]/p[2]`)
  }

  public get imei2Label() {
    return $("p*=IMEI (sim slot 2)")
  }

  public get imei2Value() {
    return $(`//div[@componentkey="details"]/div[3]/p[2]`)
  }

  public get sarLabel() {
    return $("p*=SAR")
  }

  public get sarButton() {
    return $('[data-testid="button-text_sarmodal-button"]')
  }

  public get sarHeader() {
    return $("h3*=SAR")
  }
}
export default new AboutKompaktPage()
