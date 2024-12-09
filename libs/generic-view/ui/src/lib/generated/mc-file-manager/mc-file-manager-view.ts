/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McFileManagerView } from "generic-view/models"
import { generateFileCategoryList } from "./file-category-list"
import { generateFileListWrapper } from "./file-list"
import { generateOtherFilesList } from "./other-files-list"
import { generateStorageSummaryBar } from "./storage-summary-bar"

export const generateMcFileManagerView: ComponentGenerator<
  McFileManagerView
> = (key, config) => {
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
            fileCategoryIds: config.entityTypes.map((_, index) =>
              index.toString()
            ),
          },
        },
      },
      childrenKeys: ["fileManagerLoader"],
    },
    fileManagerLoader: {
      component: "entities-loader",
      config: {
        entityTypes: config.entityTypes,
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
      childrenKeys: ["fileCategoriesContainer", "fileListWrapper"],
    },
    fileCategoriesContainer: {
      component: "block-plain",
      layout: {
        flexPlacement: {
          grow: 1,
          direction: "row",
        },
      },
      childrenKeys: [
        "storageSummary",
        "fileCategoryList",
        "fileCategoryOtherFilesItem",
      ],
    },
    storageSummary: {
      component: "block-plain",
      layout: {
        padding: "32px 32px 64px 32px",
        flexLayout: {
          direction: "column",
        },
      },
      childrenKeys: ["storageSummaryHeader", "storageSummaryContent"],
    },
    storageSummaryHeader: {
      component: "h3-component",
      layout: {
        margin: "0 0 24px 0",
      },
      config: {
        text: "Phone storage",
      },
    },
    storageSummaryContent: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: ["auto", "auto"],
          columns: ["auto", "auto"],
        },
      },
      childrenKeys: [
        "storageSummaryUsedText",
        "storageSummaryFreeText",
        "storageSummaryBar",
      ],
    },
    storageSummaryUsedText: {
      component: "p3-component",
      config: {
        // TODO: Refactor to template after https://appnroll.atlassian.net/browse/CP-3275
        text: "Used: 0 KB",
        color: "black",
      },
      layout: {
        gridPlacement: {
          row: 1,
          column: 1,
          width: 1,
          height: 1,
        },
      },
    },
    storageSummaryFreeText: {
      component: "p3-component",
      config: {
        text: "0",
        color: "grey2",
        textTransform: "format-bytes",
        textTransformOptions: {
          minUnit: "KB",
        },
      },
      layout: {
        gridPlacement: {
          row: 1,
          column: 2,
          width: 1,
          height: 1,
        },
        flexLayout: {
          direction: "row",
          justifyContent: "flex-end",
        },
      },
    },
    ...generateStorageSummaryBar(config.entityTypes),
    ...generateFileCategoryList(config.entityTypes),
    fileCategoryOtherFilesItem: {
      component: "block-plain",
      layout: {
        padding: "28px 32px 10px 32px",
        gridLayout: {
          rows: [],
          columns: ["auto", "auto"],
          justifyContent: "space-between",
        },
      },
      childrenKeys: [
        "fileCategoryOtherFilesItemName",
        "fileCategoryOtherFilesItemInfoIconWrapper",
      ],
    },
    fileCategoryOtherFilesItemName: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
          alignItems: "center",
        },
      },
      childrenKeys: [
        "fileCategoryOtherFilesItemNameText",
        "fileCategoryOtherFilesItemNameSize",
      ],
    },
    fileCategoryOtherFilesItemNameText: {
      component: "h4-component",
      config: {
        text: "Other files",
      },
    },
    fileCategoryOtherFilesItemNameSize: {
      component: "p3-component",
      layout: {
        margin: "0 0 0 3px",
      },
      config: {
        // TODO: Refactor to template after https://appnroll.atlassian.net/browse/CP-3275
        text: "(0 KB)",
        color: "black",
      },
    },
    fileCategoryOtherFilesItemInfoIconWrapper: {
      component: "block-plain",
      gridPlacement: {
        justifySelf: "end",
      },
      childrenKeys: ["fileCategoryOtherFilesItemInfoIconTooltip"],
    },
    fileCategoryOtherFilesItemInfoIconTooltip: {
      component: "tooltip",
      config: {
        offset: {
          x: 10,
          y: 0,
        },
        placement: "bottom-left",
      },
      childrenKeys: [
        "fileCategoryOtherFilesItemInfoIconTooltipAnchor",
        "fileCategoryOtherFilesItemInfoIconTooltipContent",
      ],
    },
    fileCategoryOtherFilesItemInfoIconTooltipAnchor: {
      component: "tooltip.anchor",
      childrenKeys: ["fileCategoryOtherFilesItemInfoIcon"],
    },
    fileCategoryOtherFilesItemInfoIcon: {
      component: "icon",
      layout: {
        width: "25px",
        height: "auto",
      },
      config: {
        type: IconType.Information,
        color: "black",
        size: "small",
      },
    },
    fileCategoryOtherFilesItemInfoIconTooltipContent: {
      component: "tooltip.content",
      childrenKeys: ["otherFilesList"],
    },
    ...generateOtherFilesList({
      configs: [
        { id: "0", name: "System" },
        { id: "1", name: "Other" },
      ],
    }),
    ...generateFileListWrapper(config.entityTypes),
  }
}
