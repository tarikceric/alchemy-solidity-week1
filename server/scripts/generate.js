const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');

// generates a random private key
const privateKey = secp.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));

// generates a public key that corresponds to the private key
const publicKey = secp.getPublicKey(privateKey);
console.log('public key:', toHex(publicKey));

// generate an address from the public key
const address = keccak256(publicKey.slice(1)).slice(-20);
console.log("Address : 0x" + toHex(address));