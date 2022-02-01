import fetch from "node-fetch";
import fs from "fs"
import { ethers } from "ethers"
import { MessageWithSignature } from "./lib/TypedData";
import { getMetaTxMessageWithSignature } from "./lib/MetaTx";

require("dotenv").config();

const baseUrl = "https://polygon.hokusai.app";
const RPC = 'https://polygon-mainnet.infura.io/v3/07a9762f17d34a56b8dd440e283126b8'
const walletPrivateKey = '0bd4b94cee185d8f4eac9fdad02e53cc458ed0429d79d1eaf4014ecdb885232e'
const forwarderAddress = "0xD64a425d91a97866cE4ee2d759A23560411ADb01";

type TransferRequest = {
  request: MessageWithSignature;
};

const waitForTx = async (txHash: string) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  return await provider.waitForTransaction(txHash)
}

const transferNft = async (
  baseUrl: string,
  apiKey: string,
  contractId: string,
  messageWithSignature: MessageWithSignature
) => {
  const path = `/v1/nfts/${contractId}/transfer`;
  const url = new URL(`${baseUrl}${path}`);
  const params = { key: apiKey };
  const requestBody: TransferRequest = { request: messageWithSignature };

  url.search = new URLSearchParams(params).toString();
  console.log("fetching " + url.toString())

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (res.status != 200) {
    console.log(res);
    throw new Error(await res.text());
  }

  const result = await res.json()

  if (result.txHash) {
    console.log(`Transaction sent: ${result.txHash}`)
    await waitForTx(result.txHash)
    console.log(`Transaction mined: ${result.txHash}`)
  } else {
    throw new Error('unknown error')
  }
}

console.log(`baseUrl: ${baseUrl}`);

const list = JSON.parse(fs.readFileSync('target.json', 'utf8')) as { arr: { address: string, generative: number, original: number, originalAuthor: string }[] }

const keys = JSON.parse(fs.readFileSync('keys.json', 'utf8')).mainnet as { key: string, id: string, author: string, address: string, contract: string }[]
const genKeys = JSON.parse(fs.readFileSync('keys.json', 'utf8')).generative as { key: string, id: string, author: string, address: string, contract: string }[]

const main = async () => {
  try {
    const targets = list.arr
      .sort((f, s) => f.generative - s.generative)
    for (const target of targets) {
      const genArtist = genKeys.filter(elem => elem.author === "ハルタスク")[0]
      const oriArtist = keys.filter(elem => elem.author === target.originalAuthor)[0]
      const promises: Promise<any>[] = []

      if (genArtist && target.generative > 5 && target.generative) {
        console.log(`generative #${target.generative}`)
        console.log(`    ${target.address}`)
        const genMsg = await getMetaTxMessageWithSignature(
          RPC, walletPrivateKey, genArtist.contract, forwarderAddress, target.address, target.generative
        );

        const promise = transferNft(baseUrl, genArtist.key, genArtist.id, genMsg)
          .then(_ => console.log(`generative #${target.generative} transfer successful`))
        promises.push(promise)
      }

      if (oriArtist && target.original) {
        console.log(`${target.originalAuthor}'s #${target.original}`)
        console.log(`    ${target.address}`)
        const oriMsg = await getMetaTxMessageWithSignature(
          RPC, walletPrivateKey, oriArtist.contract, forwarderAddress, target.address, target.original
        );

        const promise = transferNft(baseUrl, oriArtist.key, oriArtist.id, oriMsg)
          .then(_ => console.log(`${target.originalAuthor}'s #${target.original} transfer successful`))
        promises.push(promise)
      }
      const results = await Promise.allSettled(promises)
      results.forEach(res => {
        if (res.status === 'rejected')
          throw new Error(res.reason)
      })
    }
  } catch(err) {
    console.error(err)
  }
}

main()

