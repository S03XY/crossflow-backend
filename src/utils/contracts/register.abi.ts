export const REGISTER_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_delegate',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'registrationFees',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'updateDomainfees',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'EventChainActivated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'EventDomainRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'EventDomainUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: '_registrationFees',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_updateDomainFees',
        type: 'uint256',
      },
    ],
    name: 'EventFeesUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'EventRegisterIntent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'EventUpdateDomainIntent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'activateChain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'domainToAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fees',
    outputs: [
      {
        internalType: 'uint256',
        name: 'registrationFees',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'updateDomainFees',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isChainActivated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isRegistered',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
    ],
    name: 'makeRegisterIntent',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
    ],
    name: 'reserveDomain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '_newAddress',
        type: 'address',
      },
    ],
    name: 'updateDomain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_domain',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '_newAddress',
        type: 'address',
      },
    ],
    name: 'updateDomainIntent',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_fees',
        type: 'uint256',
      },
    ],
    name: 'updateRegistrationFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_fees',
        type: 'uint256',
      },
    ],
    name: 'updateUpdateDomainFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
