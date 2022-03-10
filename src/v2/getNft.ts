import fetch from "node-fetch";

require("dotenv").config();

const baseUrl = "https://mumbai.hokusai.app";

const getNft = async (
  baseUrl: string,
  apiKey: string,
  contractVer: string,
  contractId: string,
  tokenId: string
) => {
  const path = `/v2/nft/${contractVer}/${contractId}/${tokenId}`;
  const url = new URL(baseUrl + path);
  const params = { key: apiKey };
  url.search = new URLSearchParams(params).toString();
  const res = await fetch(url);
  return res.json();
};

const argv = process.argv.slice(2);

if (argv.length !== 1) {
  console.log("Usage: node getNFT.ts <tokenId>");
  process.exit(1);
}

getNft(
  baseUrl,
  process.env.HOKUSAI_API_KEY || "",
  process.env.HOKUSAI_CONTRACT_VERSION || "",
  process.env.HOKUSAI_CONTRACT_ID || "",
  argv[0]
).then((res) => console.log(res));
