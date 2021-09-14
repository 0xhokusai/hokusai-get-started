import fetch from "node-fetch";

require("dotenv").config();

const baseUrl = "https://polygon.hokusai.app";
// If you using the Mumbai testnet, change the baseUrl to "https://mumbai.hokusai.app".


const mintNft = async (
  baseUrl: string,
  apiKey: string,
  contractId: string,
  to: string,
  tokenUri: string
) => {
  const path = `/v1/nfts/${contractId}/mint`;
  const url = new URL(baseUrl + path);
  const params = { key: apiKey };
  const requestBody = { to, tokenUri };
  url.search = new URLSearchParams(params).toString();
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });
  if (res.status != 200) {
    throw new Error(await res.text());
  }
  return res.json();
};

const argv = process.argv.slice(2);

if (argv.length !== 2) {
  console.log("Usage: node mintNft.ts <to> <tokenUri>");
  process.exit(1);
}

mintNft(
  baseUrl,
  process.env.HOKUSAI_API_KEY || "",
  process.env.HOKUSAI_CONTRACT_ID || "",
  argv[0],
  argv[1]
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

