import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class SettingsPage extends Page {


    public get tabGeneral(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
    > {
    return $('[data-testid="icon-Connection"]')
    }

    public get tabBackup(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-BackupFolder"]')
    }

    public get tabAbout(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
    > {
    return $('[data-testid="icon-MuditaLogo"]')
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
    
    public get aboutPrivacyPolicyTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
    > {
        return $("p*=Privacy Policy")
    }

    public get aboutLicenseTextLabel(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
    > {
        return $("p*=License")
    }

    public get closeBtn(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
    > {
    return $('[data-testid="icon-Close"]')
    }

    public get addToFavouritessCheckbox(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
    > {
    return $('[name="favourite"]')
    }

    public get cancelBtn(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
    > {
    return $("p=Cancel")
    }

    public get saveBtn(): ChainablePromiseElement<
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