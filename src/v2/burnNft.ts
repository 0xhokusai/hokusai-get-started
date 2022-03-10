import fetch from "node-fetch";
import { MessageWithSignature } from "./lib/TypedData";
import { getBurnMessageWithSignature } from "./lib/MetaTx";

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
  contractVer: string,
  contractId: string,
  messageWithSignature: MessageWithSignature
) {
  const path = `/v2/nft/${contractVer}/${contractId}/transfer`;
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

  if (argv.length !== 1) {
    console.log("Usage: node burnNft.ts <tokenId>");
    process.exit(1);
  }

  const walletPrivateKey = process.env.WALLET_PRIVATE_KEY || "";
  const apiKey = process.env.HOKUSAI_API_KEY || "";
  const contractVer = process.env.HOKUSAI_CONTRACT_VERSION || "";
  const contractId = process.env.HOKUSAI_CONTRACT_ID || "";
  const contractAddress = process.env.HOKUSAI_CONTRACT_ADDRESS || "";
  const forwarderAddress = "0x0E285b682EAF6244a2AD3b1D25cFe61BF6A41fc3";
  const tokenId = Number(argv[0]) || 0;

  try {
    const messageWithSignature = await getBurnMessageWithSignature(
      RPC,
      walletPrivateKey,
      contractAddress,
      forwarderAddress,
      tokenId
    );

    const res = await transferNft(
      baseUrl,
      apiKey,
      contractVer,
      contractId,
      messageWithSignature
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

main();
