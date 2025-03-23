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
import { QubicPackageBuilder } from "@qubic-lib/qubic-ts-library/dist/QubicPackageBuilder";
import { DynamicPayload } from "@qubic-lib/qubic-ts-library/dist/qubic-types/DynamicPayload";
import { IQubicBuildPackage } from "@qubic-lib/qubic-ts-library/dist/qubic-types/IQubicBuildPackage";
import { Long } from "@qubic-lib/qubic-ts-library/dist/qubic-types/Long";

export class TransactionCreatePlayer implements IQubicBuildPackage {
  private _internalPackageSize = 1088; /* 32 * 32 + 8 * 8 */

  private createActionPlayerInput: PlayerInput;

  constructor(actionInput: PlayerInput) {
    this.createActionPlayerInput = actionInput;
  }

  getPackageSize(): number {
    return this._internalPackageSize;
  }

  getPackageData(): Uint8Array {
    const builder = new QubicPackageBuilder(this.getPackageSize());

    builder.addInt(this.createActionPlayerInput.playerId);
    builder.addInt(this.createActionPlayerInput.teamId);
    builder.add(this.createActionPlayerInput.targetAmount);
    builder.add(this.createActionPlayerInput.sharePrice);

    return builder.getData();
  }

  getTransactionPayload(): DynamicPayload {
    const payload = new DynamicPayload(this.getPackageSize());
    payload.setPayload(this.getPackageData());
    return payload;
  }

  getTotalAmount(): bigint {
    return BigInt(
      this.createActionPlayerInput.targetAmount.getNumber() *
        this.createActionPlayerInput.sharePrice.getNumber()
    );
  }
}

export interface PlayerInput {
  playerId: number;
  teamId: number;
  targetAmount: Long;
  sharePrice: Long;
}
