# Get Started with Hokusai API
This tutorial covers the setup and basics usage of Hokusai API.

### Table of Contents
**[Getting Started](#getting-started)**<br>
**[Using Hokusai API](#using-hokusai-api)**<br>
**[Hokusai Links](#hokusai-links)**<br>

## Getting Started
To get started with Hokusai API, please clone this repository and follow this tutorial.
```:bash
git clone https://github.com/0xhokusai/hokusai-get-started.git
```
Setup your Hokusai API ans start integrating NFT on your website. The setup requires following steps:
- Obtain API key
- Create your wallet
- Publish NFT metadata
- Access NFT metadata

### 1. Obtain your API key
Submit your request for an API key [here](https://hokusai.app/pre-register). You will receive the key, consisting of `HOKUSAI_API_KEY` and `HOKUSAI_CONTRACT_ID`. Currently, it takes for 2-3 business days to issue the API Key. 

### 2. Create your wallet
To mint an NFT, you must have your wallet addrress.
We recommend [Metamask](https://docs.metamask.io) to use for wallet software.

Metamask is a software cryptocurrency wallet used to interact with the Ethereum blockchain.
These articles provide great tutorials for new to Metamask
- [How to create Metamask Wallet](https://docs.matic.network/docs/develop/metamask/hello/)
- [Configure Polygon on Metamask](https://docs.matic.network/docs/develop/metamask/config-polygon-on-metamask)

### 3. Publish NFT metadata
[Metadata](https://nftschool.dev/reference/metadata-schemas/#intro-to-json-schemas) is data that provides information about other data. NFT metadata contains information about its name, description and image. 
We use [nft.storage](https://nft.storage/) to publish a NFT metadata. 
#### 3.1 Setup nft.storage
Follow the setup guidline for nft.storage [here](https://nft.storage/#getting-started)
#### 3.2 Add your API keys
Copy the `.env.sample` file and fill in your own API keys in `.env` file
```:bash
cp .env.sample .env # and rewrite API Keys
```
#### 3.3 Install required packages via yarn
```:bash
yarn # install the required packages
```
In case you haven not intalled yarn, follow the setup [here](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
#### 3.4 Publish metadata 
You can publish metadata using our sample image (hokusai.png) by running the following codes
```:bash
yarn store-metadata 
```
You will get a URL for the metadata like this.

```
HTTPS URL for the metadata: https://dweb.link/ipfs/bafyreieaaqfof34kfqyvwe4arta6jsuwuauim4d24qo22ct2xnvjnlnrb4//metadata.json # example metadata url
```
#### 3.4 Access metadata 
You can access the metadata uploaded on IPFS via HTTPS URL by running the code below.
[IPFS](https://docs.ipfs.io/) is a distributed system for storing and accessing files, websites, applications, and data.
Learn more about IPFS [here](https://docs.ipfs.io/concepts/what-is-ipfs/#decentralization)

```:bash
curl https://dweb.link/ipfs/bafyreieaaqfof34kfqyvwe4arta6jsuwuauim4d24qo22ct2xnvjnlnrb4/metadata.json # example metadata url

{
    "name":"nft.storage store test",
    "description":"Using the nft.storage metadata API to create ERC-1155 compatible metadata.",
    "image":"ipfs://bafybeicsu73gednfaa5svozuoac4ebpi76nn4auhygcvkvbn4kk2vdv5ey/hokusai.png"
}
```
## Using Hokusai API
Congratulations! Now, you're ready to use Hokusai API. Check out [Hokudai API Document](https://docs.hokusai.app/) for our full documentation . Let's try mininting and getting an NFT. 

#### Mint an NFT
To [mint](https://docs.hokusai.app/api/glosarry/#mint) an NFT, run the code below. 
```:bash
yarn mint-nft {to} {tokenUri}
{
  txHash: '0x8765feaa11a7e0f9f4a84f21415434d80dd9be27728a8f6eff4d402e4d0c2766' # example Transaction Hash
}
```
You may refer to our documentatiion [here](https://docs.hokusai.app/api/nft/mint) for parameter description.

#### Get an NFT
`tokenId` issued by Hokusai API can be viewed via [polygonscan](https://mumbai.polygonscan.com). You can search by txHash received from minting. 

```:bash
yarn get-nft {tokenId}
{ id: {tokenId}, tokenUri: 'https://example.com/1' } # example response
```
Now you have minted NFT and got NFT info via Hokusai API.

## Hokusai Links
- [Homepage](https://hokusai.app)
- [Document](https://docs.hokusai.app)
- [Medium](https://0xhokusai.medium.com)
- [Discord](https://discord.com/invite/34fmuE25G2)
- [Twitter](https://twitter.com/0xHokusai)
