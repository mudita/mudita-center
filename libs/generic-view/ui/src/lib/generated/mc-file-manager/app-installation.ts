/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"

export const generateAppInstallaion: ComponentGenerator<{
  id: string
  entityType: string
}> = (key, { id, entityType }) => {
  return {
    [`${key}${id}startAppInstallationModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [`${key}${id}startAppInstallationModalForm`],
    },
    [`${key}${id}startAppInstallationModalForm`]: {
      component: "form",
      config: {
        formOptions: {
          defaultValues: {
            userEnabledAppInstallation: false,
          },
        },
      },
      childrenKeys: [
        `${key}${id}startAppInstallationModalIcon`,
        `${key}${id}startAppInstallationModalTitle`,
        `${key}${id}startAppInstallationModalContent`,
        `${key}${id}startAppInstallationModalButtons`,
      ],
    },
    [`${key}${id}startAppInstallationModalIcon`]: {
      component: "modal.titleIcon",
      config: {
        type: IconType.Exclamation,
      },
    },
    [`${key}${id}startAppInstallationModalTitle`]: {
      component: "modal.title",
      childrenKeys: [`${key}${id}startAppInstallationModalTitleText`],
    },
    [`${key}${id}startAppInstallationModalTitleText`]: {
      component: "format-message",
      config: {
        messageTemplate: "App installation",
      },
    },
    [`${key}${id}startAppInstallationModalContent`]: {
      component: "block-plain",
      childrenKeys: [
        `${key}${id}startAppInstallationModalContentText`,
        `${key}${id}startAppInstallationModalContentCheck`,
      ],
      layout: {
        gridPlacement: {
          row: 1,
          column: 1,
          width: 1,
          height: 1,
        },
      },
    },
    [`${key}${id}startAppInstallationModalContentText`]: {
      component: "typography.p1",
      layout: {
        margin: "0 0 24px 0",
      },
      config: {
        messageTemplate:
          "Warning! Installing {fileName} may void your device's warranty. Continuing the install means you understand accept this risk.",
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}${id}fileListForm`,
        fields: [
          {
            providerField: "activeFileName",
            componentField: "data.fields.fileName",
          },
        ],
      },
    },
    [`${key}${id}startAppInstallationModalContentCheck`]: {
      component: "form.checkboxInput",
      config: {
        name: "userEnabledAppInstallation",
        size: "large",
      },
      childrenKeys: [`${key}${id}startAppInstallationModalContentCheckText`],
    },
    [`${key}${id}startAppInstallationModalContentCheckText`]: {
      component: "typography.h5",
      layout: {
        margin: "0 0 0 14px",
      },
      config: {
        text: "I understand and accept this risk",
      },
    },
    [`${key}${id}startAppInstallationModalButtons`]: {
      component: "modal.buttons",
      childrenKeys: [
        `${key}${id}startAppInstallationModalCancelButton`,
        `${key}${id}startAppInstallationModalConfirmButton`,
      ],
    },
    [`${key}${id}startAppInstallationModalCancelButton`]: {
      component: "button-secondary",
      config: {
        text: "Back",
        actions: [
          {
            type: "close-modal",
            modalKey: `${key}${id}startAppInstallationModal`,
          },
        ],
      },
    },
    [`${key}${id}startAppInstallationModalConfirmButton`]: {
      component: "button-primary",
      config: {
        actions: [
          {
            type: "close-modal",
            modalKey: `${key}${id}startAppInstallationModal`,
          },
          {
            type: "open-modal",
            modalKey: `${key}${id}progressAppInstallationModal`,
          },
          {
            type: "start-app-installation",
            filePath: "",
            fileName: "",
          },
        ],
      },
      childrenKeys: [`${key}${id}startAppInstallationModalConfirmButtonText`],
      layout: {
        flexLayout: {
          direction: "row",
          justifyContent: "center",
        },
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}${id}startAppInstallationModalForm`,
        fields: [
          {
            providerField: "userEnabledAppInstallation",
            componentField: "config.disabled",
            modifier: "boolean",
            condition: "eq",
            value: false,
          },
        ],
      },
      dataProviderSecondary: {
        source: "form-fields",
        formKey: `${key}${id}fileListForm`,
        fields: [
          {
            providerField: "activeFilePath",
            componentField: "config.actions[2].filePath",
          },
          {
            providerField: "activeFileName",
            componentField: "config.actions[2].fileName",
          },
        ],
      },
    },
    [`${key}${id}startAppInstallationModalConfirmButtonText`]: {
      component: "format-message",
      config: {
        messageTemplate: "Continue Install",
      },
    },
    [`${key}${id}progressAppInstallationModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [`${key}${id}progressAppInstallationModalContent`],
    },
    [`${key}${id}progressAppInstallationModalContent`]: {
      component: "mc-app-installation-progress",
      config: {
        progressModalKey: `${key}${id}progressAppInstallationModal`,
        completeModalKey: `${key}${id}completeAppInstallationModal`,
        errorModalKey: `${key}${id}errorAppInstallationModal`,
      },
    },
    [`${key}${id}errorAppInstallationModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [`${key}${id}errorAppInstallationModalContent`],
    },
    [`${key}${id}errorAppInstallationModalContent`]: {
      component: "mc-app-installation-error",
      config: {
        modalKey: `${key}${id}errorAppInstallationModal`,
      },
    },
    [`${key}${id}completeAppInstallationModal`]: {
      component: "modal",
      config: {
        size: "small",
      },
      childrenKeys: [`${key}${id}completeAppInstallationModalContent`],
    },
    [`${key}${id}completeAppInstallationModalContent`]: {
      component: "mc-app-installation-success",
      config: {
        modalKey: `${key}${id}completeAppInstallationModal`,
      },
    },
  }
}
