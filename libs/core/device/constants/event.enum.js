"use strict";
/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceEvent = void 0;
var DeviceEvent;
(function (DeviceEvent) {
    DeviceEvent["SetInitState"] = "DEVICE_SET_INIT_STATE";
    DeviceEvent["Unlock"] = "DEVICE_UNLOCK";
    DeviceEvent["UnlockInactive"] = "DEVICE_UNLOCK_INACTIVE";
    DeviceEvent["Locked"] = "DEVICE_LOCKED";
    DeviceEvent["Unlocked"] = "DEVICE_UNLOCKED";
    DeviceEvent["SetLockTime"] = "DEVICE_SET_LOCK_TIME";
    DeviceEvent["GetUnlockedStatus"] = "DEVICE_GET_UNLOCKED_STATUS";
    DeviceEvent["GetUnlockedStatusInactive"] = "DEVICE_GET_UNLOCKED_STATUS_INACTIVE";
    DeviceEvent["SetUnlockedStatus"] = "DEVICE_SET_UNLOCKED_STATUS";
    DeviceEvent["GetOnboardingStatus"] = "DEVICE_GET_ONBOARDING_STATUS";
    DeviceEvent["SetOnboardingStatus"] = "DEVICE_SET_ONBOARDING_STATUS";
    DeviceEvent["SetRestartingStatus"] = "DEVICE_SET_RESTARTING_STATUS";
    DeviceEvent["SetCriticalBatteryLevelStatus"] = "DEVICE_SET_CRITICAL_BATTERY_LEVEL_STATUS";
    DeviceEvent["SetExternalUsageDevice"] = "DEVICE_SET_EXTERNAL_USAGE_DEVICE";
    DeviceEvent["LoadStorageInfo"] = "DEVICE_LOAD_STORAGE_INFO";
    DeviceEvent["LoadDeviceData"] = "DEVICE_LOAD_DEVICE_DATA";
    DeviceEvent["ProcessDeviceDataOnLoad"] = "DEVICE_PROCESS_DEVICE_DATA_ON_LOAD";
    DeviceEvent["HandleCommunicationError"] = "DEVICE_HANDLE_COMMUNICATION_ERROR";
})(DeviceEvent || (exports.DeviceEvent = DeviceEvent = {}));
//# sourceMappingURL=event.enum.js.map