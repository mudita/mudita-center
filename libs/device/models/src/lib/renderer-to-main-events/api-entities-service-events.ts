/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum APIEntitiesServiceEvents {
  EntitiesConfig = "apiservice_entities-config",
  EntitiesMetadata = "apiservice_entities-metadata",
  EntitiesDataGet = "apiservice_entities-data-get",
  EntitiesDataReadFromFile = "apiservice_entities-data-read-from-file",
  EntityDataReadFromFile = "apiservice_entity-data-read-from-file",
  EntitiesDataDelete = "apiservice_entity-data-delete",
  EntityDataCreate = "apiservice_entity-data-create",
  EntityDataUpdate = "apiservice_entity-data-update",
}
