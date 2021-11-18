/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MetadataKey } from "App/metadata/constants"
import { MetadataStore } from "App/metadata/services"

import { version } from "../../../package.json"

export class MetadataInitializer {
  constructor(private metadataStore: MetadataStore) {}

  public init(): void {
    // Add new static key here
    this.metadataStore.setValue(MetadataKey.MuditaCenterVersion, version)
  }
}
