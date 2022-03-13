# Getting Started with Hokusai 🌊
> This document covers the setup and basic usages of Hokusai. <br>
> After completing this tutorial,  you'll be able to use Hokusai and start integrating NFT on your website. 
> 
### Table of Contents
**[Getting Started](#getting-started)**<br>
**[Using Hokusai](#using-hokusai-api)**<br>
**[Hokusai Links](#hokusai-links)**<br>

## Getting Started
To get started with Hokusai, first, clone this repository and follow the below tutorial.
```:bash
git clone https://github.com/0xhokusai/hokusai-get-started.git
```
The installation requires the following steps:
- Obtain API key
- Create your wallet
- Publish NFT metadata
- Access NFT metadata

### 1. Obtain your API key
Submit your request for an API key [here](https://hokusai.app/pre-register). You will receive the key, which contains `HOKUSAI_API_KEY` and `HOKUSAI_CONTRACT_ID`. Currently, it takes 2-3 business days to issue the API Key. 

### 2. Create your wallet
To mint an NFT, you must have your wallet address. We recommend using [Metamask](https://docs.metamask.io) for wallet software.

Metamask is a software cryptocurrency wallet used to interact with the Ethereum blockchain.
These articles provide a great introduction on how to set up Metamask.
- [How to create Metamask Wallet](https://docs.matic.network/docs/develop/metamask/hello/)
- [Configure Polygon on Metamask](https://docs.matic.network/docs/develop/metamask/config-polygon-on-metamask)

### 3. Publish NFT metadata
[Metadata](https://nftschool.dev/reference/metadata-schemas/#intro-to-json-schemas) is data that provides information about other data. NFT metadata contains information about its name, description, and image. 
We use [nft.storage](https://nft.storage/) to publish NFT metadata. 
#### 3.1 Setup nft.storage
Follow the setup guideline for nft.storage [here](https://nft.storage/#getting-started).
#### 3.2 Add your API keys
Copy the `.env.sample` file and fill in your own API keys in `.env` file.
```:bash
cp .env.sample .env # and rewrite API Keys
```
#### 3.3 Install required packages via yarn
```:bash
yarn # install the required packages
```
In case you have not installed yarn, follow the setup [here](https://classic.yarnpkg.com/en/docs/install/#mac-stable).
#### 3.4 Publish metadata 
You can publish metadata using our sample image (hokusai.png) by running the following codes
```:bash
yarn store-metadata 
```
You will get a URL for the metadata like this

```
HTTPS URL for the metadata: https://dweb.link/ipfs/bafyreieaaqfof34kfqyvwe4arta6jsuwuauim4d24qo22ct2xnvjnlnrb4//metadata.json # example metadata URL
```
#### 3.4 Access metadata 
You can access the metadata uploaded on IPFS via HTTPS URL by running the code below.
[IPFS](https://docs.ipfs.io/) is a distributed system for storing and accessing files, websites, applications, and data.
Learn more about IPFS [here](https://docs.ipfs.io/concepts/what-is-ipfs/#decentralization).

```:bash
curl https://dweb.link/ipfs/bafyreieaaqfof34kfqyvwe4arta6jsuwuauim4d24qo22ct2xnvjnlnrb4/metadata.json # example metadata url

{
    "name":"nft.storage store test",
    "description":"Using the nft.storage metadata API to create ERC-1155 compatible metadata.",
    "image":"ipfs://bafybeicsu73gednfaa5svozuoac4ebpi76nn4auhygcvkvbn4kk2vdv5ey/hokusai.png"
}
```
## Using Hokusai
Congratulations! You're ready to use Hokusai. Check out [Hokusai Document](https://docs.hokusai.app/) for the full documentation. Now, let's try minting and getting an NFT. 
If you using the Mumbai testnet, change the baseUrl of src/getNft.ts and src/mintNft.ts's to "https://mumbai.hokusai.app".

#### Mint an NFT
To [mint](https://docs.hokusai.app/api/glosarry/#mint) an NFT, run the code below
```:bash
yarn mint-nft {to} {tokenUri}
{
  txHash: '0x8765feaa11a7e0f9f4a84f21415434d80dd9be27728a8f6eff4d402e4d0c2766' # example Transaction Hash
}
```
You may refer to our documentation [here](https://docs.hokusai.app/api/nft/mint) for parameter descriptions.

#### Get an NFT
`tokenId` issued by Hokusai can be viewed via [polygonscan](https://mumbai.polygonscan.com). You can search by txHash received from minting. 

```:bash
yarn get-nft {tokenId}
{ id: {tokenId}, tokenUri: 'https://example.com/1' } # example response
```

#### Transfer an NFT
To transfer an NFT, you need to perform 2 steps:

1. Fill in the private key of your wallet in `.env` file ([Get the private key](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key))
2. Run the code below

```:bash
yarn transfer-nft {to} {tokenId}
{
  txHash: '0xdec77ee7148dc796dd08d656a256e1466daf2763c08cfe104f76e8baf318f3ed' # example Transaction Hash
}
```
#### Burn an NFT
To Burn an NFT, you need to perform 2 steps:

1. Fill in the private key of your wallet in `.env` file ([Get the private key](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key))
2. Run the code below

```:bash
yarn burn-nft {tokenId}
{
  txHash: '0x67eca6ca63d542f4b01fd60d53feda89ce64f42394c27b77fa3fccbb15244d3c' # example Transaction Hash
}
```

> :warning: **The private key is very sensitive information. You should make sure no one else sees.**

So far, you have minted an NFT, got NFT info and transfered an NFT via Hokusai. See what else you can do with our API on [Hokusai Document](https://docs.hokusai.app/) 🥳

## Hokusai Links
- [Homepage](https://hokusai.app)
- [Document](https://docs.hokusai.app)
- [Medium](https://0xhokusai.medium.com)
- [Discord](https://discord.com/invite/34fmuE25G2)
- [Twitter](https://twitter.com/0xHokusai)
