import express from "express";
import cors from "cors";
import * as sec from 'ethereum-cryptography/secp256k1'

const secp = sec.secp256k1

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x02a39c5b3f7c94213431660ff072bb8846a9a3996ed9a6d6fa04a5801b0a929a98": 100,
  "0x025e6a1b31563ba8c9fb057573ae12b8c76c83fd9489714cd0daf775180c07d633": 50,
  "0x039487fdac9c0ff9768e411a5869d9c865d2bfb55d9aae822ee65c4c057f53cdea": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const {data, signature, msgHash} = req.body;
  const { sender, recipient, amount } = data;  
  const { r, s, recovery } = signature;
  const isSigned = secp.verify({ r: BigInt(`0x${r}`), s: BigInt(`0x${s}`), recovery}, msgHash, sender.slice(2));
  if (!isSigned) {
    return res.status(400).send({balance: balances[sender] ,message: "Invalid signature!" });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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
