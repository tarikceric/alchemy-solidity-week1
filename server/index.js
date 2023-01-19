const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils');

app.use(cors());
app.use(express.json());

const balances = {
  "0x0935f35d0efa29ffec9661999b5facc865856412": 100,
  "0xb04b9bd8fac0a32c81ee4a7e299939ed55706ce9": 50,
  "0xe5f8805ad20bb45bc168d7eea6ac3893e3f842a9": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

// perform a transaction from a senders address to a recipients address
app.post("/send", (req, res) => {

  // goal is to get a signature from the client-side application, and recover the public address from the signature <-this is then the sender
  // by deriving the address from a signature, we know it can only originate from the individual with the private key
  const { sender, recipient, amount, signature, recoveryKey } = req.body;
  const message = { sender, amount, recipient };
  const msgHash = keccak256(utf8ToBytes(JSON.stringify(message)));
  const publicKey = secp.recoverPublicKey(msgHash, signature, recoveryKey).slice(1);
  const address = '0x' + toHex(keccak256(publicKey).slice(-20));
  console.log(address);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (address != sender)
    res.status(400).send({ message: "Invalid permission" })
  else {
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Lacking funds to perform transfer" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
