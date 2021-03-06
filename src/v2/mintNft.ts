import fetch from "node-fetch";

require("dotenv").config();

const baseUrl = "https://api.hokusai.app";

const mintNft = async (
  baseUrl: string,
  network: string,
  apiKey: string,
  contractVer: string,
  contractId: string,
  to: string,
  tokenURI: string
) => {
  const path = `/v2/${network}/nft/${contractVer}/${contractId}/mint`;
  const url = new URL(baseUrl + path);
  const params = { key: apiKey };
  const requestBody = [{to, tokenURI}];
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

if (argv.length !== 2) {
  console.log("Usage: node mintNft.ts <to> <tokenURI>");
  process.exit(1);
}

console.log(`baseUrl: ${baseUrl}`);

mintNft(
  baseUrl,
  process.env.CONTRACT_NETWORK || "",
  process.env.HOKUSAI_API_KEY || "",
  process.env.HOKUSAI_CONTRACT_VERSION || "",
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
