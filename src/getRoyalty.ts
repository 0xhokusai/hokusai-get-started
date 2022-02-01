import fetch from "node-fetch";

require("dotenv").config();

const baseUrl = "https://polygon.hokusai.app";

const getRoyalty = async (
  baseUrl: string,
  apiKey: string,
  contractId: string,
  tokenId: string
) => {
  const path = `/v1/nfts/${contractId}/${tokenId}/royalty`;
  const url = new URL(baseUrl + path);
  const params = { key: apiKey };
  url.search = new URLSearchParams(params).toString();
  const res = await fetch(url.toString(), { method: "GET" });
  if (res.status != 200) {
    console.log(res.status);
    throw new Error(await res.text());
  }
  return res.json();
};

const argv = process.argv.slice(2);

if (argv.length !== 1) {
  console.log("Usage: node getRoyalty.ts <tokenId>");
  process.exit(1);
}

console.log(`baseUrl: ${baseUrl}`);

getRoyalty(
  baseUrl,
  process.env.HOKUSAI_API_KEY || "",
  process.env.HOKUSAI_CONTRACT_ID || "",
  argv[0]
)
  .then((res) => {
    console.log('success')
    console.log(res);
  })
  .catch((err) => {
    console.log('err')
    console.log(err);
  });
