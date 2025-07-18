/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import { SetAppUpdaterCheckPayload } from "app-updater/models"
import AppInitPage from "../page-objects/app-init.page"
import McUpdatePage from "../page-objects/mc-update.page"

export const simulateAppInitUpdateStep = async (payload: SetAppUpdaterCheckPayload) => {
  // should open MC Update Modal
  if (process.env.MOCK_SERVER_ENABLED === "1") {
    await E2EMockClient.connect()

    E2EMockClient.setAppUpdaterCheckResult(payload)
  }
  await AppInitPage.acceptPrivacyPolicy()
}

export const itBehavesLikeAvailableModal = ({
  closeVisible,
}: {
  closeVisible: boolean
}) => {
  describe("Available Update Modal", () => {
    it("should display all core modal elements", async () => {
      await expect(McUpdatePage.updateAvailableModal).toBeDisplayed()
      await expect(McUpdatePage.updateAvailableModalTitle).toBeDisplayed()
      await expect(McUpdatePage.updateAvailableModalTitleIcon).toBeDisplayed()
      await expect(McUpdatePage.updateAvailableModalDescription).toBeDisplayed()
    })

    if (closeVisible) {
      it("should display the modal close button", async () => {
        await expect(
          McUpdatePage.updateAvailableModalCloseButton
        ).toBeDisplayed()
      })
    } else {
      it("should not display the modal close button", async () => {
        await expect(
          McUpdatePage.updateAvailableModalCloseButton
        ).not.toBeDisplayed()
      })
    }

    it("should display action controls", async () => {
      await expect(McUpdatePage.updateAvailableModalButton).toBeDisplayed()
      await expect(
        McUpdatePage.updateAvailableModalPrivacyPolicyLink
      ).toBeDisplayed()
      await expect(McUpdatePage.updateAvailableModalCheckbox).toBeDisplayed()
    })

    it("should keep the Update button disabled until checkbox is checked", async () => {
      await expect(McUpdatePage.updateAvailableModalButton).toBeDisabled()
      await expect(McUpdatePage.updateAvailableModalButton).not.toBeClickable()
    })

    it("should enable the Update button after checking the checkbox", async () => {
      await McUpdatePage.updateAvailableModalCheckbox.click()
      await expect(McUpdatePage.updateAvailableModalButton).toBeEnabled()
    })

    it("should open the In Progress modal on clicking Update", async () => {
      await McUpdatePage.updateAvailableModalButton.click()
      await expect(McUpdatePage.updateInProgressModal).toBeDisplayed()
    })
  })
}

export const itBehavesLikeUpdateInProgressModal = () => {
  describe("Update In Progress Modal", () => {
    it("should display modal header and icon", async () => {
      await expect(McUpdatePage.updateInProgressModalTitle).toBeDisplayed()
      await expect(McUpdatePage.updateInProgressModalTitleIcon).toBeDisplayed()
    })

    it("should not show close button while updating", async () => {
      await expect(
        McUpdatePage.updateInProgressModalCloseButton
      ).not.toBeDisplayed()
    })

    it("should display description and initial progress", async () => {
      await expect(
        McUpdatePage.updateInProgressModalDescription
      ).toBeDisplayed()
      await expect(
        McUpdatePage.updateInProgressModalProgressBarDetails
      ).toHaveText("0%")
    })

    it("should update progress label as download progresses", async () => {
      E2EMockClient.emitAppUpdaterDownloadProgressEvent(10)
      await expect(
        McUpdatePage.updateInProgressModalProgressBarDetails
      ).toHaveText("10%")

      E2EMockClient.emitAppUpdaterDownloadProgressEvent(100)
      await expect(
        McUpdatePage.updateInProgressModalProgressBarDetails
      ).toHaveText("100%")
    })
  })
}
