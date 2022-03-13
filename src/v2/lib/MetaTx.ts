import { ethers } from "ethers";
import { Message, MessageWithSignature, createTypedDataV4 } from "./TypedData";
import ForwarderAbi from "./abis/MinimalForwarder.json";
import HokusaiAbiV1 from "./abis/ERC721WithRoyaltyMetaTx.json";
import HokusaiAbiV2 from "./abis/ERC721HWithRoyaltyMetaTx.json";

export async function getTransferMessageWithSignature(
  rpc: string,
  walletPrivateKey: string,
  contractVer: number,
  contractAddress: string,
  forwarderAddress: string,
  toAddress: string,
  tokenId: number
) {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const signer = new ethers.Wallet(walletPrivateKey);

  const { chainId } = await provider.getNetwork();
  const address = await signer.getAddress();

  // Setup contracts
  const forwarder = new ethers.Contract(
    forwarderAddress,
    ForwarderAbi.abi,
    provider
  );
  
  // Switch contract interface by contract version
  let hokusaiInterface: ethers.utils.Interface;
  if (contractVer === 1) {
    hokusaiInterface = new ethers.utils.Interface(HokusaiAbiV1.abi);
  } else if (contractVer === 2) {
    hokusaiInterface = new ethers.utils.Interface(HokusaiAbiV2.abi);
  } else {
    throw new Error(`Invalid contract version: ${contractVer}`);
  }
  
  // Create tranferFrom data
  const data = hokusaiInterface.encodeFunctionData("transferFrom", [
    address,
    toAddress,
    tokenId,
  ]);

  // Create meta transaction message
  const message: Message = {
    from: address,
    to: contractAddress,
    value: 0,
    gas: 1e6,
    nonce: (await forwarder.getNonce(address)).toNumber(),
    data,
  };

  // Create typedDataV4
  const typedData = createTypedDataV4(chainId, forwarderAddress, message);

  // Sign message
  const signature = await signer._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.message
  );
  const messageWithSignature: MessageWithSignature = { ...message, signature };

  return messageWithSignature;
}

export async function getBurnMessageWithSignature(
  rpc: string,
  walletPrivateKey: string,
  contractVer: number,
  contractAddress: string,
  forwarderAddress: string,
  tokenId: number
) {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const signer = new ethers.Wallet(walletPrivateKey);

  const { chainId } = await provider.getNetwork();
  const address = await signer.getAddress();

  // Setup contracts
  const forwarder = new ethers.Contract(
    forwarderAddress,
    ForwarderAbi.abi,
    provider
  );

  // Switch contract interface by contract version
  let hokusaiInterface: ethers.utils.Interface;
  if (contractVer === 1) {
    hokusaiInterface = new ethers.utils.Interface(HokusaiAbiV1.abi);
  } else if (contractVer === 2) {
    hokusaiInterface = new ethers.utils.Interface(HokusaiAbiV2.abi);
  } else {
    throw new Error(`Invalid contract version: ${contractVer}`);
  }

  // Create burn data
  const data = hokusaiInterface.encodeFunctionData("burn", [
    tokenId,
  ]);

  // Create meta transaction message
  const message: Message = {
    from: address,
    to: contractAddress,
    value: 0,
    gas: 1e6,
    nonce: (await forwarder.getNonce(address)).toNumber(),
    data,
  };

  // Create typedDataV4
  const typedData = createTypedDataV4(chainId, forwarderAddress, message);

  // Sign message
  const signature = await signer._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.message
  );
  const messageWithSignature: MessageWithSignature = { ...message, signature };

  return messageWithSignature;
}
