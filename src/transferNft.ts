import fetch from "node-fetch";
import { MessageWithSignature } from "./lib/TypedData";
import { sign } from "./lib/MetaTx";
import { ethers } from "ethers";
import HokusaiAbi from "./lib/abis/ERC721WithRoyaltyMetaTx.json";

require("dotenv").config();

const baseUrl = "https://mumbai.hokusai.app";

type TransferRequest = {
  request: MessageWithSignature;
};

async function transferNft(
  baseUrl: string,
  apiKey: string,
  contractId: string,
  walletPrivateKey: string,
  contractAddress: string,
  forwarderAddress: string,
  toAddress: string,
  tokenId: number
) {
  const RPC = "https://rpc-mumbai.matic.today";
  const signer = new ethers.Wallet(walletPrivateKey);

  const hokusaiInterface = new ethers.utils.Interface(HokusaiAbi.abi);
  const data = hokusaiInterface.encodeFunctionData("transferFrom", [
    signer.address,
    toAddress,
    tokenId,
  ]);

  const messageWithSignature = await sign(
    RPC,
    signer,
    signer.address,
    0,
    data,
    forwarderAddress,
    contractAddress
  );

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
  const contractAddress = process.env.HOKUSAI_CONTRACT_ADDRESS || "";
  const forwarderAddress = "0x0E285b682EAF6244a2AD3b1D25cFe61BF6A41fc3"; // Polygon testnet forwarder address
  const toAddress = argv[0] || "";
  const tokenId = Number(argv[1]) || 0;

  try {
    const res = await transferNft(
      baseUrl,
      apiKey,
      contractId,
      walletPrivateKey,
      contractAddress,
      forwarderAddress,
      toAddress,
      tokenId
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

main();
