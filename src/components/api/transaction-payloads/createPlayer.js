"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.sendPlayer = sendPlayer;
exports.broadcastTransaction = broadcastTransaction;
var transactionCreatePlayer_1 = require("./transactionCreatePlayer");
var QubicTransaction_1 = require("@qubic-lib/qubic-ts-library/dist/qubic-types/QubicTransaction");
var base64Utils_1 = require("../utils/base64Utils");
var rpcStatus_1 = require("../utils/rpcStatus");
var rpcStatus_2 = require("../utils/rpcStatus");
var QubicDefinitions_1 = require("@qubic-lib/qubic-ts-library/dist/QubicDefinitions");
var Long_1 = require("@qubic-lib/qubic-ts-library/dist/qubic-types/Long");
function sendPlayer() {
    return __awaiter(this, void 0, void 0, function () {
        var rawPlayer, player, sendPlayerPayload, sourceId, sourceSeed, rpcStatus, currentTick, targetTick, totalAmount, tx, response, responseData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rawPlayer = {
                        playerId: "XXXXXXX",
                        teamId: "YYYYY",
                        targetAmount: new Long_1.Long(100),
                        sharePrice: new Long_1.Long(2),
                    };
                    player = {
                        playerId: (0, base64Utils_1.idToBase64Number)(rawPlayer.playerId),
                        teamId: (0, base64Utils_1.idToBase64Number)(rawPlayer.teamId),
                        targetAmount: rawPlayer.targetAmount,
                        sharePrice: rawPlayer.sharePrice,
                    };
                    sendPlayerPayload = new transactionCreatePlayer_1.TransactionCreatePlayer(player);
                    sourceId = "WEVWZOHASCHODGRVRFKZCGUDGHEDWCAZIZXWBUHZEAMNVHKZPOIZKUEHNQSJ";
                    sourceSeed = "zrfpagcpqfkwjimnrehibkctvwsyzocuikgpedchcyaotcamzaxpivq";
                    return [4 /*yield*/, (0, rpcStatus_1.getRPCStatus)()];
                case 1:
                    rpcStatus = _a.sent();
                    currentTick = rpcStatus.tickInfo.tick;
                    targetTick = currentTick + 15;
                    totalAmount = new Long_1.Long(sendPlayerPayload.getTotalAmount());
                    tx = new QubicTransaction_1.QubicTransaction()
                        .setSourcePublicKey(sourceId)
                        .setDestinationPublicKey(QubicDefinitions_1.QubicDefinitions.QUTIL_ADDRESS)
                        .setAmount(totalAmount)
                        .setTick(targetTick)
                        .setInputType(QubicDefinitions_1.QubicDefinitions.QUTIL_SENDMANY_INPUT_TYPE)
                        .setInputSize(sendPlayerPayload.getPackageSize())
                        .setPayload(sendPlayerPayload);
                    // Signing the transaction
                    return [4 /*yield*/, tx.build(sourceSeed)];
                case 2:
                    // Signing the transaction
                    _a.sent();
                    return [4 /*yield*/, broadcastTransaction(tx)];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    responseData = _a.sent();
                    if (!response.ok) {
                        console.log("Failed to broadcast transaction: ", responseData);
                        return [2 /*return*/];
                    }
                    console.log("Successfully broadcast transaction.");
                    console.log("Transaction ID: " + responseData.transactionId);
                    console.log("Scheduled for tick: " + targetTick);
                    return [2 /*return*/];
            }
        });
    });
}
await sendPlayer();
function broadcastTransaction(transaction) {
    return __awaiter(this, void 0, void 0, function () {
        var encodedTransaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encodedTransaction = transaction.encodeTransactionToBase64(transaction.getPackageData());
                    return [4 /*yield*/, fetch(rpcStatus_2.baseURL + "/v1/broadcast-transaction", {
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            method: "POST",
                            body: JSON.stringify({
                                encodedTransaction: encodedTransaction,
                            }),
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
