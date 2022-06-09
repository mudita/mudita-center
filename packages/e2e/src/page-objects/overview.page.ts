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
    return $('[data-testid="icon-MenuPhone"]')
  }

  public get checkSARInfoLink(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $("p*=Check SAR information")
  }

  public get sarWrapper(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="sar-wrapper"]')
  }

  public get locationTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="location"]')
  }
}

export default new OverviewPage()
