/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ViewGenerator } from "generic-view/utils"

interface McDemoConfig {
  title: string
}

export const generateMcDemoLayout: ViewGenerator<McDemoConfig> = ({
  title,
}) => {
  return {
    main: {
      screenTitle: title,
      component: "block-plain",
      layout: {
        padding: "2.4rem",
      },
      childrenKeys: ["modalButton"],
    },
    modalButton: {
      component: "button-link",
      config: {
        text: "Open modal",
        action: {
          type: "open-modal",
          modalKey: "demo-modal-1",
        },
      },
    },
    "demo-modal-1": {
      component: "modal",
      childrenKeys: [
        "demo-modal-1-content",
        "demo-modal-2-button",
        "demo-modal-2-button-replace",
        "demo-modal-2-button-permanent",
      ],
    },
    "demo-modal-1-content": {
      component: "text-plain",
    },
    "demo-modal-2-button": {
      component: "button-link",
      config: {
        text: "Open modal 2",
        action: {
          type: "open-modal",
          modalKey: "demo-modal-2",
          domain: "demo",
        },
      },
    },
    "demo-modal-2-button-permanent": {
      component: "button-link",
      config: {
        text: "Open modal 2 and make it permanent",
        action: {
          type: "open-modal",
          modalKey: "demo-modal-2",
          domain: "demo",
          permanent: true,
        },
      },
    },
    "demo-modal-2-button-replace": {
      component: "button-link",
      config: {
        text: "Replace current modal with modal 2",
        action: {
          type: "replace-modal",
          modalKey: "demo-modal-2",
          domain: "demo",
        },
      },
    },
    "demo-modal-2": {
      component: "modal",
      config: {
        width: "60rem",
      },
      childrenKeys: ["demo-modal-2-content", "demo-modal-3-button"],
    },
    "demo-modal-2-content": {
      component: "text-plain",
    },
    "demo-modal-3-button": {
      component: "button-link",
      config: {
        text: "Open modal 3",
        action: {
          type: "open-modal",
          modalKey: "demo-modal-3",
          domain: "demo",
        },
      },
    },
    "demo-modal-3": {
      component: "modal",
      config: {
        width: "50rem",
      },
      childrenKeys: [
        "demo-modal-3-content",
        "demo-modal-close-domain-button",
        "demo-modal-close-all-button",
      ],
    },
    "demo-modal-3-content": {
      component: "text-plain",
    },
    "demo-modal-close-domain-button": {
      component: "button-link",
      config: {
        text: "Close domain modals",
        action: {
          type: "close-domain-modals",
          domain: "demo",
        },
      },
    },
    "demo-modal-close-all-button": {
      component: "button-link",
      config: {
        text: "Close all modals",
        action: {
          type: "close-all-modals",
        },
      },
    },
  }
}

export const mcDemoData = {
  "demo-modal-1-content": {
    content: "This is a demo modal 1 with no domain.",
  },
  "demo-modal-2-content": {
    content: "This is a demo modal 2 with domain 'demo'.",
  },
  "demo-modal-3-content": {
    content: "This is a demo modal 3 with domain 'demo'.",
  },
}
