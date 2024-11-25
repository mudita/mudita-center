/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType } from "generic-view/utils"
import { McFileManagerView } from "generic-view/models"
import { generateFileCategoryList } from "./file-category-list"
import { generateFileListWrapper } from "./file-list"

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
      childrenKeys: ["fileCategoryList"],
    },
    ...generateFileCategoryList({
      configs: [
        {
          id: "0",
          name: "Music",
          icon: IconType.EighthNote,
        },
        {
          id: "1",
          name: "Photos",
          icon: IconType.PhotoCatalog,
        },
        {
          id: "2",
          name: "Ebooks",
          icon: IconType.Book,
        },
        {
          id: "3",
          name: "Apps",
          icon: IconType.Grid,
        },
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
