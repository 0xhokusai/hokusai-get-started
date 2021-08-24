# Get Started with Hokusai API

## Hokusai Links
- [Homepage](https://hokusai.app)
- [Document](https://docs.hokusai.app)
- [Medium](https://0xhokusai.medium.com)
- [Discord](https://discord.com/invite/34fmuE25G2)
- [Twitter](https://twitter.com/0xHokusai)

## Get Started

### 1. Obtain API Key

Please apply for an API Key via the form [here](https://hokusai.app/pre-register).
It takes for 2~3 business days to issue the API Key.

### 2. Publish NFT metadata

We use [nft.storage](https://nft.storage/) to publish a NFT metadata for ease.
Run the code below.

```:bash
git clone https://github.com/0xhokusai/hokusai-get-started.git
cd hokusai-get-started
cp .env.sample .env # and rewrite API Keys
yarn store-image # and you will publish metadata with hokusai.png
```

You will get IPFS URL for the metadata like this.

```
ipfs://bafyreieaaqfof34kfqyvwe4arta6jsuwuauim4d24qo22ct2xnvjnlnrb4/metadata.json
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

You can also access the image via HTTP URL like this.
```
https://dweb.link/ipfs/bafybeicsu73gednfaa5svozuoac4ebpi76nn4auhygcvkvbn4kk2vdv5ey/hokusai.png
```

### 3. Let's Hokusai API

Now, you're ready to use Hokusai API!

#### Mint NFT
```:bash
curl -X POST -H "Content-Type: application/json" \ 
"https://{endpointUrl}/v1/nfts/{contractId}/mint?key={apiKey}" \
-d '{"to":"{ethAddress}", "tokenUri": "{tokenUri}"}'
```