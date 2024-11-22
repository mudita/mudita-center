/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator } from "generic-view/utils"
import { McFileManagerView } from "generic-view/models"

export const generateMcFileManagerView: ComponentGenerator<
  McFileManagerView
> = (key) => {
  return {
    [key]: {
      component: "block-plain",
      config: {
        backgroundColor: "white",
      },
      layout: {
        width: "100%",
        height: "100%",
        gridLayout: {
          rows: ["1fr"],
          columns: ["1fr"],
        },
      },
      childrenKeys: ["fileManagerForm"],
    },
    fileManagerForm: {
      component: "form",
      config: {
        formOptions: {},
      },
      childrenKeys: ["fileManagerLoader"],
    },
    fileManagerLoader: {
      component: "entities-loader",
      config: {
        entitiesTypes: [],
        text: "Loading, please wait...",
      },
      layout: {
        flexLayout: {
          rowGap: "24px",
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        gridPlacement: {
          row: 1,
          column: 1,
          width: 1,
          height: 2,
        },
      },
      childrenKeys: ["fileManagerWrapper"],
    },
    fileManagerWrapper: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
        },
      },
      childrenKeys: ["fileCategoryList", "fileList"],
    },
    fileCategoryList: {
      component: "block-plain",
      layout: {
        flexPlacement: {
          grow: 1,
          direction: "row",
        },
      },
    },
    fileList: {
      component: "block-plain",
      config: {
        borderLeft: "1px solid #d2d6db",
      },
      layout: {
        width: "656px",
      },
    },
  }
}
