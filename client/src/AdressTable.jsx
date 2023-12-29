import React from 'react';

function AddressTable() {
  const data = [
    {
      privateKey: '16fc78ba1c9869181ee84be82088b1e3fc2388f8e559eecf6ef729f91d285125',
      address: '0x02a39c5b3f7c94213431660ff072bb8846a9a3996ed9a6d6fa04a5801b0a929a98'
    },
    {
      privateKey: 'dca7b8ecab1985864f7edfe9da0ce31b0757998afe44b9ca3a00cba5a2319cbe',
      address: '0x025e6a1b31563ba8c9fb057573ae12b8c76c83fd9489714cd0daf775180c07d633'
    },
    {
      privateKey: '0d77f7962de1315fccc948028ff2f506a45ea972c0216da5f15b5790821aa009',
      address: '0x039487fdac9c0ff9768e411a5869d9c865d2bfb55d9aae822ee65c4c057f53cdea'
    }
  ];
  return (
    <div className="table-container">
      <h2>Address Table</h2>
      <p>Here are some sample addresses and private keys for you to play around with:</p>
      <table>
        <thead>
          <tr>
            <th>Private Key</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.privateKey}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddressTable;
