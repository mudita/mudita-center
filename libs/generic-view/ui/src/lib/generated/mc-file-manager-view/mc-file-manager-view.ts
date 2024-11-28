/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McFileManagerView } from "generic-view/models"
import { generateFileCategoryList } from "./file-category-list"
import { generateFileListWrapper } from "./file-list"
import { generateOtherFilesList } from "./other-files-list"

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
      childrenKeys: ["fileCategoryList", "fileCategoryOtherFilesItem"],
    },
    ...generateFileCategoryList({
      configs: [
        {
          id: "0",
          name: "Music",
          icon: IconType.EighthNote,
          markerColor: "#E38577",
          entitiesType: "audioFiles",
        },
        {
          id: "1",
          name: "Photos",
          icon: IconType.PhotoCatalog,
          markerColor: "#0E7490",
          entitiesType: "imageFiles",
        },
        {
          id: "2",
          name: "Ebooks",
          icon: IconType.Book,
          markerColor: "#A8DADC",
          entitiesType: "ebookFiles",
        },
        {
          id: "3",
          name: "Apps",
          icon: IconType.Grid,
          markerColor: "#AEBEC9",
          entitiesType: "applicationFiles",
        },
      ],
    }),
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
    ...generateFileListWrapper({
      configs: [
        {
          id: "0",
          name: "Music",
        },
        {
          id: "1",
          name: "Photos",
        },
        {
          id: "2",
          name: "Ebooks",
        },
        {
          id: "3",
          name: "Apps",
        },
      ],
    }),
  }
}
