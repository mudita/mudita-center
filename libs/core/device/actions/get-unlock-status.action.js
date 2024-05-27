"use strict";
/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnlockStatusInactive = exports.getUnlockStatus = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var constants_1 = require("Core/device/constants");
var requests_1 = require("Core/device/requests");
var base_action_1 = require("Core/device/actions/base.action");
var selectors_1 = require("Core/device/selectors");
var handle_communication_error_action_1 = require("Core/device/actions/handle-communication-error.action");
exports.getUnlockStatus = (0, toolkit_1.createAsyncThunk)(constants_1.DeviceEvent.GetUnlockedStatus, function (deviceId, _a) {
    var dispatch = _a.dispatch, getState = _a.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, ok, error, leftTime;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, requests_1.unlockDeviceStatusRequest)(deviceId)];
                case 1:
                    _b = _c.sent(), ok = _b.ok, error = _b.error;
                    leftTime = (0, selectors_1.getLeftTimeSelector)(getState());
                    if (ok && leftTime !== undefined) {
                        dispatch((0, base_action_1.setLockTime)(undefined));
                    }
                    if (!error) return [3 /*break*/, 3];
                    return [4 /*yield*/, dispatch((0, handle_communication_error_action_1.handleCommunicationError)(error))];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3: return [2 /*return*/, ok];
            }
        });
    });
});
exports.getUnlockStatusInactive = (0, toolkit_1.createAsyncThunk)(constants_1.DeviceEvent.GetUnlockedStatusInactive, function (deviceId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ok, error, leftTimeResponse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, requests_1.unlockDeviceStatusRequest)(deviceId)];
            case 1:
                _a = _b.sent(), ok = _a.ok, error = _a.error;
                return [4 /*yield*/, (0, requests_1.deviceLockTimeRequest)(deviceId)];
            case 2:
                leftTimeResponse = _b.sent();
                console.log(ok, leftTimeResponse);
                if (ok &&
                    leftTimeResponse.ok &&
                    leftTimeResponse.data.timeLeftToNextAttempt !== undefined) {
                    return [2 /*return*/, leftTimeResponse.data.timeLeftToNextAttempt];
                }
                return [2 /*return*/, undefined];
        }
    });
}); });
//# sourceMappingURL=get-unlock-status.action.js.map