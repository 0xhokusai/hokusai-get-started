export type Message = {
  from: string;
  to: string;
  value: number;
  gas: number;
  nonce: number;
  data: string;
};

export type MessageWithSignature = Message & { signature: string }

/*
const EIP712DomainType = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];
*/

const ForwardRequestType = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'gas', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'data', type: 'bytes' },
];

// https://eips.ethereum.org/EIPS/eip-712
export function createTypedDataV4(
  chainId: number,
  ForwarderAddress: string,
  message: Message
) {
  const TypedData = {
    primaryType: 'ForwardRequest' as const,
    types: {
      // EIP712Domain: EIP712DomainType,
      ForwardRequest: ForwardRequestType,
    },
    domain: {
      // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/metatx/MinimalForwarder.sol
      name: 'MinimalForwarder',
      version: '0.0.1',
      chainId,
      verifyingContract: ForwarderAddress,
    },
    message,
  };
  return TypedData;
}
