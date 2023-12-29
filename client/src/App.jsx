import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import AddressTable from "./AdressTable";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        setAddress={setAddress}
        address={address}
        setPrivateKey={setPrivateKey}
      />
      <Transfer privateKey={privateKey} setBalance={setBalance} address={address} />

      <AddressTable />



    </div>
  );
}

export default App;
