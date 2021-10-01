import { ethers } from "ethers";
import ForwarderAbi from "./abis/MinimalForwarder.json";
import HokusaiAbi from "./abis/ERC721WithRoyaltyMetaTx.json";

export type Message = {
  from: string;
  to: string;
  value: number;
  gas: number;
  nonce: number;
  data: string;
};

export type MessageWithSignature = Message & { signature: string };

/*
const EIP712DomainType = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];
*/

const ForwardRequestType = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: "value", type: "uint256" },
  { name: "gas", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "data", type: "bytes" },
];

// https://eips.ethereum.org/EIPS/eip-712
export function createTypedDataV4(
  chainId: number,
  ForwarderAddress: string,
  message: Message
) {
  const TypedData = {
    primaryType: "ForwardRequest" as const,
    types: {
      // EIP712Domain: EIP712DomainType,
      ForwardRequest: ForwardRequestType,
    },
    domain: {
      // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/metatx/MinimalForwarder.sol
      name: "MinimalForwarder",
      version: "0.0.1",
      chainId,
      verifyingContract: ForwarderAddress,
    },
    message,
  };
  return TypedData;
}

export async function sign(
  rpc: string,
  signer: ethers.Wallet,
  from: string,
  value: number,
  data: string,
  forwarderAddress: string,
  contractAddress: string
): Promise<MessageWithSignature> {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const forwarder = new ethers.Contract(
    forwarderAddress,
    ForwarderAbi.abi,
    provider
  );

  const contract = new ethers.Contract(
    contractAddress,
    HokusaiAbi.abi,
    provider
  );

  const request = {
    from,
    to: contract.address,
    value,
    gas: 1e6,
    nonce: (await forwarder.getNonce(signer.address)).toNumber(),
    data,
  };
  const { chainId } = await provider.getNetwork();
  const TypedData = createTypedDataV4(chainId, forwarder.address, request);

  // sign
  const signature = await signer._signTypedData(
    TypedData.domain,
    TypedData.types,
    TypedData.message
  );

  return { ...request, signature };
}
