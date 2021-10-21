import fetch from "node-fetch";

require("dotenv").config();

const baseUrl = "https://mumbai.hokusai.app";

const setRoyalty = async (
  baseUrl: string,
  apiKey: string,
  contractId: string,
  tokenId: string,
  percentage: number,
  address: string
) => {
  const path = `/v1/nfts/${contractId}/${tokenId}/royalty`;
  const url = new URL(baseUrl + path);
  const params = { key: apiKey };
  const requestBody = { percentage, address };
  url.search = new URLSearchParams(params).toString();
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });
  if (res.status != 200) {
    console.log(res.status);
    throw new Error(await res.text());
  }
  return res.json();
};

const argv = process.argv.slice(2);

if (argv.length !== 3) {
  console.log("Usage: node setRoyalty.ts <receiver> <percentage> <address>");
  process.exit(1);
}

console.log(`baseUrl: ${baseUrl}`);

setRoyalty(
  baseUrl,
  process.env.HOKUSAI_API_KEY || "",
  process.env.HOKUSAI_CONTRACT_ID || "",
  argv[0],
  Number((argv[1])),
  argv[2]
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
