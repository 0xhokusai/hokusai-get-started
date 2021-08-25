import fs from 'fs'
import { NFTStorage, File, toGatewayURL } from 'nft.storage'

require('dotenv').config()

const endpoint = toGatewayURL('https://api.nft.storage')
const token = process.env.NFT_STORAGE_API_KEY || ''

async function main() {
  const storage = new NFTStorage({ endpoint, token })
  const metadata = await storage.store({
    name: 'nft.storage store test',
    description:
      'Using the nft.storage metadata API to create ERC-1155 compatible metadata.',
    image: new File([await fs.promises.readFile('hokusai.png')], 'hokusai.png', {
      type: 'image/png',
    })
  })

  const url = new URL(metadata.url)
  console.log(`HTTPS URL for the metadata: https://dweb.link/ipfs/${url.hostname}${url.pathname}`)
}

main()
