import fetch from "node-fetch";
import { MessageWithSignature } from './lib/TypedData';
import { getMetaTxMessageWithSignature } from './lib/MetaTx';

require("dotenv").config();

const baseUrl = "https://polygon.hokusai.app";

type TransferRequest = {
  request: MessageWithSignature
}

async function transferNft(
  baseUrl: string,
  apiKey: string,
  contractId: string,
  messageWithSignature: MessageWithSignature
) {
  const path = `/v1/nfts/${contractId}/transfer`;
  const url = new URL(`${baseUrl}${path}`);
  const params = { key: apiKey };
  const requestBody: TransferRequest = { request: messageWithSignature }

  url.search = new URLSearchParams(params).toString();

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (res.status != 200) {
    console.log(res)
    throw new Error(await res.text());
  }

  return res.json();
}

async function main() {
  const argv = process.argv.slice(2);

  if (argv.length !== 2) {
    console.log("Usage: node mintNft.ts <to> <tokenId>");
    process.exit(1);
  }

  const walletPrivateKey = process.env.WALLET_PRIVATE_KEY || ""
  const apiKey = process.env.HOKUSAI_API_KEY || ""
  const contractId = process.env.HOKUSAI_CONTRACT_ID || ""
  const contractAddress = process.env.HOKUSAI_CONTRACT_ADDRESS || ""
  const forwarderAddress = "0xD64a425d91a97866cE4ee2d759A23560411ADb01" // Polygon mainnet forwarder address
  const toAddress = argv[0] || ""
  const tokenId = Number(argv[1]) || 0

  try {
    const messageWithSignature = await getMetaTxMessageWithSignature(
      walletPrivateKey,
      contractAddress,
      forwarderAddress,
      toAddress,
      tokenId
    )
    console.log("Message with signature:")
    console.log(messageWithSignature)

    const res = await transferNft(baseUrl, apiKey, contractId, messageWithSignature)
    console.log("Transfer result:")
    console.log(res)
  } catch(error) {
    console.log(error)
  }
}

main()