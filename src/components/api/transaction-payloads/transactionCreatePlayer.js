"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionCreatePlayer = void 0;
/**
 * Transaction Payload to use create new player SC
 *
 *  struct CreatePlayer_input {
 *    id playerId;
 *    id teamId;
 *    uint64 targetAmount;
 *    uint64 sharePrice;
 *  };
 */
var QubicPackageBuilder_1 = require("@qubic-lib/qubic-ts-library/dist/QubicPackageBuilder");
var DynamicPayload_1 = require("@qubic-lib/qubic-ts-library/dist/qubic-types/DynamicPayload");
var TransactionCreatePlayer = /** @class */ (function () {
    function TransactionCreatePlayer(actionInput) {
        this._internalPackageSize = 1088; /* 32 * 32 + 8 * 8 */
        this.createActionPlayerInput = actionInput;
    }
    TransactionCreatePlayer.prototype.getPackageSize = function () {
        return this._internalPackageSize;
    };
    TransactionCreatePlayer.prototype.getPackageData = function () {
        var builder = new QubicPackageBuilder_1.QubicPackageBuilder(this.getPackageSize());
        builder.addInt(this.createActionPlayerInput.playerId);
        builder.addInt(this.createActionPlayerInput.teamId);
        builder.add(this.createActionPlayerInput.targetAmount);
        builder.add(this.createActionPlayerInput.sharePrice);
        return builder.getData();
    };
    TransactionCreatePlayer.prototype.getTransactionPayload = function () {
        var payload = new DynamicPayload_1.DynamicPayload(this.getPackageSize());
        payload.setPayload(this.getPackageData());
        return payload;
    };
    TransactionCreatePlayer.prototype.getTotalAmount = function () {
        return BigInt(this.createActionPlayerInput.targetAmount.getNumber() *
            this.createActionPlayerInput.sharePrice.getNumber());
    };
    return TransactionCreatePlayer;
}());
exports.TransactionCreatePlayer = TransactionCreatePlayer;
