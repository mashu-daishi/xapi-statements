"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var createStatement_1 = require("../../../utils/createStatement");
var setupIdsTest_1 = require("./setupIdsTest");
var defaultExactActorCreator = function (createIdsActor) {
    return function (ifi) {
        return __assign({ name: 'Test1' }, createIdsActor(ifi));
    };
};
exports.default = function (createIdsActor, createExactActor) {
    if (createExactActor === void 0) { createExactActor = defaultExactActorCreator(createIdsActor); }
    return function (createActorStatement) {
        var assertIdsStatements = setupIdsTest_1.default();
        var assertIdsActor = function (ifi) { return __awaiter(_this, void 0, void 0, function () {
            var exactStatement, expectedStatement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exactStatement = createStatement_1.default(createActorStatement(createExactActor(ifi)));
                        expectedStatement = createStatement_1.default(createActorStatement(createIdsActor(ifi)));
                        return [4 /*yield*/, assertIdsStatements(exactStatement, expectedStatement)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        it('should return the account and objectType without the name', function () { return __awaiter(_this, void 0, void 0, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        account = { name: 'testname', homePage: 'http://www.example.com' };
                        return [4 /*yield*/, assertIdsActor({ account: account })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the mbox and objectType without the name', function () { return __awaiter(_this, void 0, void 0, function () {
            var mbox;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mbox = 'mailto:test@example.com';
                        return [4 /*yield*/, assertIdsActor({ mbox: mbox })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the mbox_sha1sum and objectType without the name', function () { return __awaiter(_this, void 0, void 0, function () {
            var mbox_sha1sum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mbox_sha1sum = 'e1f9bc64eefbdf3660690684c6184f594f9a5c17';
                        return [4 /*yield*/, assertIdsActor({ mbox_sha1sum: mbox_sha1sum })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the openid and objectType without the name', function () { return __awaiter(_this, void 0, void 0, function () {
            var openid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        openid = 'http://www.example.com';
                        return [4 /*yield*/, assertIdsActor({ openid: openid })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
};
//# sourceMappingURL=agentFormatTest.js.map