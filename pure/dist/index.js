"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manufacturer = exports.productId = void 0;
var events_1 = require("events");
var serialport_1 = __importDefault(require("serialport"));
var usb_detector_1 = __importDefault(require("./usb-detector"));
var phone_port_1 = require("./phone-port");
var types_1 = require("./types");
exports.productId = "0100";
exports.manufacturer = "Mudita";
var PureNodeEvent;
(function (PureNodeEvent) {
    PureNodeEvent["AttachedPhone"] = "AttachedPhone";
})(PureNodeEvent || (PureNodeEvent = {}));
var PureNode = /** @class */ (function () {
    function PureNode(createPhonePort, usbDetector) {
        var _this = this;
        this.createPhonePort = createPhonePort;
        this.usbDetector = usbDetector;
        this.phonePortMap = new Map();
        this.eventEmitter = new events_1.EventEmitter();
        usbDetector.onAttachDevice(function (portInfo) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("portInfo: ", portInfo);
                if (portInfo.manufacturer === exports.manufacturer) {
                    this.eventEmitter.emit(PureNodeEvent.AttachedPhone, portInfo.serialNumber);
                }
                return [2 /*return*/];
            });
        }); });
    }
    PureNode.getPhones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var portList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PureNode.getSerialPortList()];
                    case 1:
                        portList = _a.sent();
                        return [2 /*return*/, portList
                                .filter(PureNode.isMuditaPurePhone)
                                .map(function (_a) {
                                var _b = _a.serialNumber, serialNumber = _b === void 0 ? "" : _b;
                                return ({ id: String(serialNumber) });
                            })];
                }
            });
        });
    };
    PureNode.isMuditaPurePhone = function (portInfo) {
        return (portInfo.manufacturer === exports.manufacturer && portInfo.productId === exports.productId);
    };
    PureNode.getSerialPortList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, serialport_1.default.list()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PureNode.prototype.connect = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var portList, port, phonePort, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PureNode.getSerialPortList()];
                    case 1:
                        portList = _a.sent();
                        port = portList.find(function (_a) {
                            var serialNumber = _a.serialNumber;
                            return String(serialNumber) === id;
                        });
                        if (!(port && this.phonePortMap.has(id))) return [3 /*break*/, 2];
                        return [2 /*return*/, { status: types_1.ResponseStatus.Ok }];
                    case 2:
                        if (!port) return [3 /*break*/, 4];
                        phonePort = this.createPhonePort();
                        return [4 /*yield*/, phonePort.connect(port.path)];
                    case 3:
                        response = _a.sent();
                        if (response.status === types_1.ResponseStatus.Ok) {
                            this.phonePortMap.set(id, phonePort);
                            this.removePhonePortOnDisconnectionEvent(id);
                        }
                        return [2 /*return*/, response];
                    case 4: return [2 /*return*/, { status: types_1.ResponseStatus.ConnectionIsClosed }];
                }
            });
        });
    };
    PureNode.prototype.disconnect = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var phonePort;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        phonePort = this.phonePortMap.get(id);
                        if (!phonePort) return [3 /*break*/, 2];
                        this.phonePortMap.delete(id);
                        return [4 /*yield*/, phonePort.disconnect()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, { status: types_1.ResponseStatus.Ok }];
                }
            });
        });
    };
    PureNode.prototype.request = function (id, config) {
        return __awaiter(this, void 0, void 0, function () {
            var phonePort;
            return __generator(this, function (_a) {
                phonePort = this.phonePortMap.get(id);
                if (phonePort) {
                    return [2 /*return*/, phonePort.request(config)];
                }
                else {
                    return [2 /*return*/, Promise.resolve({ status: types_1.ResponseStatus.ConnectionIsClosed })];
                }
                return [2 /*return*/];
            });
        });
    };
    PureNode.prototype.on = function (id, channelName, listener) {
        var phonePort = this.phonePortMap.get(id);
        if (phonePort) {
            phonePort.on(channelName, listener);
        }
    };
    PureNode.prototype.off = function (id, channelName, listener) {
        var phonePort = this.phonePortMap.get(id);
        if (phonePort) {
            phonePort.off(channelName, listener);
        }
    };
    PureNode.prototype.onAttachPhone = function (listener) {
        this.eventEmitter.on(PureNodeEvent.AttachedPhone, listener);
    };
    PureNode.prototype.offAttachPhone = function (listener) {
        this.eventEmitter.off(PureNodeEvent.AttachedPhone, listener);
    };
    PureNode.prototype.removePhonePortOnDisconnectionEvent = function (id) {
        var _this = this;
        var phonePort = this.phonePortMap.get(id);
        if (phonePort) {
            var listener_1 = function () {
                _this.phonePortMap.delete(id);
                phonePort.off(types_1.EventName.Disconnected, listener_1);
            };
            phonePort.on(types_1.EventName.Disconnected, listener_1);
        }
    };
    return PureNode;
}());
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super.call(this, phone_port_1.createPhonePort, new usb_detector_1.default()) || this;
    }
    return default_1;
}(PureNode));
exports.default = default_1;
