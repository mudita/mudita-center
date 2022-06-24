/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template } from "App/templates/dto"
import { UseTableSelect } from "App/__deprecated__/renderer/utils/hooks/useTableSelect"

type SelectHook = Pick<
  UseTableSelect<Template>,
  "getRowStatus" | "toggleRow" | "noneRowsSelected"
>

export interface TemplatesListProps extends SelectHook {
  templates: Template[]
  deleteTemplates: (ids: string[]) => void
}
