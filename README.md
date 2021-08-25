# Get Started with Hokusai API

## Get Started

To get started with Hokusai API fastly, please clone this repository and proceed with the following tutorial.

### 1. Obtain API Key

Please apply for an API Key from [here](https://hokusai.app/pre-register).
It takes for 2~3 business days to issue the API Key.

### 2. Create your wallet

To mint NFT, you must hold your wallet addrress.
We recommend [Metamask](https://docs.metamask.io) to use for wallet software.

Metamask is a software cryptocurrency wallet used to interact with the Ethereum blockchain.
These articles provide great tutorials for new to Metamask
- [How to create Metamask Wallet](https://docs.matic.network/docs/develop/metamask/hello/)
- [Configure Polygon on Metamask](https://docs.matic.network/docs/develop/metamask/config-polygon-on-metamask)

### 3. Publish NFT metadata

We use [nft.storage](https://nft.storage/) to publish a NFT metadata for ease.
Run the code below.

```:bash
git clone https://github.com/0xhokusai/hokusai-get-started.git
cd hokusai-get-started
cp .env.sample .env # and rewrite API Keys
yarn store-image # and you will publish metadata with hokusai.png
```

You will get URL for the metadata like this.

```
https://dweb.link/ipfs/bafyreieaaqfof34kfqyvwe4arta6jsuwuauim4d24qo22ct2xnvjnlnrb4//metadata.json
```

[IPFS](https://docs.ipfs.io/) is a distributed system for storing and accessing files, websites, applications, and data.
And you can access the metadata uploaded on IPFS via HTTPS URL like this.

```:bash
curl https://dweb.link/ipfs/bafyreieaaqfof34kfqyvwe4arta6jsuwuauim4d24qo22ct2xnvjnlnrb4/metadata.json

{
    "name":"nft.storage store test",
    "description":"Using the nft.storage metadata API to create ERC-1155 compatible metadata.",
    "image":"ipfs://bafybeicsu73gednfaa5svozuoac4ebpi76nn4auhygcvkvbn4kk2vdv5ey/hokusai.png"
}
```

### 3. Let's Hokusai API

Now, you're ready to use Hokusai API!

#### Mint NFT

```:bash
yarn mint-nft {to} {tokenUri}
```

If you don't know parameters, check [Hokudai API Document](https://docs.hokusai.app/).

#### Get NFT

`tokenId` issued by Hokusai API can check via [polygonscan](https://mumbai.polygonscan.com)

```:bash
yarn get-nft {tokenId}
```

Enjoy Hokusai API !

## Hokusai Links
- [Homepage](https://hokusai.app)
- [Document](https://docs.hokusai.app)
- [Medium](https://0xhokusai.medium.com)
- [Discord](https://discord.com/invite/34fmuE25G2)
- [Twitter](https://twitter.com/0xHokusai)
