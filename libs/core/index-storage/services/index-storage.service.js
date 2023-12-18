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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexStorageService = void 0;
var path_1 = __importDefault(require("path"));
var get_app_path_1 = __importDefault(require("Core/__deprecated__/main/utils/get-app-path"));
var constants_1 = require("Core/index-storage/constants");
var constants_2 = require("Core/metadata/constants");
var elasticlunr_1 = __importDefault(require("elasticlunr"));
var cacheFileNames = (_a = {},
    _a[constants_1.DataIndex.Contact] = "contacts.json",
    _a[constants_1.DataIndex.Message] = "messages.json",
    _a[constants_1.DataIndex.Thread] = "threads.json",
    _a[constants_1.DataIndex.Template] = "templates.json",
    _a);
var IndexStorageService = /** @class */ (function () {
    function IndexStorageService(index, keyStorage, fileSystemService) {
        this.index = index;
        this.keyStorage = keyStorage;
        this.fileSystemService = fileSystemService;
    }
    IndexStorageService.prototype.loadIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, serialNumber, files, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = String(this.keyStorage.getValue(constants_2.MetadataKey.DeviceToken));
                        serialNumber = String(this.keyStorage.getValue(constants_2.MetadataKey.DeviceSerialNumber));
                        if (!token || !serialNumber) {
                            return [2 /*return*/, false];
                        }
                        files = Object.entries(cacheFileNames);
                        return [4 /*yield*/, Promise.all(files.map(function (value) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    // AUTO DISABLED - fix me if you like :)
                                    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
                                    return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a, indexName, fileName, filePath, exists, data;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        _a = __read(value, 2), indexName = _a[0], fileName = _a[1];
                                                        filePath = this.getCacheFilePath(fileName, serialNumber);
                                                        return [4 /*yield*/, this.fileSystemService.exists(filePath)];
                                                    case 1:
                                                        exists = _b.sent();
                                                        if (!exists) {
                                                            resolve(false);
                                                            return [2 /*return*/];
                                                        }
                                                        return [4 /*yield*/, this.fileSystemService.readEncryptedFile(filePath, token)];
                                                    case 2:
                                                        data = _b.sent();
                                                        if (data === undefined) {
                                                            resolve(false);
                                                            return [2 /*return*/];
                                                        }
                                                        try {
                                                            this.index.set(indexName, elasticlunr_1.default.Index.load(JSON.parse(data.toString("utf-8"))));
                                                            resolve(true);
                                                        }
                                                        catch (_c) {
                                                            resolve(false);
                                                        }
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                });
                            }); }))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.every(function (value) { return value; })];
                }
            });
        });
    };
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    IndexStorageService.prototype.saveIndex = function () {
        var _this = this;
        var token = String(this.keyStorage.getValue(constants_2.MetadataKey.DeviceToken));
        var serialNumber = String(this.keyStorage.getValue(constants_2.MetadataKey.DeviceSerialNumber));
        if (!token || !serialNumber) {
            return;
        }
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        Object.entries(cacheFileNames).forEach(function (value) { return __awaiter(_this, void 0, void 0, function () {
            var _a, indexName, fileName, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = __read(value, 2), indexName = _a[0], fileName = _a[1];
                        data = this.index.get(indexName);
                        return [4 /*yield*/, this.fileSystemService.writeEncryptedFile(this.getCacheFilePath(fileName, serialNumber), Buffer.from(JSON.stringify(data)), token)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    IndexStorageService.prototype.getCacheFilePath = function (filePath, serialNumber) {
        return path_1.default.join((0, get_app_path_1.default)(), "cache", serialNumber, filePath);
    };
    return IndexStorageService;
}());
exports.IndexStorageService = IndexStorageService;
//# sourceMappingURL=index-storage.service.js.map