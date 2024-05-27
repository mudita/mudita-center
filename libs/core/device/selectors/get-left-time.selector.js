"use strict";
/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeftTimeSelector = void 0;
var reselect_1 = require("reselect");
var moment_1 = __importDefault(require("moment"));
var device_state_selector_1 = require("Core/device/selectors/device-state.selector");
exports.getLeftTimeSelector = (0, reselect_1.createSelector)(device_state_selector_1.deviceStateSelector, function (_a) {
    var data = _a.data;
    if (data === null) {
        return undefined;
    }
    var _b = data, timeLeftToNextAttempt = _b.timeLeftToNextAttempt, phoneLockTime = _b.phoneLockTime;
    if (phoneLockTime === undefined && timeLeftToNextAttempt === undefined) {
        return undefined;
    }
    if (phoneLockTime !== undefined && timeLeftToNextAttempt === undefined) {
        return moment_1.default.unix(phoneLockTime).diff((0, moment_1.default)(), "s");
    }
    else {
        return timeLeftToNextAttempt;
    }
});
//# sourceMappingURL=get-left-time.selector.js.map