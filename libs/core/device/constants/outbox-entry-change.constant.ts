/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum OutboxEntryChange {
  Created = 1,
  Updated,
  Deleted,

  // to handle Entry relation
  Relation = 100,
}
