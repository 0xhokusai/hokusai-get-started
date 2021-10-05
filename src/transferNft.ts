import fetch from "node-fetch";
import { MessageWithSignature } from "./lib/TypedData";
import { getMetaTxMessageWithSignature } from "./lib/MetaTx";

require("dotenv").config();

const baseUrl = "https://mumbai.hokusai.app";
const RPC = "https://rpc-mumbai.maticvigil.com";
// If NETWORK_ERROR occur, try these RPC instead.
// const RPC = "https://rpc-mumbai.maticvigil.com";
// const RPC = "https://matic-mumbai.chainstacklabs.com";
// const RPC = "https://matic-testnet-archive-rpc.bwarelabs.com";

type TransferRequest = {
  request: MessageWithSignature;
};

async function transferNft(
  baseUrl: string,
  apiKey: string,
  contractId: string,
  messageWithSignature: MessageWithSignature
) {
  const path = `/v1/nfts/${contractId}/transfer`;
  const url = new URL(`${baseUrl}${path}`);
  const params = { key: apiKey };
  const requestBody: TransferRequest = { request: messageWithSignature };

  url.search = new URLSearchParams(params).toString();

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (res.status != 200) {
    console.log(res);
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

  const walletPrivateKey = process.env.WALLET_PRIVATE_KEY || "";
  const apiKey = process.env.HOKUSAI_API_KEY || "";
  const contractId = process.env.HOKUSAI_CONTRACT_ID || "";
  const contractAddress = "0x73b5373a27f4a271c6559c6c83b10620acde9a2a";
  const forwarderAddress = "0x0E285b682EAF6244a2AD3b1D25cFe61BF6A41fc3";
  const toAddress = argv[0] || "";
  const tokenId = Number(argv[1]) || 0;

  try {
    const messageWithSignature = await getMetaTxMessageWithSignature(
      RPC,
      walletPrivateKey,
      contractAddress,
      forwarderAddress,
      toAddress,
      tokenId
    );

    const res = await transferNft(
      baseUrl,
      apiKey,
      contractId,
      messageWithSignature
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

main();

