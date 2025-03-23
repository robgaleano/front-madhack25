/**
 * Transaction Payload to use create new player SC
 *
 *  struct CreatePlayer_input {
 *    char name[32];
 *    char team[32];
 *    uint64 targetAmount;
 *    uint64 sharePrice;
 *  };
 */
import { QubicPackageBuilder } from '@qubic-lib/qubic-ts-library/dist/QubicPackageBuilder'
import { DynamicPayload } from "@qubic-lib/qubic-ts-library/dist/qubic-types/DynamicPayload";
import { IQubicBuildPackage } from '@qubic-lib/qubic-ts-library/dist/qubic-types/IQubicBuildPackage';


export class transactionCreatePlayer implements IQubicBuildPackage {
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

    builder.add(this.createActionPlayerInput.name);
    builder.add(this.createActionPlayerInput.team);
    builder.addInt(this.createActionPlayerInput.targetAmount);
    builder.addInt(this.createActionPlayerInput.sharePrice);

    return builder.getData();
  }

  getTransactionPayload(): DynamicPayload {
    const payload = new DynamicPayload(this.getPackageSize());
    payload.setPayload(this.getPackageData());
    return payload;
  }
}

export interface PlayerInput {
  name: string;
  team: string;
  targetAmount: number;
  sharePrice: number;
}
