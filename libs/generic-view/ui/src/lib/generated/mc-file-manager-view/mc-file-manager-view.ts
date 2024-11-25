/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McFileManagerView } from "generic-view/models"
import { generateFileCategoryList } from "./file-category-list"

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
        formOptions: {
          defaultValues: {
            activeFileCategoryId: "0",
            fileCategoryIds: ["0", "1", "2", "3"],
          },
        },
      },
      childrenKeys: ["fileManagerLoader"],
    },
    fileManagerLoader: {
      component: "entities-loader",
      config: {
        entitiesTypes: [
          "audioFiles",
          "imageFiles",
          "ebookFiles",
          "applicationFiles",
        ],
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
      childrenKeys: ["fileCategoriesContainer", "fileList"],
    },
    fileCategoriesContainer: {
      component: "block-plain",
      layout: {
        flexPlacement: {
          grow: 1,
          direction: "row",
        },
      },
      childrenKeys: ["fileCategoryList"],
    },
    ...generateFileCategoryList({
      categories: [
        {
          id: "0",
          name: "Music",
          icon: IconType.EighthNote,
          entitiesType: "audioFiles",
        },
        {
          id: "1",
          name: "Photos",
          icon: IconType.PhotoCatalog,
          entitiesType: "imageFiles",
        },
        {
          id: "2",
          name: "Ebooks",
          icon: IconType.Book,
          entitiesType: "ebookFiles",
        },
        {
          id: "3",
          name: "Apps",
          icon: IconType.Grid,
          entitiesType: "applicationFiles",
        },
      ],
    }),
    fileList: {
      component: "block-plain",
      config: {
        borderLeft: "1px solid #d2d6db",
      },
      layout: {
        width: "656px",
        gridLayout: {
          rows: ["auto", "1fr"],
          columns: [],
        },
      },
      childrenKeys: ["fileListPanel", "fileListContent"],
    },
    fileListPanel: {
      component: "block-plain",
      layout: {
        margin: "28px 32px",
        height: "40px",
        gridLayout: {
          rows: [],
          columns: [],
          alignItems: "center",
        },
      },
      childrenKeys: ["fileListPanelHeader"],
    },
    fileListPanelHeader: {
      component: "h3-component",
      config: {
        text: "Music",
      },
    },
    fileListContent: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: [],
          columns: [],
        },
      },
      childrenKeys: ["fileListEmptyState"],
    },
    fileListEmptyState: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        padding: "0 0 96px 0",
      },
      childrenKeys: [
        "fileListEmptyStateHeader",
        "fileListEmptyStateDescription",
        "fileListEmptyStateAddFileButton",
      ],
    },
    fileListEmptyStateHeader: {
      component: "h4-component",
      layout: {
        margin: "0 0 8px 0",
      },
      config: {
        text: "We couldn't find any files",
      },
    },
    fileListEmptyStateDescription: {
      component: "p3-component",
      layout: {
        margin: "0 auto 24px auto",
        width: "362px",
      },
      config: {
        text: "Add music files from your computer and they’ll transfer\nto your device automatically.",
        textAlign: "center",
      },
    },
    fileListEmptyStateAddFileButton: {
      component: "button-primary",
      layout: {
        width: "156px",
      },
      config: {
        text: "Add file",
        actions: [],
      },
    },
  }
}
