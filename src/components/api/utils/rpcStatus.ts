export const baseURL = "http://194.164.234.59";

// Querying the RPC status
export async function getRPCStatus() {
  const res = await fetch(`${baseURL}/v1/tick-info`);
  const data = await res.json();

  console.log(JSON.stringify(data, null, 2));

  return data;
}

await getRPCStatus();
