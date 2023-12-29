import server from "./server";
import { useState } from "react";
import * as sec from 'ethereum-cryptography/secp256k1'
//import toHex
import { toHex } from 'ethereum-cryptography/utils'
const secp = sec.secp256k1;


function Wallet({address, setAddress, balance, setBalance, setPrivateKey, privateKey }) {
  const [error, setError] = useState("");

  async function onChangePrivate(evt) {
    setAddress("");

    const privateKey = evt.target.value;
    try{

    //generate address from private key
    const address = '0x' + toHex(secp.getPublicKey(privateKey));


    setAddress(address);
    setPrivateKey(privateKey);
    setError("");
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setError("Invalid Private Key");
      setBalance(0);
    }
  }
  catch(e){
    setError("Invalid Private Key");
    setBalance(0);
  }

  }




  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Private Key to Sign Transactions
        <input placeholder="Type a private key" value={privateKey} onChange={onChangePrivate}></input>
      </label>
      <label>
        Wallet Address
        <input disabled value={address} ></input>
      </label>
  

    
  
   

      <div className="balance">Balance: {balance}</div>
      <label>
        {error}
      </label>
    </div>
  );
}

export default Wallet;
