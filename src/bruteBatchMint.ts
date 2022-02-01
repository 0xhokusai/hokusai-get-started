import fetch from "node-fetch";
import fs from "fs"
import { ethers } from "ethers"

require("dotenv").config();

const baseUrl = "https://polygon.hokusai.app";
const adminAddress = '0x48CbAAAb40C6f43662898A782Fb5Ff92b04DA6C1'
const RPC = 'https://polygon-mainnet.infura.io/v3/07a9762f17d34a56b8dd440e283126b8'

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
  console.log("fetching " + url.toString())
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

const waitForTx = async (txHash: string) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  return await provider.waitForTransaction(txHash)
}

console.log(`baseUrl: ${baseUrl}`);

const list = JSON.parse(fs.readFileSync('metadata.json', 'utf8'))

const keys = JSON.parse(fs.readFileSync('keys.json', 'utf8')).mainnet as { key: string, id: string, author: string }[]

const main = async () => {
  try {
    for (const elem of keys) {
      const hashList = list[elem.author] as { key: number, hash: string }[]
      const hashes = hashList.sort((f, s) => f.key - s.key)
      console.log(elem.author)
      for (const hash of hashes) {
        const url = "ipfs://" + hash.hash
        console.log(`     ${hash.key}: ` + url)
        const res = await mintNft(baseUrl, elem.key, elem.id, adminAddress, url)
        if (res.txHash) {
          console.log(`Transaction sent: ${res.txHash}`)
          await waitForTx(res.txHash)
          console.log(`Transaction mined: ${res.txHash}`)
        } else {
          throw new Error('unknown error')
        }
      }
    }
    // const txHash = '0x82284b02c7e5aa70bb259caddb47ac589f06d23810f7a663ee3c494c2adc359a'
    // const provider = new ethers.providers.JsonRpcProvider(RPC)
    // const transaction = await provider.getTransaction(txHash)
    // if (!transaction)
    //   throw new Error(`tx: ${txHash} doesn't exist`)
    // console.log(`tx: ${transaction.hash} exists`)
    // console.log(`confirmations: ${transaction.confirmations}`)
    // const reciept = await waitForTx(txHash)
    // console.log(reciept)
  } catch(err) {
    console.error(err)
  }
}

main()

