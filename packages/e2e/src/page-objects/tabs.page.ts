import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class NavigationTabs extends Page {
  public get tabMuditaNews(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MenuNews"]')
  }

  public get tabOverview(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MenuOverview"]')
  }

  public get tabMessages(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="overview-menu-link"]')
  }

  public get tabContacts(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="contacts-menu-link"]')
  }

  public get tabSettings(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MenuSettings"]')
  }

  public get tabHelp(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="help-menu-button"]')
  }  

}

export default new NavigationTabs()