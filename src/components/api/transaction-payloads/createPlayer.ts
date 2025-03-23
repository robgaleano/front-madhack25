import {
  PlayerInput,
  TransactionCreatePlayer,
} from "./transactionCreatePlayer";
import { QubicTransaction } from "@qubic-lib/qubic-ts-library/dist/qubic-types/QubicTransaction";
import { idToBase64Number } from "../utils/base64Utils";
import { getRPCStatus } from "../utils/rpcStatus";
import { baseURL } from "../utils/rpcStatus";
import { QubicDefinitions } from "@qubic-lib/qubic-ts-library/dist/QubicDefinitions";
import { Long } from "@qubic-lib/qubic-ts-library/dist/qubic-types/Long";

export async function sendPlayer() {
  const rawPlayer = {
    playerId: "XXXXXXX",
    teamId: "YYYYY",
    targetAmount: new Long(100),
    sharePrice: new Long(2),
  };

  const player: PlayerInput = {
    playerId: idToBase64Number(rawPlayer.playerId),
    teamId: idToBase64Number(rawPlayer.teamId),
    targetAmount: rawPlayer.targetAmount,
    sharePrice: rawPlayer.sharePrice,
  };

  const sendPlayerPayload = new TransactionCreatePlayer(player);
  const sourceId =
    "WEVWZOHASCHODGRVRFKZCGUDGHEDWCAZIZXWBUHZEAMNVHKZPOIZKUEHNQSJ";
  const sourceSeed = "zrfpagcpqfkwjimnrehibkctvwsyzocuikgpedchcyaotcamzaxpivq";

  // Fetching current network tick
  const rpcStatus = await getRPCStatus();
  const currentTick = rpcStatus.tickInfo.tick;

  // Scheduling transaction for a future tick
  const targetTick = currentTick + 15;
  const totalAmount = new Long(sendPlayerPayload.getTotalAmount());

  // Creating the transaction
  const tx = new QubicTransaction()
    .setSourcePublicKey(sourceId)
    .setDestinationPublicKey(QubicDefinitions.QUTIL_ADDRESS)
    .setAmount(totalAmount)
    .setTick(targetTick)
    .setInputType(QubicDefinitions.QUTIL_SENDMANY_INPUT_TYPE)
    .setInputSize(sendPlayerPayload.getPackageSize())
    .setPayload(sendPlayerPayload);

  // Signing the transaction
  await tx.build(sourceSeed);

  // Broadcasting the transaction
  const response = await broadcastTransaction(tx);
  const responseData = await response.json();

  if (!response.ok) {
    console.log("Failed to broadcast transaction: ", responseData);
    return;
  }

  console.log("Successfully broadcast transaction.");
  console.log("Transaction ID: " + responseData.transactionId);
  console.log("Scheduled for tick: " + targetTick);
}

// Export a function to execute sendPlayer
export async function executeCreatePlayer() {
  await sendPlayer();
}

export async function broadcastTransaction(transaction) {
  const encodedTransaction = transaction.encodeTransactionToBase64(
    transaction.getPackageData()
  );

  return await fetch(baseURL + "/v1/broadcast-transaction", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      encodedTransaction: encodedTransaction,
    }),
  });
}
