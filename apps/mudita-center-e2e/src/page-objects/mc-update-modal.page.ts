import Page from "./page";

class MCModalPage extends Page {
    get modalHeader() {
        return $('[data-testid="modal-title"]')
    }

    get modalContentUpToDate() {
        return $('[data-testid="app-update-not-available"]')
    }
} export default new MCModalPage()