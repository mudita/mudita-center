/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MetadataKey } from "Core/metadata/constants"
import { MetadataStore } from "Core/metadata/services"

import packageInfo from "../../../../apps/mudita-center/package.json"

export class MetadataInitializer {
  constructor(private metadataStore: MetadataStore) {}

  public init(): void {
    // Add new static key here
    this.metadataStore.setValue(
      MetadataKey.MuditaCenterVersion,
      packageInfo.version
    )
  }
}
