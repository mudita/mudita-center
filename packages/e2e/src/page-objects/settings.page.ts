/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class SettingsPage extends Page {
  public get locationTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="location"]')
  }

  public get generalTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('a[href="#/settings"] [data-testid="icon-Connection"]')
  }

  public get backupTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('a[href="#/settings/backup"]')
  }

  public get aboutTab(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return $('a[href="#/settings/about"]')
  }

  public get generalSendLogsTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Send Mudita Center logs to Mudita")
  }

  public get backupLocationPathTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="backup-location"]')
  }

  public get aboutInstalledVersionTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Mudita Center - installed version:")
  }

  public get aboutTermsOfServiceTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Terms of service")
  }

  public get aboutTermsOfServiceButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="terms-of-service-button"]')
  }

  public get aboutTermsOfServiceComponentWrapper(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="terms-of-service-component-wrapper"]')
  }

  public get aboutPrivacyPolicyTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Privacy Policy")
  }

  public get aboutPrivacyPolicyButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="about-privacy-policy-button"]')
  }

  public get aboutPrivacyPolicyComponentWrapper(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="privacy-policy-component-wrapper"]')
  }

  public get aboutLicenseTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=License")
  }

  public get aboutLicenseButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="about-license-button"]')
  }

  public get aboutLicenseComponentWrapper(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="License-component-wrapper"]')
  }

  public get closeButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-Close"]')
  }

  public get addToFavouritessCheckbox(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[name="favourite"]')
  }

  public get cancelButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Cancel")
  }

  public get saveButton(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="save-button"]')
  }

  public get noContactsText(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="contact-list-no-result]')
  }
}

export default new SettingsPage()
