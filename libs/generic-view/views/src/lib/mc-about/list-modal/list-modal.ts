/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, View, ViewGenerator } from "generic-view/utils"
import { AboutData, DetailListModalConfig } from "device/models"

enum ListModalKeys {
  Button = "modal-button",
  Modal = "modal",
  ModalContent = "modal-content",
}

export const generateMcAboutListModalLayout: ViewGenerator<
  DetailListModalConfig,
  Subview
> = (config) => {
  return {
    [config.dataKey]: {
      component: "about-data-box",
      config: {
        title: config.title,
      },
      childrenKeys: [config.dataKey + ListModalKeys.Button],
    },
    [config.dataKey + ListModalKeys.Button]: {
      component: "button-link",
      config: {
        text: config.buttonText,
        action: {
          type: "open-modal",
          modalKey: config.dataKey + ListModalKeys.Modal,
        },
      },
    },
    [config.dataKey + ListModalKeys.Modal]: {
      component: "modal",
      childrenKeys: [config.dataKey + ListModalKeys.ModalContent],
    },
    [config.dataKey + ListModalKeys.ModalContent]: {
      component: "text-formatted",
    },
  }
}

export const generateMcAboutListModalData = (data: AboutData, config: View) => {
  const modalContentKeys = Object.entries(config)
    .filter(([key, item]) => {
      return item.component === "about-data-box" && item.childrenKeys
    })
    .map(([key]) => key)
  return Object.entries(data).reduce((acc, [key, item]) => {
    if (modalContentKeys.includes(key)) {
      return {
        ...acc,
        [key + ListModalKeys.ModalContent]: item,
      }
    }
    return {
      ...acc,
      [key]: item,
    }
  }, {})
}
